const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('root');
});

app.listen(process.env.PORT || 8080, () => {
  // Anything that needs to wait until the server
  // is listening should go here.
});
