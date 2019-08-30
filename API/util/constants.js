module.exports = {
  DB_CONNECTION: process.env.CLEARDB_DATABASE_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spellistadev'
  },
  SPOTIFY_BASE_URI: 'https://api.spotify.com/v1'
};
