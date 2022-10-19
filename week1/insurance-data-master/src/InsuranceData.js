//import all the modules require
const events = require('events')
const fs = require('fs')
const readLine = require('readline')
const _ = require ('lodash')
const parse = require('csv-parser');

//Use try and catch to handle the error where ever required
//return the callback with appropriate data where ever require in all the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will take two parameters first the fileName
//and second a callback
//read file data line by line using readLine
//create array and push all data inside the array


const readFileContentsLineByLine = async (fileName, cb) => {
  let fileContents = [];
  let keys = [];
  let lineCounter = 0;
  try {
      const rl = readLine.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
  //      output: process.stdout,
  //      terminal: false
      });
      rl.on('line', (line) => {
//        if(lineCounter === 0) keys.push(line.split());
//        else fileContents.push(_.zipObject(keys, line.split()));
        fileContents.push(line); // less elegant, but fullfilling request.
        lineCounter++;
      });
      await events.once(rl, 'close');
      console.log(lineCounter + ' parsed!');
      cb(null, fileContents);
  } catch(err) {
      console.log('readFileContents Error: ' + err);
      cb(err, null);
  };
}

//This method will take two parameters first the filecontent
//and second the callback
//use map to filter the data
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
//  let filteredData = fileContents.filter(p => p.sex === 'female' && p.region === 'southwest');
  let filteredData = fileContents.filter(p => p.includes('female') && p.includes('southwest'));
  cb(null, filteredData);
  //use lodash.compact() method if required
}

//This method will write filtered data in the output file
const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
    //use writeFile method to write the filteredData
    try {
        fs.writeFile(outputFileName, filteredData, (err) => {
            if (err) throw err;
            cb(null, 'Successfully wrote filtered data to output.txt file..!');
        });
    } catch (err) {
        cb(err, null);
    }

}


//This method will read the file content using Streams
//create array and push all the data from file to it


const readFileContentsUsingStream = (fileName, cb) => {
  let fileContents = [];

  let nRows = 0;

  fs.createReadStream(fileName)
    .pipe(parse({delimiter: ','}))
    .on('data', (row) => {
      fileContents.push(row);
      nRows++;
    })
    .on('end', () => {
      console.log("Rows read: " + nRows);
      cb(null, fileContents);
    })
    .on("error", (err) => {
      console.log("Error while reading contents of file using streams, ERROR::", err);
      cb("Encountered error while reading file contents using streams..!");
    })
}

//This method will filetDatewithNoChildren it will take two parameters
//first the fileContent and second the callback
//use map if required to filter the data

const filterDataWithNoChildren = (fileContents, cb) => {
  let filteredData ;
//use lodash.compact() if required


}




module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
 }
