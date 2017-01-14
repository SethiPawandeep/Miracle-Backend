var express = require('express');
var fs = require('file-system');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var autoIncrement = require('mongoose-auto-increment');

var Student = require('./models/StudentModel');
var Teacher = require('./models/TeacherModel');
var Section = require('./models/SectionModel');
var Feedback = require('./models/FeedbackModel');
var Config = require('./config');

mongoose.connect('mongodb://localhost/miracle');

var db = mongoose.connection;

var test = function () {
    /*
        var stud = new Student({
            rollNumber: 11,
            password: '4as3',
            name: 'asdfasdfasdfd',
            branch: 'sdasdfty',
            year: 4,
            section: 'i23t',
            mobileNumber: 98488,
            emailId: 'asdfa@asf.c',
            gender: 'Male'
        });
        
        stud.save();
    
    Student.find({rollNumber: 11}, function (err, stu) {
        console.log(stu);
    });
*/
};

var App = function () {
    "use strict";

    var self = this;

    self.setupVariables = function () {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port = process.env.OPENSHIFT_NODE_PORT || 8081;

        if (typeof self.ipaddress === 'undefined') {
            console.log('No OPENSHIFT_NODEJS_IP\nUsing 127.0.0.1');
            self.ipaddress = '127.0.0.1';
        }
    };

    self.populateCache = function () {
        if (typeof self.zcache === 'undefined') {
            self.zcache = {
                'index.html': ''
            };
        };
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };

    self.cache_get = function (key) {
        return self.zcache[key];
    };

    self.terminator = function (sig) {
        if (typeof sig === 'string') {
            console.log('%s Received %s - terminating app...', Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    }

    self.setupTerminationHandlers = function () {
        process.on('exit', function () {
            self.terminator();
        });

        [
            'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () {
                self.terminator(element);
            });
        });
    };

    self.createRoutes = function () {
        self.routes = {};

        self.routes['/'] = function (req, res) {
            res.setHeader('Content-type', 'text/html');
            res.send(self.cache_get('index.html'));
        };
    };

    self.initializeServer = function () {
        var r;
        self.createRoutes();
        self.app = express();

        self.app.use(cookieParser());

        //        self.app.set('trust proxy', 1);
        self.app.use(session({
            secret: Config.secret,
            key: Config.key,
            resave: true,
            saveUninitialized: true
        }));

        self.app.use(bodyParser.json());

        for (r in self.routes) {
            if (self.routes.hasOwnProperty(r)) {
                self.app.get(r, self.routes[r]);
            }
        }

        self.app.post('/register', function (req, res) {
            console.log('User Register Post\n\n');
            var user = req.body;
            req.session.token = Math.floor(20 * Math.random())
            if (user.is == 0) {
                if (Student.findByRollNumber(newUser.rollNumber)) {
                    var newStudent = new Student(user);
                    newStudent.save().then(function () {
                        res.json(req.session);
                    }).catch(function (err) {
                        console.log('Error saving model: ');
                        console.log(err);
                        res.status(500).send(err);
                    });
                }
            } else if (user.is == 1) {
                //For teacher
            } else if (user.is == 2) {
                //For Admin
            } else {
                //Invalid
            }
        });
    };

    self.initialize = function () {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        self.initializeServer();
    };

    self.start = function () {
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d...', Date(Date.now()), self.ipaddress, self.port);
        });
    };

    test();
};

var start = function () {
    var zApp = new App();
    zApp.initialize();
    zApp.start();
}

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', start);