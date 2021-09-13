const express = require('express');
const MobileApp = require('../models/mobileapp');
const authenticate = require('../authenticate');
const mobileAppRouter = express.Router();
const cors = require('./cors');

//TODO: review what the routes actually do and edit based on needs. Might be ok.
mobileAppRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    MobileApp.find()
    .then(mobileapps => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mobileapps);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    MobileApp.create(req.body)
    .then(mobileApp => {
        console.log('MobileApp Created ', mobileApp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mobileApp);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /mobileapps');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    MobileApp.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

mobileAppRouter.route('/:mobileAppId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    MobileApp.findById(req.params.mobileAppId)
    .then(mobileApp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mobileApp);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /mobileapps/${req.params.mobileAppId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    MobileApp.findByIdAndUpdate(req.params.mobileAppId, {
        $set: req.body
    }, { new: true })
    .then(mobileApp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mobileApp);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    MobileApp.findByIdAndDelete(req.params.mobileAppId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = mobileAppRouter;