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


     var gm = require('gm');


     gm('./server/images/a.pdf')
     .options({imageMagick: true})
     //.geometry(2000,1500)//サイズの変更　これは無くてもいい
     .density(300,300)//300,300でいい感じ　数秒かかるので負荷との問題
     .write('./images/a.jpg', function (err) {
        if (err) {
            console.log(err);
        }else{
            console.log("success!");
        }
    })


     return res.send("complete!");

 };

exports.index = function(req, res) {
  Content.find(function (err, contents) {
    if(err) { return handleError(res, err); }
    return res.json(200, contents);
  });
};