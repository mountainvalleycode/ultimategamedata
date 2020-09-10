import requests
from pprint import pprint
from collections import defaultdict
import time
import datetime
import argparse

import metadata
from smashgg_client import SmashggClient
import smashgg_extractor
import database_client


def fetch_tournaments(client, end_timestamp):
    default_start_timestamp = int(datetime.datetime(2018, 12, 1).timestamp())

    while True:
        start_timestamp = database_client.get_last_event_timestamp() - 100
        if start_timestamp is None:
            start_timestamp = default_start_timestamp

        tournaments = client.get_tournaments(start_timestamp, end_timestamp)
        if tournaments is None:
            # There are no more tournaments left
            break

        events_data = smashgg_extractor.get_events_data(tournaments, metadata.SMASH_ULTIMATE_ID)
        database_client.record_events(events_data)

        start_timestamp = tournaments[-1]['startAt']

        # Print our progress
        date = datetime.date.fromtimestamp(start_timestamp)
        print(date)
        time.sleep(1)


def fetch_events(client):
    character_map = metadata.get_character_id_map()

    tournament_id, event_id = database_client.get_unprocessed_event()

    while event_id is not None:
        print(f'Processing event {event_id}...')

        # Get all the sets of the tournament
        event_sets = []
        page = 1
        while True:
            new_sets = client.get_sets(event_id, page=page)
            if not new_sets:
                break

            for event_set in new_sets:
                if event_set['games']:
                    event_sets.append(event_set)
            page += 1
            time.sleep(0.5)

        # Record the games
        games = smashgg_extractor.get_games(event_sets)
        games_data = smashgg_extractor.extract_games_data(games, character_map)

        if len(games_data) > 0:
            database_client.record_games(tournament_id, event_id, games_data)

        print(f'Recorded {len(games_data)} games')

        database_client.mark_event_as_processed(event_id)
        tournament_id, event_id = database_client.get_unprocessed_event()

        time.sleep(0.5)


def main(mode):
    client = SmashggClient(
        api_url=metadata.URL,
        api_token=metadata.TOKEN,
        videogame_id=metadata.SMASH_ULTIMATE_ID
    )

    if mode == 'events':
        end_timestamp = int(datetime.datetime(2020, 9, 1).timestamp())
        fetch_tournaments(client, end_timestamp)
    elif mode == 'games':
        fetch_events(client)
    else:
        raise Exception(f'Unknown mode {mode}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['events', 'games'])
    args = parser.parse_args()

    main(args.mode)
