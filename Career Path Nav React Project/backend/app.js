var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const database = require('./database/mssql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//auth routers
var addauthuser = require('./routes/Authentication/adduser')
var getauthuser = require('./routes/Authentication/getuser')

//student routers
var addperson = require('./routes/addperson')
var getperson = require('./routes/getperson')
var getuser = require('./routes/getuser')
var addinterest = require('./routes/Student , Interest , Background/addinterest')
var getinterest = require('./routes/Student , Interest , Background/getinterest')
var addbackground = require('./routes/Student , Interest , Background/addbackground');
var getbackground = require('./routes/Student , Interest , Background/getbackground');
var addjob = require('./routes/Career Recommendations/addJob');
var adddegree = require('./routes/Career Recommendations/addDegree');
var addcourse = require('./routes/Career Recommendations/addCourse');
var updateStatus = require('./routes/Career Recommendations/updatestatus');
var getprogress = require('./routes/Career Recommendations/getProgress');
var addStudentResume = require('./routes/Student , Interest , Background/addStudentResume');
var getStudentResume = require('./routes/Student , Interest , Background/getStudentResume');

//admin routers
var getallstudents = require('./routes/For Admin/getallstudent')

var app = express();

const cors = require("cors");


// Allow requests from specific origins
app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/personImages', express.static(path.join(__dirname, 'personImages')));
app.use('/personImages', express.static(path.join(__dirname, 'public', 'personImages')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

//routes for authentication
app.use('/addauthuser' , addauthuser);
app.use('/getauthuser' , getauthuser);

//routes for student
app.use('/addperson' , addperson);
app.use('/getperson' , getperson);
app.use('/getuser' , getuser);
app.use('/addinterest',addinterest);
app.use('/getinterest', getinterest);
app.use('/addbackground' , addbackground);
app.use('/getbackground' , getbackground);
app.use('/addJob' , addjob);
app.use('/addDegree' , adddegree);
app.use('/addCourse' , addcourse);
app.use('/updateProgressStatus' , updateStatus);
app.use('/getProgresses' ,getprogress);
app.use('/addstudentresume' , addStudentResume);
app.use('/getstudentresume' , getStudentResume);

//routes for admin
app.use('/getstudents' , getallstudents);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
