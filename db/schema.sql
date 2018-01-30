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
  zip integer,
  weather VARCHAR(255),
  commentDay VARCHAR(255),
  comment VARCHAR(255)
);


INSERT INTO weather (zip, weather, commentDay, comment) VALUES (11355, 'raining', '1/28/18', 'Today is rainy day.');
INSERT INTO weather (zip, weather, commentDay, comment) VALUES (10028, 'cloudy', '1/28/18', 'It''s cloudy');
INSERT INTO weather (zip, weather, commentDay, comment) VALUES (11358, 'cold', '1/28/18', 'Cold day sick day!');
INSERT INTO weather (zip, weather, commentDay, comment) VALUES (10025, 'sunny', '1/28/18', 'YAY!! LET''s GO!!!!');


