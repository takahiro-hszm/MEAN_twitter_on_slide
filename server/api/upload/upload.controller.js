'use strict';

var Content = require('./upload.model');
var gm = require('gm');
var fs = require('fs');
var crypto = require('crypto');
var config = require('../../config/environment');


exports.create = function (req, res, next) {
    var file = req.files.file;
    var pages;
    var converted_name;
    var encripted_name;//暗号化された名前
    //eq.body.account　アカウント名
    //req.body.hashtag ハッシュタグ
    //converted_name ファイル名　拡張子なし
    //file.path ランダム文字列ファイルのパス
    //file.name 元のファイル名
    var result =  file.name.match(/(.+)\.pdf$/);
    if(result == null){
        console.log("detect invaid filename");
    }else {
        console.log(config.connect_phrase);
        console.log(config.conversion_password);

        converted_name = req.body.account+config.connect_phrase+result[1];
        var cipher = crypto.createCipher('aes-256-cbc', config.conversion_password);
        var crypted = cipher.update(converted_name, 'utf-8', 'hex');
        crypted += cipher.final('hex');
        encripted_name = crypted;
    }
     //これをファイル名変えて移動、元ファイル削除

     console.log('converting...');
     gm(file.path)
     .options({imageMagick: true})
     .identify(function(err, value){
        pages = value.Scene.split(" of ");
        console.log(Number(pages[0]));
     })
     //.geometry(2000,1500)//サイズの変更　これは無くてもいい
     .density(300,300)//300,300でいい感じ　数秒かかるので負荷との問題
     .write('./client/images/'+encripted_name+'.jpg', function (err) {//ファイルパスで日本語だとダメなのでランダム名のまま変換！
        if (err) {
            console.log('conversion error');
            console.log(err);
            return res.send("err");
        }else{
            console.log("conversion success");

            //ファイル分割成功
            fs.rename(file.path,"./client/pdf/"+encripted_name+'.pdf',function(err){
                if (err) console.log(err);
                console.log('successfully renamed');
            });//tmpのrename
            var newContent = new Content();
            newContent.origin_filename=file.name;
            newContent.filename=encripted_name;//"~/sample" この後に-0.jpg等をつけるとファイルパス
            newContent.account=req.body.account;
            newContent.hashtag=req.body.hashtag;
            newContent.scene=Number(pages[0]);//0~sceneまでがファイル番号
            newContent.save(function(err, user) {
                if (err) return validationError(res, err);
            });

            return res.send("success");//ここの文字列は固定
        }
    })




 };

exports.index = function(req, res) {
  Content.find(function (err, contents) {
    if(err) { return handleError(res, err); }
    return res.json(200, contents);
  });
};