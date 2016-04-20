/**
 * Created by zhiyuans on 12/4/2015.
 */


global.isDev = (process.argv[2] || "").toLowerCase() == 'dev' ? true : false;

var app = require('./app');

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
