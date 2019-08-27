const Axios = require('axios');
const constants = require('../util/constants');

module.exports = {
  getPlaylists: (req, res) => {
    const { SPOTIFY_BASE_URI } = constants;
    const { authorization } = req.headers;
    const config = {
      headers: {
        Authorization: authorization
      }
    };

    Axios.get(`${SPOTIFY_BASE_URI}'me/playlists'`, config).then(response => {
      const playlists = response.data.items.map(playlist => playlist.name);
      res.send(JSON.stringify(playlists));
    });
  }
};
