USE heroku_ee29877bdc24d98;
-- If using local DB, write 'USE LOCAL_DB' where LOCAL_DB is the name of the local database.

CREATE TABLE Spellistas(
  id INT NOT NULL AUTO_INCREMENT,
  playlist_spotify_id VARCHAR(50),
  name VARCHAR(512),
  user_id VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE Llistas(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(512),
  spellista_id INT NOT NULL,
  FOREIGN KEY(spellista_id) REFERENCES Spellistas(id),
  PRIMARY KEY(id)
);

CREATE TABLE Llistas_tracks(
  id INT NOT NULL AUTO_INCREMENT,
  llista_id INT NOT NULL,
  track_id VARCHAR(50) NOT NULL,
  FOREIGN KEY(llista_id) REFERENCES Llistas(id),
  PRIMARY KEY(id)
);