// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = process.env.PORT || 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  if(req.url === '/api/v1/movies' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json'
    }).end(moviesService.getMovies());
  } else if(req.url.match(/\/api\/v1\/movies\/([0-9])/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[4]);
    moviesService.getMoviesById(id, (err, result) => {
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
  } else if(req.url === '/api/v1/movies' && req.method === 'POST') {
    let req_body = await getRequestData(req)
                         .then((bodytxt) => {
                           moviesService.saveMovie(JSON.parse(bodytxt), (err, result) => {
                             if(err) throw err;
                             else
                               res.writeHead(200, {
                                 'content-type': 'application/json'
                               }).end(result);
                           });
                         })
                         .catch((err) => {
                           if(typeof err === Object && typeof error.message === String) errtxt = error.message;
                           else if(typeof err === String) errtxt = error.message;
                           else errtxt = 'Error: ' + err;
                           res.writeHead(404, {
                             'content-type': 'application/json'
                           }).end(errtxt);
                       });
   } else if(req.url.match(/\/api\/v1\/movies\/([0-9])/) && req.method === 'PUT') {
     const id = parseInt(req.url.split('/')[4]);
     let req_body = await getRequestData(req)
                          .then((uData) => {
                            moviesService.updateMovie(id, JSON.parse(uData), (err, result) => {
                               if(err) throw err;
                               else
                                 res.writeHead(200, {
                                   'content-type': 'application/json'
                                 }).end(result);
                             });
                           })
                          .catch((err) => {
                            if(typeof err === Object && typeof error.message === String) errtxt = error.message;
                            else if(typeof err === String) errtxt = error.message;
                            else errtxt = 'Error: ' + err;
                            res.writeHead(404, {
                              'content-type': 'application/json'
                            }).end(errtxt);
                          });
    } else if(req.url.match(/\/api\/v1\/movies\/([0-9])/) && req.method === 'DELETE') {
      const id = parseInt(req.url.split('/')[4]);
      moviesService.deleteMovieById(id, (err, result) => {
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
    } else {
      res.writeHead(404, {
        'content-type': 'application/json'
      }).end('Route not found!');
    }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
