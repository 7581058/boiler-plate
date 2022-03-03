const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 분석,가져옴
app.use(bodyParser.urlencoded({extended: true}));

//application/json 분석,가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://daseul:gamja1234@boilerplate.epmxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
}).then(()=>console.log('mongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => res.send('hello'))

 //회원가입시 필요한 정보 클라이언트에서 가져오면 데이터베이스에 넣어줌 
app.post('/register', (req, res) => {
  
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => console.log(`example app listening on port ${port}!`))