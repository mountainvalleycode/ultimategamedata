from pprint import pprint
import csv
import json


def get_character_mappings():
    with open('slug_mappings/characters.json', 'r') as f:
        contents = f.read()
        slug_to_name = json.loads(contents)
        name_to_slug = {v: k for k, v in slug_to_name.items()}
        return slug_to_name, name_to_slug

def get_stage_mappings():
    with open('slug_mappings/stages.json', 'r') as f:
        contents = f.read()
        slug_to_name = json.loads(contents)
        name_to_slug = {v: k for k, v in slug_to_name.items()}
        return slug_to_name, name_to_slug


char_slug_to_name, char_name_to_slug = get_character_mappings()
stage_slug_to_name, stage_name_to_slug = get_stage_mappings()


def overall_stage_stats_to_json():
    d = {}
    with open('data/overall_stage_stats.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for _, stage_name, char_name, wins, losses in reader:
            wins = int(wins)
            losses = int(losses)
            stage_slug = stage_name_to_slug[stage_name]
            char_slug = char_name_to_slug[char_name]

            if stage_slug not in d:
                d[stage_slug] = {
                    'overall': {
                        'totalGames': 0,
                    },
                    'character': {},
                }
            else:
                d[stage_slug]['character'][char_slug] = {
                    'wins': wins,
                    'losses': losses,
                }
                d[stage_slug]['overall']['totalGames'] += wins

    with open('json/stageData.json', 'w') as f:
        f.write(json.dumps(d))


def overall_char_stats_to_json():
    d = {
        'overall': {
            'totalGames': 0,
        },
        'character': {},
    }
    with open('data/overall_character_stats.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for _, char_name, wins, losses in reader:
            wins = int(wins)
            losses = int(losses)
            char_slug = char_name_to_slug[char_name]

            d['character'][char_slug] = {
                'wins': wins,
                'losses': losses,
            }
            d['overall']['totalGames'] += wins

    with open('json/characterRankingsData.json', 'w') as f:
        f.write(json.dumps(d))


def matchup_stats_to_json():
    d = {}
    with open('data/matchup_stats.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for _, _, winner_char_name, loser_char_name, stage_name, num_games, _ in reader:
            num_games = int(num_games)
            winner_char_slug = char_name_to_slug[winner_char_name]
            loser_char_slug = char_name_to_slug[loser_char_name]
            stage_slug = stage_name_to_slug[stage_name]

            key1, key2 = sorted([winner_char_slug, loser_char_slug])
            key3 = stage_slug
            key4 = 'wins' if key1 == winner_char_slug else 'losses'

            if key1 not in d:
                d[key1] = {}

            if key2 not in d[key1]:
                d[key1][key2] = {
                    a_stage_slug: {
                        'wins': 0,
                        'losses': 0,
                    }
                    for a_stage_slug in stage_name_to_slug.values()
                }

            d[key1][key2][key3][key4] = num_games

    with open('json/matchupData.json', 'w') as f:
        f.write(json.dumps(d))


overall_stage_stats_to_json()
overall_char_stats_to_json()
matchup_stats_to_json()
