# simpleMerakiDashboardProxy

 This server will proxy all requests to the Meraki Dashboard API and include the API key within the headers

# Work in progress
- Only supports web clients when the shard is explicetly set.
i.e. api.meraki.com should be n143.meraki.com 


## Configure
 Update the `API_KEY` in the `server.js` file
 ```
 npm install
 node server.js
 ```

## Usage
Use the local server as the base url for the Meraki API endpoints.

Client API request
```
 http://localhost:8005/organizations
```
Becomes
```
https://n143.meraki.com/api/v0/organizations
```

## LICENSE (MIT)

## Written by 
Cory Guynn 2017
www.InternetOfLego.com
developers.meraki.com

