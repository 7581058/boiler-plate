if(process.env.NODE_ENV === 'production'){
  module.expots = require('./prod');
} else {
  module.exports = require('./dev')
}