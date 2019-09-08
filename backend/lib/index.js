var inside = require('point-in-polygon');
const helper = {};

helper.getPolygonArray = (data) => {
  let polygonArray = data['kml']['Document']['Placemark'].filter(data => !! data.Polygon );
  return polygonArray;
}

helper.findTheRightPolygonPoint = (d,point) => {
  return d.filter((val) => {
    let polygon = val.Polygon.outerBoundaryIs.LinearRing.coordinates._text
    .trim()
    .replace('/0/g','')
    .split('0\n')
    .map(res => {
      res = res.trim();
      res = res.replace('\n','').split(',')
      .filter(val => !!val && val != '0' );
      return res.map(v => Number(v))
    })
    console.log();
    return inside(point, polygon)
  })[0]['name']['_text'];
  
}

module.exports = helper;

