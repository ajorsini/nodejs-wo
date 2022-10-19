getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    var body = "";
    req.on('data', (chunk) => {
      body += chunk.toString();
    }).on('end', () => {
      resolve(body);
    }).on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = getRequestData
