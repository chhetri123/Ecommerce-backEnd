const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);

const Repository = require('./repositories');
class UserRepository extends Repository {
  //   constructor() {
  //     super();
  //   }
  async comparePassword(saved, supplied) {
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(
      supplied,
      salt,
      64,
    );
    return (
      hashed === hashedSuppliedBuf.toString('hex')
    );
  }
  async create(attrs) {
    attrs.id = this.randomID();
    const salt = crypto
      .randomBytes(16)
      .toString('hex');
    const buf = await scrypt(
      attrs.password,
      salt,
      64,
    );
    // {email,pass}
    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }
}
module.exports = new UserRepository('users.json');
