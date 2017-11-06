/*
 This server will proxy all requests to the Meraki Dashboard API and include the API key within the headers

 Update the API_KEY 
 npm install
 node server.js

 http://localhost:8005/organizations --> https://n143.meraki.com/api/v0/organizations
 */


const API_KEY = '';
const proxyPort = '8005';

var httpProxy = require('http-proxy');
// Error example 
// 
// Http Proxy Server with bad target 
// 
var proxy = httpProxy.createServer({
  target:'https://api.meraki.com/api/v0',
  changeOrigin: true,
  protocolRewrite: true
});
 

proxy.listen(proxyPort);
console.log("Meraki Proxy server listening on port ",proxyPort );

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    //console.log("applying API key header");
    proxyReq.setHeader('X-Cisco-Meraki-API-Key', API_KEY);
  });

// Listen for the `error` event on `proxy`. 
proxy.on('error', function (err, req, res) {
    console.log('error',err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
 
  res.end('Something went wrong.',err);
});
 
// 
// Listen for the `proxyRes` event on `proxy`. 
// 
proxy.on('proxyRes', function (proxyRes, req, res) {
  //console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
 
});
 
// 
// Listen for the `open` event on `proxy`. 
// 
proxy.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here 
  proxySocket.on('data', hybiParseAndLogMessage);
});
 
// 
// Listen for the `close` event on `proxy`. 
// 
proxy.on('close', function (res, socket, head) {
  // view disconnected websocket connections 
  console.log('Client disconnected');
});