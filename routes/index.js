/*
 * GET home page.
 */
var logger = require("./../models/logger.js");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.log = function(req, res){
    var tmpData = {};
    for(var s in req.query){
        console.info("req.query = ", s );
        if(s !== "__proto__"){
            tmpData[s] = req.query[s];
        }
    }
    tmpData.UserAgent = req.get('User-Agent');
    console.info("tmpData = ", tmpData);
    logger.save(tmpData, function(err){
        res.send(err);
    });
    res.send('');
};
exports.findAll = function(req, res){
    console.info(req.get('User-Agent'));
    logger.findAll(function(err, obj){
        // var str = JSON.stringify(obj);
        res.send(obj);
    });
}