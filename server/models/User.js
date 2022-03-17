const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save',function(next){
  var user = this;
  if(user.isModified('password')){
    //비밀번호 암호화 
    bcrypt.genSalt(saltRounds, function (err, salt){
      if(err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err)
        user.password = hash
        next()
      })
    })
  } else{
      next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
  //plainpassword 1234567 - 암호화된 비밀번호 : 해시값 ->을 비교하려면 플레인을 암호화하고 암호값이랑 비교 
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;
  //jsonwebtoken을 이용해 토큰 생성 
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  //user._id + 'secretToken' = token   secretToken디코드 -> userid 나옴
  user.token = token
  user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function( token, cb ){
  var user = this;
  //user._id + '' = token
  //토큰 디코드
  jwt.verify(token, 'secretToken', function(err, decoded){
    //유저아이디로 유저 찾기
    //클라이언트에서 가져온 토큰과 디비에 보관된 토큰 일치하는지 확인
    user.findOne({ "_id": decoded, "token:": token }, function(err, user){
      if(err) return cb(err);
      cb(null, user)
    })
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }

