require('dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: 'us-east-1',
})

var pricing = new AWS.Pricing();

var describeAllServices = (services = [], next) => {
    return new Promise((resolve, reject) => {
        pricing.describeServices({ NextToken: next }).promise()
        .then(data => {
            services = services.concat(data.Services);
            if (data.NextToken) {
                describeAllServices(services, data.NextToken)
                .then(data => resolve(data))
            } 
            else {
                resolve(services);
            }
        })
    })
}

app.get('/services', (req, res) => {
    describeAllServices().then(data => {
        res.status(200);
        res.json(data);
    })
})

app.listen(port, () => console.log('Listening on port ' + port + '.'));