
'use strict';
const http = require('http');
var request = require('request');
let sector = "BS";
let price = "120000";
//replace with the url to your azure function
const apiUrl = "https://fnsalesduration.azurewebsites.net/api/HttpTriggerCSharp1?code=pvAKe489uyZs9ORPbKJGIeUyI/47Jp/YMwbzkzbYfaMDGwiXjbebPg==";
exports.salesdurationagentWebhook = (req, res) => {
  // Get the price and sector from the request
  price = req.body.queryResult.parameters['price']; // price is a required param
  sector = req.body.queryResult.parameters['sector']; // sector is a required param
  
  // Call the weather API
  callSalesDurationApi(price, sector).then((output) => {
    res.json({ 'fulfillmentText': output }); 
  })
    .catch((err) => {
      console.log(err);

      res.json({ 'fulfillmentText': err.message });

    })
    ;
};




function callSalesDurationApi(price, sector) {
  return new Promise((resolve, reject) => {

    var myJSONObject = { "sector" : sector,
                          "price": price
    };

    request({

      url: apiUrl,
      method: "POST",
      json: true,  
      body: myJSONObject
    }, function (error, response, body) {
      
      let answer = JSON.parse(body);
      let output = "The prediction for sector " + sector +
      " at a listing price of " + price + " is: " + answer.Results.output1[0].mean ;

      // Resolve the promise with the output text
      resolve(output);
    });

  });
}
