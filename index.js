
'use strict';
const http = require('http');
var request = require('request');
let sector = "BS";
let price = "120000";

//const apiUrl = "https://ussouthcentral.services.azureml.net/workspaces/c03f4f00e4ce4a8e820f71d092eab0e5/services/5ced34b08342408184511f4f10786332/execute?api-version=2.0&format=swagger&apiKey=P5yjL1mF5JScmjhR6Bhz1EQCWaAVyA/PNH9zIvpSWX5J+LzMEfv+9RyorHYzc8iTaSvgu8iB+c7OZdOZi+jSvQ==";
const apiUrl = "https://fnsalesduration.azurewebsites.net/api/HttpTriggerCSharp1?code=pvAKe489uyZs9ORPbKJGIeUyI/47Jp/YMwbzkzbYfaMDGwiXjbebPg==";
exports.salesdurationagentWebhook = (req, res) => {
  // Get the city and date from the request
  price = req.body.queryResult.parameters['price']; // city is a required param
  sector = req.body.queryResult.parameters['sector']; // city is a required param
  
  // Call the weather API
  callSalesDurationApi(price, sector).then((output) => {
    res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
  })
    .catch((err) => {
      console.log(err);

      //res.json({ 'fulfillmentText': `I don't know the sales duration is but I hope it's quick!` });
      res.json({ 'fulfillmentText': err.message });

    })
    ;
};




function callSalesDurationApi(price, sector) {
  return new Promise((resolve, reject) => {

    console.log('API Request: ' + apiUrl);

    var myJSONObject = { "sector" : sector,
                          "price": price
    };

    request({

      url: apiUrl,
      method: "POST",
      json: true,   // <--Very important!!!
      body: myJSONObject
    }, function (error, response, body) {

      // console.log("error "+error);

      // console.log("response " + response);

      console.log("successfully called api");
      //     let answer = JSON.parse(body);

      //  let scoredLabel = body.Results.output1[0];
      //  let aveSummary = body.Results.output2[0];
      let forecast = 45;
      let location = 'exeter';
      let conditions = 'sunny';
      let currentConditions = 'great';
      // body = body.replace(/"/g, "'");
      // Create 
      //answer.Results.output1[0].ScoredMeanLabel
      //let output = "Current conditions in the " + body;
      let output = "The prediction and average price for sector " + sector +
      " at a listing price of " + price + " is: " + body;


      // Resolve the promise with the output text
      console.log(output);
      console.log(body);
      resolve(output);

    });
    //    resolve("yes it was the ssl http request issue");

  });
}

var res = {};
var req = {};
callSalesDurationApi(12000, "EX");
