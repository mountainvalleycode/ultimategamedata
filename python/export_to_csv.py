from pprint import pprint
import mysql.connector
import csv


connection = mysql.connector.connect(
    user='root',
    host='127.0.0.1',
    database='ultimategamedata'
)
cursor = connection.cursor(buffered=True)

query = 'select timestamp, game.tournament_id, tournament_name, game.event_id, event_name, set_id, game_number, stage_name, winner_id, loser_id, winner_name, loser_name, winner_char, loser_char from game join tournament where game.event_id = tournament.event_id'

cursor.execute(query)

with open('data/full_raw_data.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow([
        'Timestamp',
        'Tournament ID',
        'Tournament Name',
        'Event ID',
        'Event Name',
        'Set ID',
        'Game Number',
        'Stage Name',
        'Winner ID',
        'Loser ID',
        'Winner Name',
        'Loser Name',
        'Winner Character',
        'Loser Character',
    ])

    for row in cursor:
        writer.writerow(row)

cursor.close()
connection.close()
