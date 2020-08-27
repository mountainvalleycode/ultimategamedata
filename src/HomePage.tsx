import * as React from "react"
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { default as HelpIcon } from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { characterNames } from './resources/characters';
import { stageNames } from './resources/stages';
import { navigate, characterLink, matchupLink, stageLink, rankingsLink } from './links';

import { SelectComponent, ISelectItem } from './SelectComponent';
import { Header } from './Header';

import * as styles from './styles';


function getHeadIconUrl(char_slug: string): string {
  return `/head_icons/${char_slug}.png`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    backgroundColor: styles.aliceBlue,
    marginTop: '0',
    marginBottom: '1.45rem',
    borderRadius: '4px',
  },
  gridItemFirst: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12px',
  },
  gridItemLast: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '12px',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    backgroundColor: styles.steelBlue,
    '&:hover': {
      backgroundColor: styles.yaleBlue,
    },
  },
}));



const CharacterStats = ({ characters }: { characters: ISelectItem[] }) => {
  const [character, setCharacter] = useState<ISelectItem | null>(null);
  const [echo, setEcho] = useState<ISelectItem | null>(null)

  const handleChange = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setCharacter(value);
  };
  const handleChangeEcho = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setEcho(value);
  };

  const onClickGo = () => {
    if (character) {
      const slugs = [character.slug];
      if (echo) {
        slugs.push(echo.slug);
      }
      navigate(characterLink(slugs));
    }
  }

  const classes = useStyles();

  const info = [
    'View stats for a single character (or a pair of echo fighters) against the rest of the cast.',
    'E.g. to view stats for Mario, put Mario in the first field and leave the echo fighter field empty.',
    'To the view stats for Peach/Daisy, put Peach in the first field and put Daisy in the echo fighter field.'
  ].join(' ');

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} spacing={3} justify={'center'}>
        <Grid item xs={12} className={classes.gridItemFirst}>
          <h2>Character Stats</h2>
          <HelpIcon data-tip={info} style={{ marginLeft: '4px' }}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <SelectComponent
              label={'Select a character'}
              items={characters}
              selectedItem={character}
              onChange={handleChange}
              marginBottom={true}
            />
            <SelectComponent
              label={'Select echo fighter'}
              items={characters}
              selectedItem={echo}
              onChange={handleChangeEcho}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.gridItemLast}>
          <Button className={classes.button} variant="contained" color="primary" onClick={onClickGo}>Go!</Button>
        </Grid>
      </Grid>
    </div>
  );
};


const MatchupStatsSection = ({ characters }: { characters: ISelectItem[] }) => {
  const classes = useStyles();

  const [char1, setChar1] = useState<ISelectItem | null>(null);
  const [echo1, setEcho1] = useState<ISelectItem | null>(null);
  const [char2, setChar2] = useState<ISelectItem | null>(null);
  const [echo2, setEcho2] = useState<ISelectItem | null>(null);

  const handleChangeChar1 = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setChar1(value);
  };
  const handleChangeEcho1 = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setEcho1(value);
  };
  const handleChangeChar2 = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setChar2(value);
  };
  const handleChangeEcho2 = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setEcho2(value);
  };

  const onClickGo = () => {
    if (char1 && char2) {
      const slugs1 = [char1.slug];
      const slugs2 = [char2.slug];

      if (echo1) {
        slugs1.push(echo1.slug);
      }
      if (echo2) {
        slugs2.push(echo2.slug);
      }

      navigate(matchupLink(slugs1, slugs2));
    }
  }

  const info = [
    'View matchup stats for a character (or pair of echo fighters)',
    'vs another character (or pair of echo fighters).',
  ].join(' ');

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} spacing={3} justify={'center'}>
        <Grid item xs={12} className={classes.gridItemFirst}>
          <h2>Matchup Stats</h2>
          <HelpIcon data-tip={info} style={{ marginLeft: '4px' }}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <SelectComponent
              label={'Select 1st character'}
              items={characters}
              selectedItem={char1}
              onChange={handleChangeChar1}
              marginBottom={true}
            />
            <SelectComponent
              label={'Select echo fighter'}
              items={characters}
              selectedItem={echo1}
              onChange={handleChangeEcho1}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <SelectComponent
              label={'Select 2nd character'}
              items={characters}
              selectedItem={char2}
              onChange={handleChangeChar2}
              marginBottom={true}
            />
            <SelectComponent
              label={'Select echo fighter'}
              items={characters}
              selectedItem={echo2}
              onChange={handleChangeEcho2}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.gridItemLast}>
          <Button className={classes.button} variant="contained" color="primary" onClick={onClickGo}>Go!</Button>
        </Grid>
      </Grid>
    </div>
  );
};

const StageStats = ({ stages }: { stages: ISelectItem[] }) => {
  const [stage, setStage] = useState<ISelectItem | null>(null);

  const handleChange = (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => {
    setStage(value);
  };

  const onClickGo = () => {
    if (stage) {
      navigate(stageLink(stage.slug));
    }
  }

  const classes = useStyles();

  const info = 'View win rates for every character on a particular stage, and related stats.';

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} spacing={3} justify={'center'}>
        <Grid item xs={12} className={classes.gridItemFirst}>
          <h2>Stage Stats</h2>
          <HelpIcon data-tip={info} style={{ marginLeft: '4px' }}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <SelectComponent
              label={'Select a stage'}
              items={stages}
              selectedItem={stage}
              onChange={handleChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.gridItemLast}>
          <Button className={classes.button} variant="contained" color="primary" onClick={onClickGo}>Go!</Button>
        </Grid>
      </Grid>
    </div>
  );
};

const OverallRankingStats = () => {
  const onClickGo = () => {
    navigate(rankingsLink());
  };

  const info = 'View overall win rates for all characters, and related stats.';

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} spacing={3} justify={'center'}>
        <Grid item xs={12} className={classes.gridItemFirst}>
          <h2>Overall Character Rankings</h2>
          <HelpIcon data-tip={info} style={{ marginLeft: '4px' }}/>
        </Grid>
        <Grid item xs={12} className={classes.gridItemLast}>
          <Button className={classes.button} variant="contained" color="primary" onClick={onClickGo}>Go!</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export const HomePage = () => {
  const characters: ISelectItem[] = Object.keys(characterNames).sort((slug1, slug2) => {
    return characterNames[slug1] < characterNames[slug2] ? -1 : 1;
  }).map(slug => {
    return {
      slug: slug,
      name: characterNames[slug],
      imageUrl: getHeadIconUrl(slug),
    };
  });

  const stages: ISelectItem[] = Object.keys(stageNames).sort((slug1, slug2) => {
    return stageNames[slug1] < stageNames[slug2] ? -1 : 1;
  }).map(slug => {
    return {
      slug: slug,
      name: stageNames[slug],
    };
  });

  return (
    <Container>
      <CharacterStats characters={characters}/>
      <MatchupStatsSection characters={characters}/>
      <StageStats stages={stages}/>
      <OverallRankingStats/>
      <ReactTooltip
        className="tooltip"
        delayHide={500}
        effect="solid"
      />
    </Container>
  );
};
