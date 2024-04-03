const express = require('express');
const moment = require('moment');
const app = express();

app.get('/', (req, res) => {
  const currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  res.send(`
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>The current date and time is: ${currentDateTime}</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});