const fs = require('fs'),
    path = require('path'),
    xmlReader = require('read-xml');

const convert = require('xml-js');
const FILE = path.join(process.cwd(), './FullStackTest_DeliveryAreas.kml'); 
const helper = {};
helper.readFromXmlAndConvertToJson = () => {
  return new Promise((resolve,reject) => {
    xmlReader.readXML(fs.readFileSync(FILE), function(err, data) {
      if (err) {
        reject(err);
      }else{
        var xml = data.content;
        var result = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
        resolve(result);
      }
    })
  })
}
module.exports = helper; 