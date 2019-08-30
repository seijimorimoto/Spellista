import Express from 'express';
import Axios from 'axios';
import dbContext from '../db/dbContext';
import constants from '../util/constants';

const configBuilder = (authorization: string | undefined) => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      'Content-type': 'application/json'
    }
  };
};

const createUserIfNeeded = (req: Express.Request, res: Express.Response) => {
  const { SPOTIFY_BASE_URI } = constants;
  const { authorization } = req.headers;
  const config = configBuilder(authorization);

  Axios.get(`${SPOTIFY_BASE_URI}/me`, config).then(response => {
    const userId = response.data.id;
    const conn = dbContext.openConnection();

    conn.query('INSERT IGNORE INTO Users (user_spotify_id) VALUES (?)', [userId], err => {
      if (err) console.error(err);
      else res.status(200).end();
      dbContext.closeConnection(conn);
    });
  });
};

const getPlaylists = (req: Express.Request, res: Express.Response) => {
  const { SPOTIFY_BASE_URI } = constants;
  const { authorization } = req.headers;
  const config = configBuilder(authorization);

  Axios.get(`${SPOTIFY_BASE_URI}/me/playlists`, config)
    .then(response => {
      const playlists = response.data.items
        .map((playlist: any) => {
          const url = playlist.images.length > 0 ? playlist.images[0].url : null;
          return {
            name: playlist.name,
            imageUrl: url
          };
        })
        .sort((pl1: any, pl2: any) => {
          return pl1.name <= pl2.name ? -1 : 1;
        });
      res.send(JSON.stringify(playlists));
    })
    .catch(error => console.error(error.response.data));
};

const spellistaCtrl = {
  createUserIfNeeded,
  getPlaylists
};

export default spellistaCtrl;
