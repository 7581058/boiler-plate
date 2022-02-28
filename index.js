const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://daseul:gamja1234@boilerplate.epmxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {

}).then(()=>console.log('mongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => res.send('hello'))

app.listen(port, () => console.log(`example app listening on port ${port}!`))