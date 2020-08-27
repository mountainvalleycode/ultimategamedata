# Ultimate Game Data
All the code that powers ultimategamedata.com.

## To fetch data

### 0. Set up local mysql database and create the appropriate database/tables
```
CREATE DATABASE ultimategamedata;

CREATE TABLE tournament (
  tournament_id INT NOT NULL,
  event_id INT NOT NULL PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  done BOOLEAN
);

CREATE TABLE game (
  tournament_id INT NOT NULL,
  event_id INT NOT NULL,
  set_id INT NOT NULL,
  game_number INT NOT NULL,
  stage_name CHAR(40) NOT NULL,
  winner_id INT NOT NULL,
  loser_id INT NOT NULL,
  winner_name CHAR(40) NOT NULL,
  loser_name CHAR(40) NOT NULL,
  winner_char CHAR(40) NOT NULL,
  loser_char CHAR(40) NOT NULL,
  PRIMARY KEY(set_id, game_number)
);
```

### 1. Get list of all events, and put inside mysql
```
cd python/
python3 fetch/download.py events
```

### 2. From those events, fetch all of their games, and put inside mysql
```
python3 fetch/download.py games
```

### 3. Extract all the games from mysql and put inside csv file
```
mkdir csv
python3 export_to_csv.py
```

### 4. Aggregate the data and export to another csv file
```
python3 process_data.py
```

### 5. Export the csv data to json files so the website can use them.
```
mkdir json
python3 processed_data_to_json.py
```

## To run the website
Roughly,
```
npm install
npm start
npm run serve
```
