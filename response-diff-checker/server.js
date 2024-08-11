const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

axios.interceptors.request.use(request => {
  console.log(`Starting Request 
    curl ${request.method} ${request.url}
    --header ${request.header}
    --data ${request.body}
  `)
  return request
})

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(
      "C:/Users/dogranx1/Desktop/response-diff-checker/response-diff-checker/index.html");
});

app.get("/test", (req, res) => {
  res.statusCode = 200;
  res.send("hellow world");
});


app.post("/isEqual", async (req, res) => {
  const APIM = {
    baseURL: 'https://gbapimsnd.azure-api.net/vendor-product-hierarchy/api/',
    url: 'vendor-product-hierarchy/product-hierarchy?productHierarchy=s',
    headers: {
      'Ocp-Apim-Subscription-Key': '35fd367ad18d491dacec3a693a16e02c', // Replace with your actual key
      'Accept': 'application/json' // Optional, depending on API requirements
    },
    method: 'GET'
  }

  const LOCAL = {
    baseURL: 'http://localhost:8080/api/',
    url: 'vendor-product-hierarchy/product-hierarchy?productHierarchy=s',
    headers: {},
    method: 'GET'
  }
  const {localhost, apim} = req.body;

  try {
    const [localResponse, apimResponse] = await Promise.all(
        [makeCall(LOCAL), makeCall(APIM)])

    console.log(`response: localhost: SUCCESS , apim : SUCCESS`)

    let response = {
      "isEqual": isEqual(localResponse.data, apimResponse.data),
      "localhost": localResponse.data,
      "apim": apimResponse.data
    }
  
    console.log(`responses are ${response.isEqual}`)

    res.statusCode = 200;
    res.send(response);

  } catch (err) {
    res.statusCode = 400;
    console.log("erro:" + JSON.stringify(err))
    res.send(err);
  }
});

function isEqual(localResponse, apimResponse) {
  if (JSON.stringify(localResponse) === JSON.stringify(apimResponse)) {
    return true
  } else {
    return false
  }
}



function createAxios(baseUrl, headers) {
  return axios.create({
    baseURL: baseUrl,
    headers: headers
  });
}

function makeCall(urlDTO) {
  const { baseURL, headers, url, method} = urlDTO
  const api = createAxios(baseURL, headers)
  switch (method) {
    case 'GET':
      return api.get(url)
    case 'POST':
      return axios.post(url)
    default:
      throw "Method not defined"
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});