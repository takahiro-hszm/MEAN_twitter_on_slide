'use strict';

var Content = require('./upload.model');

exports.create = function (req, res, next) {
    var file = req.files.file;

    console.log(req.body.account);
    console.log(req.body.hashtag);
    //console.log(req.body, req.files);
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
     //これをファイル名変えて移動、元ファイル削除
     var newContent = new Content();
     newContent.origin_filename=file.name;
     newContent.filename=file.path;
     newContent.account=req.body.account;
     newContent.hashtag=req.body.hashtag;
     newContent.save(function(err, user) {
     	if (err) return validationError(res, err);
     });
     return res.send("complete!");
 };

exports.index = function(req, res) {
  Content.find(function (err, contents) {
    if(err) { return handleError(res, err); }
    return res.json(200, contents);
  });
};