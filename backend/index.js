const express = require('express')
const {readFromXmlAndConvertToJson} = require('./lib/xmlReader.js')
const {getPolygonArray,findTheRightPolygonPoint} = require('./lib');
const app = express()
const port = 3000
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:8001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['accept', 'content-type'],
        preflightContinue: true,
        optionsSuccessStatus: 204,
      })
    );

app.get('/get', (req, res) => {
  let point = [ Number(req.query.latitude), Number(req.query.longitude)];
  console.log(point);
  readFromXmlAndConvertToJson()
  .then(r => {
    return Promise.resolve(getPolygonArray(r));
  })
  .then (r => {
    res.end(findTheRightPolygonPoint(r,point))
  })
  .catch(err => res.end("Error"))

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))