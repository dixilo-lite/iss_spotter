const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
fetchMyIP((error,ip) =>
{
  if(error){
    console.log("It didn't work!", error);
  }
  console.log("It worked! Returned IP:'",ip);
  fetchCoordsByIP(ip,(error,data) =>{
   
    if(error) {
      
      console.log(error);
    }
    console.log("Coordinates:",data);
    fetchISSFlyOverTimes(data,(error,time) => {
     console.log("Duration",time);

    });
  });
  
});


