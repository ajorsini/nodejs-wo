//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  if(req.url === '/api/v1/products' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json'
    }).end(productsService.getProducts());
  } else if(req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[4]);
    productsService.getProductsById(id, (err, result) => {
      if(err) {
        res.writeHead(404, {
          'content-type': 'application/json'
        }).end(err);
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        }).end(result);
      }
    });
  } else if(req.url === '/api/v1/products' && req.method === 'POST') {
    let req_body = await getRequestData(req)
                         .then((bodytxt) => {
                           productsService.saveProduct(JSON.parse(bodytxt), (err, result) => {
                             if(err) throw err;
                             else
                               res.writeHead(200, {
                                 'content-type': 'application/json'
                               }).end(result);
                           });
                         })
                         .catch((err) => {
                           res.writeHead(500, {
                             'content-type': 'application/json'
                           }).end(err);
                         });
   } else if(req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'PUT') {
     const id = parseInt(req.url.split('/')[4]);
     let req_body = await getRequestData(req)
                          .then((uData) => {
                            productsService.updateProduct(id, JSON.parse(uData), (err, result) => {
                               if(err) throw err;
                               else
                                 res.writeHead(200, {
                                   'content-type': 'application/json'
                                 }).end(result);
                             });
                           })
                          .catch((err) => {
                            res.writeHead(404, {
                              'content-type': 'application/json'
                            }).end('Error: ' + err);
                          });
    } else if(req.url.match(/\/api\/v1\/products\/([0-9])/) && req.method === 'DELETE') {
      const id = parseInt(req.url.split('/')[4]);
      productsService.deleteProduct(id, (err, result) => {
        if(err) {
          res.writeHead(404, {
            'content-type': 'application/json'
          }).end(err);
        } else {
          res.writeHead(200, {
            'content-type': 'application/json'
          }).end(result);
        }
      });
    }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})
