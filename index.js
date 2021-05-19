const express = require('express');
const bodyParser = require('body-parser');
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

// const bodyParser = (req, res, next) => {
//   if (req.method === 'POST') {
//     req.on('data', (data) => {
//       const parshed = data.toString('utf8').split('&');
//       const formData = {};
//       for (let pair of parshed) {
//         const [key, value] = pair.split('=');
//         formData[key] = value;
//       }

//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// };
app.post('/', (req, res) => {
  //   get access to email password passswordConform
  console.log(req.body);

  res.send('accound created');
});

app.listen(3000, () => {
  console.log('listening');
});
