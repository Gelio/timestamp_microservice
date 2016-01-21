var express = require('express');
var app = express();


var port = 3000;

if(process.argv[2] === "prod" && process.env.PORT)
    port = process.env.PORT;

var months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

app.get('/[0-9]{10}', function(req, res) {
    var returnObj = {
        error: [false, ''],
        unix: 0,
        natural: ''
    };

    var dateObj = new Date(Number(req.url.slice(1)) * 1000);

    if(dateObj) {
        var month = months[dateObj.getMonth()];
        month = month[0].toUpperCase() + month.slice(1);

        returnObj.unix = req.url.slice(1);
        returnObj.natural = month + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();
    }
    else {
        returnObj.error = [true, 'invalid timestamp'];
    }

    res.send(JSON.stringify(returnObj));
});

app.get(/^\/\w+%20\d{1,2},%20\d{4}$/, function(req, res) {
    var returnObj = {
        error: [false, ''],
        unix: 0,
        natural: ''
    };

    var dateArray = req.url.slice(1).match(/(\w+)%20(\d{1,2}),%20(\d{4})/).slice(1),
        month;

    dateArray[0] = dateArray[0].toLowerCase();

    months.forEach(function(value, index) {
        if(value === dateArray[0])
            month = index;
    });


    if(month === undefined) {
        returnObj.error = [true, 'invalid month'];
    }
    else {
        var dateObj = new Date(dateArray[2], month, dateArray[1]);

        if(dateObj.getFullYear() == dateArray[2] && dateObj.getMonth() == month && dateObj.getDate() == dateArray[1]) {
            returnObj.unix = (dateObj.getTime()/1000).toFixed(0);
            returnObj.natural = req.url.slice(1);
        }
        else
            returnObj.error = [true, 'invalid date'];
    }

    res.send(JSON.stringify(returnObj));
});

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function() {
    console.log('Started listening on port ' + port);
});
