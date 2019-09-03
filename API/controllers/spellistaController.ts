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

const createSpellista = (req: Express.Request, res: Express.Response) => {
  const spellista = req.body;
  const conn = dbContext.openConnection();

  conn.query(
    'INSERT INTO Spellistas (playlist_spotify_id, name, user_id) VALUES (?, ?, ?)',
    [spellista.playlistId, spellista.name, spellista.userId],
    err => {
      if (err) console.error(err);
      else res.status(200).end();
      dbContext.closeConnection(conn);
    }
  );
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

const getSpellistas = (req: Express.Request, res: Express.Response) => {
  const userId = req.query.userId;
  const conn = dbContext.openConnection();

  conn.query('SELECT * FROM Spellistas WHERE user_id = ?', [userId], (err, result) => {
    if (err) console.error(err);
    else res.send(result);
    dbContext.closeConnection(conn);
  });
};

const spellistaCtrl = {
  createSpellista,
  getPlaylists,
  getSpellistas
};

export default spellistaCtrl;
