const needle = require("needle");
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error,response,body) => {
    if (error) return callback(error,null);
   
    if (response.statusCode !== 200)  {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg),null);
      return;
    }
    const ip = body.ip;
    callback(null,ip);
  });
};

const fetchCoordsByIP = function(ip,callback) {
  needle.get(`http://ipwho.is/${ip}`,(error,response,body) =>{
    
    if (error) return callback(error,null);
    
    if (!body.success) {
      const message = `Success status was ${body.success}. Sever message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(message,null);
      return;
    }
   
    let coordinates = {};
    coordinates.latitude = body.latitude;
    coordinates.longitude = body.longitude;
    callback(null,coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords,callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body) => {
    if (error) return callback(error,null);
    if (response.statusCode !== 200)  {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg),null);
      return;
    }
    callback(null,body.response);
    //console.log(body.response);
  });

};

const nextISSTimesForMyLocation = function(callback) {
 fetchMyIP((error,ip) =>  {
  if (error)  {
    return callback(error,null);
  }

  fetchCoordsByIP(ip,(error,coordinates) => {
    if(error){
      return callback(error,null);
    }
  
  fetchISSFlyOverTimes(coordinates,(error,time)=> {
    if (error){
      return callback(error,null);
    }
    callback(null,time);
  });
  });
 });
};

module.exports = {nextISSTimesForMyLocation};
