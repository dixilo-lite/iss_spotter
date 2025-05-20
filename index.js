const {fetchMyIP} = require('./iss');

fetchMyIP((error,ip) =>
{
  if(error){
    console.log("It didn't work!", error);
  }
  console.log("It wrked! Returned IP:'",ip);
});