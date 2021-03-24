import pandas as pd

pd.set_option('display.max_columns', 6)
pd.set_option('display.min_rows', 20)
pd.set_option('display.max_rows', 20)


################################################################################


df = pd.read_csv('data/full_raw_data.csv')

# Remove ditto matches
ditto_condition = df['Winner Character'] == df['Loser Character']
df.drop(df[ditto_condition].index, inplace=True)

# Remove matches fought on an unknown stage
df.dropna(subset=['Stage Name'], inplace=True)

# Remove matches with Random character
random_char_condition = (df['Winner Character'] == 'Random Character') | (df['Loser Character'] == 'Random Character')
df.drop(df[random_char_condition].index, inplace=True)

# Remove matches with invalid characters
invalid_chars = ['Jacqui Briggs']
invalid_char_condition = (df['Winner Character'].isin(invalid_chars)) | (df['Loser Character'].isin(invalid_chars))
df.drop(df[invalid_char_condition].index, inplace=True)

# Remove any non-standard stages
standard_stages = [
    'Battlefield',
    'Small Battlefield',
    'Final Destination',
    'Kalos Pokémon League',
    'Lylat Cruise',
    'Pokémon Stadium 2',
    'Smashville',
    'Town and City',
    'Unova Pokémon League',
    "Yoshi's Island",
    "Yoshi's Story",
]
nonstandard_stage_condition = ~df['Stage Name'].isin(standard_stages)
df.drop(df[nonstandard_stage_condition].index, inplace=True)

# Replace character names
df.replace(to_replace={
    'Rosalina': 'Rosalina & Luma',
    'Simon Belmont': 'Simon',
    'Banjo-Kazooie': 'Banjo & Kazooie',
    'Kalos Pokémon League': 'Kalos Pokemon League',
    'Unova Pokémon League': 'Unova Pokemon League',
    'Pokémon Stadium 2': 'Pokemon Stadium 2',
}, inplace=True)



################################################################################


def create_key(row):
    char1, char2, stage = row
    return ' '.join(sorted([char1, char2]) + [stage])

new_column = df[['Winner Character', 'Loser Character', 'Stage Name']].apply(create_key, axis=1)
df['Matchup Key'] = new_column


################################################################################


# Character matchups by stage

wins_df = df.groupby(['Matchup Key', 'Winner Character', 'Loser Character', 'Stage Name']).count()
wins_df.rename(columns={'Tournament ID': 'Count'}, inplace=True)
wins_df.drop(columns=[c for c in wins_df.columns if c != 'Count'], inplace=True)
wins_df.reset_index(inplace=True)

total_df = df.groupby(['Matchup Key']).count()
total_df.rename(columns={'Tournament ID': 'Total'}, inplace=True)
total_df.drop(columns=[c for c in total_df.columns if c != 'Total'], inplace=True)
total_df.reset_index(inplace=True)

matchup_stats = wins_df.merge(total_df, how='outer', on='Matchup Key')

matchup_stats.to_csv('data/matchup_stats.csv')



################################################################################


# Overall character wins/losses

char_wins_df = df.groupby('Winner Character').count()
char_wins_df.reset_index(inplace=True)
char_wins_df.rename(columns={'Winner Character': 'Character', 'Tournament ID': 'Wins'}, inplace=True)
char_wins_df.drop(columns=[c for c in char_wins_df.columns if c not in ('Character', 'Wins')], inplace=True)

char_losses_df = df.groupby('Loser Character').count()
char_losses_df.reset_index(inplace=True)
char_losses_df.rename(columns={'Loser Character': 'Character', 'Tournament ID': 'Losses'}, inplace=True)
char_losses_df.drop(columns=[c for c in char_losses_df.columns if c not in ('Character', 'Losses')], inplace=True)

char_stats = char_wins_df.merge(char_losses_df, how='outer', on='Character')

char_stats.to_csv('data/overall_character_stats.csv')


################################################################################


# Overall character wins/losses by stage

stage_wins_df = df.groupby(['Stage Name', 'Winner Character']).count()
stage_wins_df.reset_index(inplace=True)
stage_wins_df.rename(columns={'Winner Character': 'Character', 'Matchup Key': 'Wins'}, inplace=True)
stage_wins_df.drop(columns=[c for c in stage_wins_df.columns if c not in ('Stage Name', 'Character', 'Wins')], inplace=True)

stage_losses_df = df.groupby(['Stage Name', 'Loser Character']).count()
stage_losses_df.reset_index(inplace=True)
stage_losses_df.rename(columns={'Loser Character': 'Character', 'Matchup Key': 'Losses'}, inplace=True)
stage_losses_df.drop(columns=[c for c in stage_losses_df.columns if c not in ('Stage Name', 'Character', 'Losses')], inplace=True)

stage_stats = stage_wins_df.merge(stage_losses_df, how='outer', on=['Stage Name', 'Character'])
stage_stats.fillna(0, inplace=True)
stage_stats = stage_stats.astype({'Wins': int, 'Losses': int})

stage_stats.to_csv('data/overall_stage_stats.csv')
