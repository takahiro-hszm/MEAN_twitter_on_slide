'use strict';

exports.create = function (req, res, next) {
    var file = req.files.file;

        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)

        return res.send("complete!");
};
