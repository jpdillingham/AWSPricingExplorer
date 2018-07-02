require('./dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');

if (!process.env.REACT_APP_ACCESS_KEY_ID | !process.env.REACT_APP_SECRET_ACCESS_KEY) {
    throw 'AWS credentials are not configured; create an .env file in the root folder with keys REACT_APP_ACCESS_KEY_ID and REACT_APP_SECRET_ACCESS_KEY.';
}

const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;

app.use(cors());  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION || 'us-east-1',
});

const pricing = new AWS.Pricing();

// retrieve a list of all AWS services
app.get('/services', (req, res) => {
    describeAllServices()
    .then(data => {
        res.status(200);
        res.json(data);
    })
    .catch(error => {
        res.status(500);
        res.json(error);
    });
});

// retrieve details for a specific service
app.get('/services/:service', (req, res) => {
    pricing.describeServices({ ServiceCode: req.params.service }).promise()
    .then(data => {
        res.status(200);
        res.json(data);
    })
    .catch(error => {
        res.status(500);
        res.json(error);
    });
});

const describeAllServices = (services = [], next) => {
    return new Promise((resolve, reject) => {
        pricing.describeServices({ NextToken: next }).promise()
        .then(data => {
            services = services.concat(data.Services);
 
            if (data.NextToken) {
                describeAllServices(services, data.NextToken)
                .then(data => resolve(data));
            } 
            else {
                resolve(services);
            }
        })    
    });
}

// retrieve products for a specific service
// include filters as query params, e.g. '/services/AmazonEC2/products?location=US West (Oregon)&instanceType=c5.4xlarge'
app.get('/services/:service/products', (req, res) => {
    getAllProducts(req.params.service, req.query).then(data => {
        res.status(200);
        res.json(data);
    })
    .catch(error => {
        res.status(500);
        res.json(error);
    });
});

const getAllProducts = (service, filters = [], products = [], next) => {
    let pricingFilters = Object.keys(filters)
        .map(f => { return { Field: f, Type: 'TERM_MATCH', Value: filters[f]}});

    return new Promise((resolve, reject) => {
        pricing.getProducts({ ServiceCode: service, NextToken: next, Filters: pricingFilters }).promise()
        .then(data => {
            products = products.concat(data.PriceList);

            if (data.NextToken) {
                getAllProducts(service, filters, products, data.NextToken)
                .then(data => resolve(data));
            } 
            else {
                resolve(products);
            }
        });
    });
}

// retrieve a list of acceptable values for a specific service and attribute
app.get('/services/:service/attributeValues/:attribute', (req, res) => {
    getAllAttributeValues(req.params.service, req.params.attribute)
    .then(data => {
        res.status(200);
        res.json(data);
    })
    .catch(error => {
        res.status(500);
        res.json(error);
    });
});

const getAllAttributeValues = (service, attribute, values = [], next) => {
    return new Promise((resolve, reject) => {
        pricing.getAttributeValues({ ServiceCode: service, AttributeName: attribute, NextToken: next }).promise()
        .then(data => {
            values = values.concat(data.AttributeValues);

            if (data.NextToken) {
                getAllAttributeValues(service, attribute, values, data.NextToken)
                .then(data => resolve(data))
            }
            else {
                resolve(values);
            }
        })
    })
}

app.listen(port, () => console.log('Listening on port ' + port + '.'));