var express = require('express');
var app = express();

app.get('/[0-9]{10}', function(req, res) {
    var returnObj = {
        'unix': req.url.slice(1),
        'natural': 'say waat?'
    };

    console.log('You passed in unix timestamp');
    res.send(returnObj.toJSON());
});

app.listen(3000, function() {
    console.log('Started listening on port 3000');
});
