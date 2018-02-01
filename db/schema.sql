DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);


-- DROP TABLE IF EXISTS todos;

-- CREATE TABLE todos (
--   id SERIAL PRIMARY KEY,
--   today VARCHAR(255),
--   weather VARCHAR(255),
--   todolists VARCHAR(255),
--   notes varchar NOT NULL
-- );

DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
  id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(id),
  zip INTEGER,
  weather VARCHAR(255),
  commentday VARCHAR(100),
  comment TEXT
);


INSERT INTO weather (zip, weather, commentday, comment) VALUES (11355, 'raining', 'Mon Jan 29 2018', 'Today is rainy day.');
INSERT INTO weather (zip, weather, commentday, comment) VALUES (10028, 'cloudy', 'Mon Jan 29 2018', 'It''s cloudy');
INSERT INTO weather (zip, weather, commentday, comment) VALUES (11358, 'cold', 'Mon Jan 29 2018', 'Cold day sick day!');
INSERT INTO weather (zip, weather, commentday, comment) VALUES (10025, 'sunny', 'Mon Jan 29 2018', 'YAY!! LET''s GO!!!!');


