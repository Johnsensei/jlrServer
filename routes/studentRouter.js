const express = require('express');
const Student = require('../models/student');
const authenticate = require('../authenticate');
const cors = require('./cors');

const studentRouter = express.Router();

//All these routes are a mess and will need redone based on actual needs.
studentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Student.find({ user: req.user._id })
    .populate('user.ref')
    .populate('languageClasses.ref')
    .then(languageClasses => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(languageClasses);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //How to? include a message in the format of [{"_id":"languageClass ObjectId"},  . . . , {"_id":"languageClass ObjectId"}] in the body of the message
    //Is it just a console.log?
    Student.findOne({user: req.user._id})
    .then(student => {
        if (student) {
            //These object chains don't make sense.
            if (student.languageClasses.indexOf(student._id) === -1) {
                student.languageClasses.push(student._id)
                }
                student.save()
                    .then(student => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(student);
                    })
                    .catch(err => next(err));
                }
                else {
                Student.create({
                    user: req.user._id,
                    languageClasses: req.body
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
    res.end(`PUT operation not supported on /students/${req.params.languageClassId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //Student.findOneAndRemove comes up in autocomplete.
    Student.findOneAndDelete({user: req.user._id})
    .then(student => {
        if (student) {
            if (student.languageClasses.indexOf(req.user._id !== 1)) {
                student.languageClasses.splice(student.languageClasses.indexOf(req.user._id), 1)
                .then(response => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })
                .catch(err => next(err));
            } else {
                res.setHeader('Content-Type', 'text/plain');
                res.end('You do not have any students to delete.');
            }
        }
    })
    .catch(err => next(err));
});

//This path is irrelevant.
studentRouter.route('/:languageClassId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    //Not an actual path.
    res.end(`GET operation not supported on /students/${req.params.languageClassId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Student.findOne({user: req.user._id})
    .then(student => {
        if (student) {
            //Again this object chain is non-existent.
            if (student.languageClasses.indexOf(student._id) === -1) {
                student.languageClasses.push(student._id)
                }
                student.save()
                    .then(student => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(student);
                    })
                    .catch(err => next(err));
                }
                else {
                //How to? If the languageClass is already in the array, then respond with a message saying "That languageClass is already in the list of students!" 
                Student.create({
                    user: req.user._id,
                    languageClasses: req.body
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
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    //Not an actual path.
    res.end(`PUT operation not supported on /students/${req.params.languageClassId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Student.findOne(req.params.languageClassId)
    .then(student => {
        if (student) {
            //Not a valid object chain.
            if (student.languageClasses.indexOf(req.user._id !== 1)) {
                student.languageClasses.splice(student.languageClasses.indexOf(req.user._id), 1)
                .then(response => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })
                .catch(err => next(err));
            } else {
                res.setHeader('Content-Type', 'text/plain');
                res.end('You do not have any students to delete.');
            }
        }
    })
    .catch(err => next(err));
});

module.exports = studentRouter;