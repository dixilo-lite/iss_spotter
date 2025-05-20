const needle = require("needle");
const fetchMyIP = function(callback) {
needle.get('https://api.ipify.org?format=json', (error,response,body) => {
  if(error) return callback(error,null);
   
  if( response.statusCode !== 200)  {
    const msg = `Status code ${response.statusCode} when fetching IP. Rseponse ${body}`;
    callback(Error(msg),null);
    return
  }
    const ip = body.ip;
    callback(null,ip);
  });

};


module.exports = {fetchMyIP};