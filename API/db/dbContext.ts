import Mysql from 'mysql2';
import constants from '../util/constants';
import { ConnectionOptions } from 'mysql2';

const openConnection = (): Mysql.Connection => {
  let conn;
  if (constants.DB_CONNECTION as string)
    conn = Mysql.createConnection(constants.DB_CONNECTION as string);
  else conn = Mysql.createConnection(constants.DB_CONNECTION as ConnectionOptions);
  conn.connect(err => {
    if (err) console.log('Cannot connect to the database');
    else console.log('Successfully connected to the database');
  });
  return conn;
};

const closeConnection = (conn: Mysql.Connection) => {
  conn.end(err => {
    if (err) console.log(err);
    else console.log('Connection closed');
  });
};

const dbContext = {
  openConnection,
  closeConnection
};

export default dbContext;
