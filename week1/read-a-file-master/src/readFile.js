const fs = require("fs");
// import the lodash library
const lodash = require("lodash");

// Read the file data and return the data in the resolved Promise
const read = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if(err) reject(new Error('Encountered error while reading file contents..!'));
      else resolve(data);
    });
  });
};
// Define a function to Convert the file content to upper case and return the result in the resolved Promise
const convertToUpperCase = (fileContents) => {
  return new Promise((resolve, reject) => {
    resolve(fileContents.toString().toUpperCase().split(','));
  });
};
// Define a function to read and convert the file contents, use the then and catch blocks here
const readAndConvertFileContents = (fileName, cb) => {
  read(fileName).then((d) => convertToUpperCase(d))
                .then((d) => cb(null, d))
                .catch((err) => cb(err.message));
};

module.exports = {
  readAndConvertFileContents,
};
