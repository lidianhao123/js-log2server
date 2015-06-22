var mongodb = require('./mongodb');
    
var Schema = mongodb.mongoose.Schema;

var LoggerSchema = new Schema({
    uname         : String,
    ID            : String,
    organ         : String,
    organID       : String,
    name          : String,
    message       : String,
    location      : String,
    position      : String,
    func          : String,
    UserAgent     : String
});

var Logger = mongodb.mongoose.model("Logger", LoggerSchema);
var LoggerDAO = function(){};

LoggerDAO.prototype.save = function(obj, callback) {
  console.info("obj.name = ", obj.ID);
  var instance = new Logger(obj);
  instance.save(function(err){
    callback(err);
  });
  console.info("after instance");
};

LoggerDAO.prototype.findByIdAndUpdate = function(obj,callback){
  var _id=obj._id;
  delete obj._id;
  Logger.findOneAndUpdate(_id, obj, function(err,obj){
    callback(err, obj);
  });
}

LoggerDAO.prototype.findByName = function(name, callback) {
  Logger.findOne({name:name}, function(err, obj){
    callback(err, obj);
  });
};
LoggerDAO.prototype.findAll = function(callback) {
  Logger.find({}, function(err, obj){
    callback(err, obj);
  });
};

module.exports = new LoggerDAO();