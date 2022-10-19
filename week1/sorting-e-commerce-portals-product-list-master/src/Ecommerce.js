
//import all the require modules
const fs = require('fs')
const readLine = require('readline')
const _ = require ('lodash')

//write try catch to hanlde the exceptions

//More userdefined methods can be written if required to write the logical stuff

//return the callback with appropriate data where ever require in all the methods

//This method will read the file it takes two parameters first the fileName
//and second the callback
const readFileContents = (fileName, cb) => {
  let fileContents = [];
  let keys = [];
  let lineCounter = 0;
  fs.open(fileName, 'r', (err, fd) => {
      if(err) {
        console.log('readFileContents Error: ' + err);
        cb("Encountered error while reading file contents..!", null);
      } else {
        readLine.createInterface({
          input: fs.createReadStream(null, {'fd': fd}),
          crlfDelay: Infinity
        })
        .on('line', (line) => {
          if(lineCounter === 0) keys.push(line.split());
          else fileContents.push(_.zipObject(keys, line.split()));
          lineCounter++;
        })
        .on('close', () => {
          console.log("Rows read: " + lineCounter);
          cb(null, fileContents);
        })
        .on('error', (err) => {
          console.log('readFileContents Error: ' + err);
          cb("Encountered error while reading file contents..!", null);
        });
      }
  });
}

//This method will sortDataonprice it will take two parameters one is fileContent
//second the callback
const sortDataOnPrice = (fileContents, cb) => {
  //use lodash.sortBy(fileContents, )
  fileContents.map((fc) => fc.n_price = parseFloat(fc.retail_price));
  let sortedData = _.sortBy(fileContents, ['n_price']);
  cb(null, sortedData);
}

//This method will sortDataonRating
const sortDataOnRating = (fileContents, cb) => {
  //use map where ever required
  //use lodash sortBy() and compact() if required
  //use lodash.reverse() if required
  sortedData = _.reverse(_.sortBy(fileContents.filter(p => p.product_rating !== 'No rating available')));
  cb(null, sortedData);
}

//This method will write the sortedData in the output file
const writeSortedDataToFile = (outputFileName, sortedData, cb) => {
  try {
      fs.writeFile(outputFileName, sortedData, (err) => {
          if (err) throw err;
          cb(null, 'Successfully wrote filtered data to output.txt file..!');
      });
  } catch (err) {
      cb(err, null);
  }
}





module.exports = {
    readFileContents,
    sortDataOnPrice,
    sortDataOnRating,

}
