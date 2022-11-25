require('./config');
__path = process.cwd();
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080;

var mainrouter = require('./routes/main'),
    apirouter = require('./routes/api')

var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)

app.use('/', mainrouter);
app.use('/api', apirouter);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})

module.exports = app