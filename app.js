const express=require("express");
const app=express();
const routes=require('./Router/routes');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const http = require('http');
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
if (process.env.NODE_ENV === 'development') {
  // app.use(logger('dev'));
} 
app.use("/Home",routes);
app.use("/Community",routes);
app.use("/Shop",routes);

const PORT = process.env.PORT || 1507;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server started on the port ${PORT}`);
});

