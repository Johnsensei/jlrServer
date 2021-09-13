const express = require('express');
const Video = require('../models/video');
const authenticate = require('../authenticate');
const videoRouter = express.Router();
const cors = require('./cors');

videoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Video.find()
    .then(videos => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(videos);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Video.create(req.body)
    .then(video => {
        console.log('Video Created ', video);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(video);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /videos');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Video.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

videoRouter.route('/:videoId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Video.findById(req.params.videoId)
    .then(video => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(video);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /videos/${req.params.videoId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Video.findByIdAndUpdate(req.params.videoId, {
        $set: req.body
    }, { new: true })
    .then(video => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(video);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Video.findByIdAndDelete(req.params.videoId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = videoRouter;