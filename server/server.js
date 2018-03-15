let express = require('express');
let bodyParser = require('body-parser')
let app = express();

const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})