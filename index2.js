// index2.js
const  {nextISSTimesForMyLocation}  = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files
const printPasstimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPasstimes(passTimes);
  })
  .catch((error)=> {
    console.log("It didn't work: ", error.message);
  });