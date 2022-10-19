
//import all the require module
const events = require('events')
const fs = require('fs')
const readLine = require('readline')
const _ = require ('lodash')

//Write try and catch and handle the exceptions where ever require
//return the callback with appropriate values in the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will read the file content the first parameter is filename and
//second is a callback
//create array name it as  fileContents
const readFileContents = async (fileName, cb) => {

   try {
     let fileContents = [];
     let keys = []; let lineCounter = 0; let wantedLines = [];
     const fileStream = fs.createReadStream(fileName);
     const rl = readLine.createInterface({
                  input: fileStream,
                  crlfDelay: Infinity
                });

      rl.on('line', (line) => {
        if(lineCounter === 0) keys.push(line.split());
        else fileContents.push(_.zipObject(keys, line.split()));
        lineCounter++;
      });

      await events.once(rl, 'close');
      console.log('${lineCounter} parsed!');
      cb(null, fileContents);

   } catch (err) {
     console.log('readFileContents Error: ' + err);
     cb(err, null);
   }

}

// Use Lodash to filter the data this method will take first parameter
//as fileContents and second parameter as a callback
const filterData = (fileContents, cb) => {
  let filteredData = _.filter(fileContents, {'payment_method': 'credit'});

  cb(null, filteredData);
}

//This method will writeFile data to output.txt file
//it is taking parameters are filteredData and a callback
//filteredata will be given by the filterData method
const writeFilteredDataToFile = (filteredData, cb) => {
  try {
    //use writeFile method and write the filteredData in output.txt file
    fs.writeFile('output.txt', filteredData, (err) => {
        if (err) throw err;
        cb(null, 'Successfully wrote filtered data to output.txt file..!');
    });
  } catch (err) {
        cb(err, null);
  }

}


module.exports = {
  readFileContents,
  filterData,
  writeFilteredDataToFile
}
