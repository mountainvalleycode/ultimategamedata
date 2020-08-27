from pprint import pprint

import metadata


def get_event_ids_and_names(tournament, videogame_id):
    event_names = []
    for event in tournament['events']:
        if event['videogame']['id'] == videogame_id:
            event_names.append((event['id'], event['name']))
    return event_names


def get_events_data(tournaments, videogame_id):
    data = []
    for t in tournaments:
        event_ids_and_names = get_event_ids_and_names(t, videogame_id)
        for event_id, event_name in event_ids_and_names:
            data.append((t['id'], t['name'], event_id, event_name, t['startAt']))
    return data


def get_games(event_sets):
    games = []
    for event_set in event_sets:
        set_id = event_set['id']
        for game_number, game in enumerate(event_set['games']):
            if game['selections'] is not None:
                game['setId'] = set_id
                game['gameNumber'] = game_number
                games.append(game)
    return games


def extract_games_data(games, character_map):
    games_data = []
    for game in games:
        data = extract_game_data(game, character_map)
        if data is not None:
            games_data.append(data)
    return games_data


def extract_game_data(game, character_map):
    winner_id = game['winnerId']
    stage_name = '' if game['stage'] is None else game['stage']['name']

    if winner_id is None:
        return None

    selections = _extract_selections(game)
    if selections is None:
        return None

    if len(selections) < 2:
        return None

    if len(selections) > 2:
        pprint(game)
        raise Exception('hanlde this! too many selections')

    if selections[0]['entrant']['id'] == winner_id:
        winner = selections[0]
        loser = selections[1]
    elif selections[1]['entrant']['id'] == winner_id:
        winner = selections[1]
        loser = selections[0]
    else:
        # Did not find a winner; invalid data
        return None

    winner_id = winner['entrant']['id']
    loser_id = loser['entrant']['id']

    winner_name = winner['entrant']['name']
    loser_name = loser['entrant']['name']

    if winner['selectionType'] != 'CHARACTER' or loser['selectionType'] != 'CHARACTER':
        raise Exception('selection were not character')

    winner_char = character_map[winner['selectionValue']]
    loser_char = character_map[loser['selectionValue']]

    return {
        'set_id': game['setId'],
        'game_number': game['gameNumber'],
        'stage_name': stage_name,
        'winner_id': winner_id,
        'loser_id': loser_id,
        'winner_name': winner_name,
        'loser_name': loser_name,
        'winner_char': winner_char,
        'loser_char': loser_char,
    }


def _extract_selections(game):
    selections_by_player_id = {}

    for selection in game['selections']:
        if selection['entrant'] is None:
            continue

        player_id = selection['entrant']['id']

        if player_id is None:
            pprint(game)
            raise Exception('look at this')

        if player_id in selections_by_player_id:
            # check that it's a perfect copy
            if (
                selection['entrant']['name'] == selections_by_player_id[player_id]['entrant']['name'] and
                selection['selectionType'] == selections_by_player_id[player_id]['selectionType'] and
                selection['selectionValue'] == selections_by_player_id[player_id]['selectionValue']
            ):
                continue
            else:
                return None

        selections_by_player_id[player_id] = selection

    return list(selections_by_player_id.values())
