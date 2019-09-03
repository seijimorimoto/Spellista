import Express from 'express';
import Axios, { AxiosRequestConfig } from 'axios';
import dbContext from '../db/dbContext';
import constants from '../util/constants';
import { RowDataPacket } from 'mysql';
import { ITrackDictionary } from './spellistaController.types';

const configBuilder = (
  authorization: string | undefined,
  queryParams?: any
): AxiosRequestConfig => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      'Content-type': 'application/json'
    },
    params: queryParams
  };
};

const addTrackToLlista = (req: Express.Request, res: Express.Response) => {
  const llistaTrack = req.body;
  const conn = dbContext.openConnection();

  conn.query(
    'INSERT INTO Llistas_tracks (llista_id, track_id) VALUES (?, ?)',
    [llistaTrack.llistaId, llistaTrack.trackId],
    err => {
      if (err) console.error(err);
      else res.status(200).end();
      dbContext.closeConnection(conn);
    }
  );
};

const createLlista = (req: Express.Request, res: Express.Response) => {
  const llista = req.body;
  const conn = dbContext.openConnection();

  conn.query(
    'INSERT INTO Llistas (name, spellista_id) VALUES (?, ?)',
    [llista.name, llista.spellistaId],
    err => {
      if (err) console.error(err);
      else res.status(200).end();
      dbContext.closeConnection(conn);
    }
  );
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

const getLlistas = (req: Express.Request, res: Express.Response) => {
  const spellistaId = req.query.spellistaId;
  const conn = dbContext.openConnection();

  conn.query(
    'SELECT L.id, L.name, LT.track_id FROM Llistas L JOIN Llistas_tracks LT ON L.id = LT.llista_id WHERE L.spellista_id = ? ORDER BY L.name',
    [spellistaId],
    (err, result) => {
      if (err) console.error(err);
      else {
        // TODO: Implement a way for retrieving the info of more than 50 songs.
        const setOfTrackIds = new Set<string>();
        const r = result as RowDataPacket[];
        for (let index in r) {
          setOfTrackIds.add(r[index].track_id);
        }
        const trackIds = Array.from(setOfTrackIds).join(',');

        const { SPOTIFY_BASE_URI } = constants;
        const { authorization } = req.headers;
        const config = configBuilder(authorization, { ids: trackIds });

        Axios.get(`${SPOTIFY_BASE_URI}/tracks`, config).then(response => {
          let tracks: ITrackDictionary = {};
          response.data.tracks.forEach((track: any) => {
            const artists = track.artists.map((artist: any) => artist.name).join(', ');
            tracks[track.id] = {
              name: track.name,
              artists: artists
            };
          });

          res.send({ llistasInfo: result, tracksInfo: tracks });
        });
      }
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
  addTrackToLlista,
  createLlista,
  createSpellista,
  getLlistas,
  getPlaylists,
  getSpellistas
};

export default spellistaCtrl;
