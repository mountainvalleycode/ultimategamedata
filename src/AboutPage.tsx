import * as React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 12,
  },
  content: {
    maxWidth: 800,
  },
});


export const AboutPage = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <h1>About</h1>
          <p>This website shows Smash Ultimate game statistics collected from about 1.4 million online tournament games recorded on <a href="https://smash.gg/">smash.gg</a>.</p>
          <p>
            The full data set can be downloaded by clicking <a href="/full_raw_data.csv">here</a>.
          </p>
          <p>
            The source code for the website and data fetching can be found <a href="https://github.com/mountainvalleycode/ultimategamedata">here</a>.
          </p>
          <p>If you have questions, comments, or feedback, feel free to grab a hold of me on Reddit: u/mountainorvalley.</p>
        </CardContent>
      </Card>
    </Container>
  );
};
