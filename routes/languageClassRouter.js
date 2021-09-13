const express = require('express');
const LanguageClass = require('../models/languageclass');
const authenticate = require('../authenticate');
const cors = require('./cors');

const languageClassRouter = express.Router();

languageClassRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    LanguageClass.find()
    //.populate('comments.author')
    .then(languageClasses => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(languageClasses);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    LanguageClass.create(req.body)
    .then(languageClass => {
        console.log('LanguageClass Created ', languageClass);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(languageClass);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /languageclasses');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    LanguageClass.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

languageClassRouter.route('/:languageClassId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    LanguageClass.findById(req.params.languageClassId)
    //.populate('comments.author')
    .then(languageClass => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(languageClass);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /languageclasses/${req.params.languageClassId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    LanguageClass.findByIdAndUpdate(req.params.languageClassId, {
        $set: req.body
    }, { new: true })
    .then(languageClass => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(languageClass);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    LanguageClass.findByIdAndDelete(req.params.languageClassId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = languageClassRouter;