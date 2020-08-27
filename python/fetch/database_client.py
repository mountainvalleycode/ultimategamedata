from pprint import pprint
import mysql.connector

def _setup():
    connection = mysql.connector.connect(
        user='root',
        host='127.0.0.1',
        database='ultimategamedata'
    )
    cursor = connection.cursor()
    return connection, cursor


def _cleanup(connection, cursor):
    cursor.close()
    connection.close()


def get_last_event_timestamp():
    connection, cursor = _setup()

    cursor.execute('SELECT MAX(timestamp) FROM tournament')
    timestamp = None
    for result in cursor:
        timestamp = result[0]

    _cleanup(connection, cursor)

    return timestamp


def record_events(events_data):
    connection, cursor = _setup()

    query = 'INSERT IGNORE INTO tournament (tournament_id, tournament_name, event_id, event_name, timestamp, done) VALUES (%s, %s, %s, %s, %s, %s)'
    values = [
        (*data, False)
        for data in events_data
    ]
    cursor.executemany(query, values)
    connection.commit()

    _cleanup(connection, cursor)


def get_unprocessed_event():
    connection, cursor = _setup()

    query = 'SELECT tournament_id, event_id FROM tournament WHERE done = false ORDER BY timestamp LIMIT 1'

    cursor.execute(query)

    tournament_id = None
    event_id = None

    for result in cursor:
        tournament_id, event_id = result

    _cleanup(connection, cursor)

    return tournament_id, event_id


def mark_event_as_processed(event_id):
    connection, cursor = _setup()

    query = 'UPDATE tournament SET done = true WHERE event_id = %s'
    cursor.execute(query, (event_id,))
    connection.commit()

    _cleanup(connection, cursor)


def record_games(tournament_id, event_id, games_data):
    connection, cursor = _setup()

    query = (
        'INSERT IGNORE INTO game (tournament_id, event_id, set_id, game_number, stage_name, '
        'winner_id, loser_id, winner_name, loser_name, winner_char, loser_char) VALUES '
        '(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    )
    values = [
        (
            tournament_id,
            event_id,
            data['set_id'],
            data['game_number'],
            data['stage_name'],
            data['winner_id'],
            data['loser_id'],
            data['winner_name'],
            data['loser_name'],
            data['winner_char'],
            data['loser_char'],
        )
        for data in games_data
    ]

    cursor.executemany(query, values)
    connection.commit()

    _cleanup(connection, cursor)
