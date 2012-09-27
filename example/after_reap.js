var connect = require('connect')
, Db = require('mongodb').Db
, Server = require('mongodb').Server
, server_config = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
, db = new Db('test', server_config, {})
, mongoStore = require('connect-mongodb');

//Format store: new mongoStore(options,callback,afterReap);
    connect.createServer(
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({
      cookie: {
        maxAge: 60000 * 1
      } // 1 minutes
      ,
      secret: 'foo',
      store: new mongoStore({
        db: db
      }, function () {
        console.log('set up now');
      }, function (sid) {
        console.log('no of return values of reap: ', sid.length);
      })
    })).listen(3000);
