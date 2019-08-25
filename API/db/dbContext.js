const constants = require('../util/constants')
const mysql = require('mysql');

module.exports = {
  openConnection: () => {
    const conn = mysql.createConnection(constants.DB_CONNECTION_STRING);
    conn.connect((err) => {
      if (err)
        console.log('Cannot connect to the database');
      else
        console.log('Successfully connected to the database');
    });
    conn.end()
    return conn;
  },

  closeConnection: (conn) => {
    conn.end((err) => {
      if (err)
        console.log(err);
      else
        console.log('Connection closed');
    })
  }
}