const express = require('express');
const bodyParser = require('body-parser');
const userRepo = require('./repositories/user');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send(`
        <div>
        <form method="POST">
            <input name="email" type="text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <input name="passswordConform"  type="password"  placeholder="conform password" />
            <button>Sign up</button>
        </form>
        </div>    
      `);
});

app.post('/', async (req, res) => {
  //   get access to email password passswordConform
  const { email, password, passswordConform } = req.body;

  const existingUser = await userRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }
  if (password !== passswordConform) {
    return res.send('password must match');
  }
  res.send('accound created');
});

app.listen(3000, () => {
  console.log('listening');
});
