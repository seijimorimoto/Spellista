const Axios = require('axios');
const constants = require('../util/constants');

module.exports = {
  getPlaylists: (req, res) => {
    const { SPOTIFY_BASE_URI } = constants;
    const { authorization } = req.headers;
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: authorization,
        'Content-type': 'application/json'
      }
    };

    Axios.get(`${SPOTIFY_BASE_URI}/me/playlists`, config)
      .then(response => {
        const playlists = response.data.items
          .map(playlist => {
            const url = playlist.images.length > 0 ? playlist.images[0].url : null;
            return {
              name: playlist.name,
              imageUrl: url
            };
          })
          .sort((pl1, pl2) => {
            return pl1.name <= pl2.name ? -1 : 1;
          });
        res.send(JSON.stringify(playlists));
      })
      .catch(error => console.error(error.response.data));
  }
};
