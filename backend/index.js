const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/jobSearch'

const app = express()

const jobsRouter = require("./routes/jobRoutes")

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/addLocation', jobsRouter);
app.use('/addFieldOfWork', jobsRouter);
app.use('/addFirm', jobsRouter);
app.use('/addJob', jobsRouter);
app.use('/getFieldsOfWork', jobsRouter);
app.use('/getJobs', jobsRouter);
app.use('/getJob', jobsRouter);
//app.use('/filterJobs', jobsRouter);

mongoose.connect(url);
const conn = mongoose.connection

conn.on('open', function(){
    console.log('connected..')
})

//const port = app.get('port') || 3000
app.listen(9000, function(){
    console.log("server started");
})