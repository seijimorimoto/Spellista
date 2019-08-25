USE heroku_ee29877bdc24d98;

CREATE TABLE Users(
  id INT NOT NULL AUTO_INCREMENT,
  user_spotify_id VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE Spellistas(
  id INT NOT NULL AUTO_INCREMENT,
  playlist_spotify_id VARCHAR(50),
  name VARCHAR(512),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),
  PRIMARY KEY(id)
);

CREATE TABLE Llistas(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(512),
  spellista_id INT NOT NULL,
  FOREIGN KEY(spellista_id) REFERENCES Spellistas(id),
  PRIMARY KEY(id)
);

CREATE TABLE Songs(
  id INT NOT NULL AUTO_INCREMENT,
  track_spotify_id VARCHAR(50),
  PRIMARY KEY(id)
);

CREATE TABLE Llistas_songs(
  llista_id INT NOT NULL,
  song_id INT NOT NULL,
  FOREIGN KEY(llista_id) REFERENCES Llistas(id),
  FOREIGN KEY(song_id) REFERENCES Songs(id),
  PRIMARY KEY(llista_id, song_id)
);