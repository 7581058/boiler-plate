const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const config = require('./server/config/key');
const { auth } = require('./server/middleware/auth');
const { User } = require('./server/models/User');

//application/x-www-form-urlencoded 분석,가져옴
app.use(bodyParser.urlencoded({extended: true}));

//application/json 분석,가져옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(()=>console.log('mongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => res.send('hello'))

 //회원가입시 필요한 정보 클라이언트에서 가져오면 데이터베이스에 넣어줌 
app.post('/api/users/register', (req, res) => {
  
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  //요청된 이메일 디비에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "아이디또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      })
    }
     //요청된 이메일 있다면 비밀번호 맞는지 체크 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비밀번호 맞으면 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        //쿠키에 토큰 저장 
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    }) 
  }) 
})

app.get('/api/users/auth', auth,(req, res) => {
  //authentication이 true 

  res.status(200).json({
    _id: req.user._id,
    //role 0 이면 일반유저 아니면 관리자 
    isAdmin: req.user.role === 0 ? false : true,
    isAuth : true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {
  console.log(req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
  })
})


app.listen(port, () => console.log(`example app listening on port ${port}!`))
