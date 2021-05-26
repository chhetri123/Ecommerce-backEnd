module.exports = {
  getError(error, prop) {
    try {
      return error.mapped()[prop].msg;
    } catch (err) {
      return '';
      //   console.log(error);
    }
  },
};
