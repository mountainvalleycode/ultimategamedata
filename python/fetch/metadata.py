import requests

from secret import TOKEN


URL = 'https://api.smash.gg/gql/alpha'
SMASH_ULTIMATE_ID = 1386


def get_character_id_map():
    r = requests.get("https://api.smash.gg/characters")
    characters = r.json()['entities']['character']
    filtered = {
        c['id']: c['name']
        for c in characters
    }
    return filtered


def get_smash_ultimate_id():
    r = requests.post(
        url,
        data={
            "query": """
                query FindSmashUltimateId($perPage: Int!) {
                  videogames(query: {
                    perPage: $perPage
                    page: 1
                    sortBy: "startAt asc"
                    filter: {
                        name: "Smash Ultimate"
                    }
                  }) {
                    nodes {
                      id
                      name
                      slug
                    }
                  }
                }
            """,
            "variables": '{"perPage": 3}',
        },
        headers={
            'Authorization': f'Bearer {token}',
        }
    )
    return r.json()['data']['videogames']['nodes'][0]['id']

