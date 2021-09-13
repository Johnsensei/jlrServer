const express = require('express');
const Student = require('../models/student');
const authenticate = require('../authenticate');
const cors = require('./cors');

const studentRouter = express.Router();

studentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Student.find()
    .then(students => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Student.findOne({user: req.user._id})
    .then(student => {
        if (student) {
            (student => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
            })
            .catch(err => next(err));
        }
        else {
        Student.create({
            user: req.user._id,
            students: req.body
        })
        .then(student => {
            student.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
        })
        .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /students`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //Student.findOneAndRemove comes up in autocomplete.
    Student.findOneAndDelete({user: req.user._id})
    .then(student => {
        if (student) {
            (response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end('You do not have any students to delete.');
        }
    })
    .catch(err => next(err));
});

studentRouter.route('/:studentId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    (student => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
        })
        .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /students/${req.params.studentId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    MobileApp.findByIdAndUpdate(req.params.studentId, {
        $set: req.body
    }, { new: true })
    .then(student => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Student.findOne(req.params.languageClassId)
    .then(student => {
        if (student) {
            (response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end('You do not have any students to delete.');
        }
    })
    .catch(err => next(err));
});

module.exports = studentRouter;