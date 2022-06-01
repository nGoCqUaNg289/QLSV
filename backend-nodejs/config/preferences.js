
import util from 'util'

module.exports = Object.freeze({

   mongodb: {
      // url_format: "mongodb://%s:%s@%s:%s/?authSource=admin&AuthMechanism=SCRAM-SHA-1",
      // url_format_no_auth: 'mongodb://%s:%s',
      // host_no_auth: '127.0.0.1',
      host: '127.0.0.1',
      port: '27017',
      db: 'mydatabase',
      db_usr: 'root',
      db_pwd: 'abc123-',
      usr: "admin",
      pwd: "admin@123"
   },

   // mgUrl: util.format(
   //    "mongodb://%s:%s@%s:%s/?authSource=admin&AuthMechanism=SCRAM-SHA-1",
   //    encodeURIComponent('root'),
   //    encodeURIComponent('abc123-'),
   //    '127.0.0.1',
   //    '27017'
   // ),

   mgUrl: util.format(
      'mongodb://%s:%s',
      '127.0.0.1',
      '27017'
   ),

   jwt: {
      secret: "abc123-=123",
      iss: "APIServer",
      aud: "AppServer"
   },

   rh: {
      baseUrl: 'http://127.0.0.1:8088',
      dataUrl: 'http://127.0.0.1:8088/mydatabase',
      db: 'mydatabase',
      tbUsers: 'tbUsers'
   },

   multer: {
      storage_path: 'media_files/',
      report_path: 'report_files/'
   },

   super: {
      usr: 'su-root',
      pwd: 'su-root',
      roles: 'BIG_DADY'
   }
});