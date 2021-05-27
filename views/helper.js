module.exports = {
  getError(error, prop) {
    try {
      console.log(error.mapped()[prop].value);
      return error.mapped()[prop].msg;
    } catch (err) {
      // console.log(err);

      return '';
    }
  },
};
