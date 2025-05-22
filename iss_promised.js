const needle = require('needle');

function fetchMyIP(){
return needle('get','https://api.ipify.org?format=json')
.then((response) =>{
  const body = response.body;
  const ip = body.ip;
  return ip;
})
};

const fetchCoordsByIP = function(ip){
  return needle('get',`http://ipwho.is/${ip}`)
  .then((response)=>{
    const body = response.body;
    const latitude = body.latitude;
    const longitude = body.longitude;
    return {latitude,longitude};
  });
};

const fetchISSFlyOverTimes = function(coords)
{
  return needle('get',`https://iss-flyover.herokuapp.com/json/?lat=`)
  .then((response)=> {
    const body = response.body;
    const passTimes = body.response;
    return passTimes;
  });
}
const nextISSTimesForMyLocation= function() {
  return fetchMyIP()
  .then((ip)=> fetchCoordsByIP(ip))
  .then((coords)=>fetchISSFlyOverTimes(coords))
  .then((passtimes) => {
    return passtimes;
  });
}

module.exports = {nextISSTimesForMyLocation};