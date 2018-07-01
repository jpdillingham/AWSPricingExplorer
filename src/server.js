var dotenv = require('dotenv').config();
var AWS = require('aws-sdk');
var express = require('express');

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: 'us-east-1',
})

var pricing = new AWS.Pricing();

// var fetch = (nextToken) => {
//     pricing.describeServices({ NextToken: nextToken}, function (err, data) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else {
//         console.log(data.services);
//         //console.log(data.services.length);
//         if (data.NextToken) { 
//           console.log('======================================================================')
//           fetch(data.NextToken) 
//         }
//       }  
//     });
//   }

  
var fetch = (next) => pricing.describeServices({ NextToken: next }, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        console.log(data.Services);    

        if (data.NextToken) {
            fetch(data.NextToken);
        }
    }
  });
  
fetch();