import * as React from 'react';
import Container from '@material-ui/core/Container';

import {Card} from './Card';


export const AboutPage = () => {
  return (
    <Container>
      <Card>
        <h1>About</h1>
        <p>This website shows Smash Ultimate game statistics collected from roughly 3.6 million online tournament games recorded on <a href="https://smash.gg/">smash.gg</a>.</p>
        <p>
          The full data set can be downloaded by clicking <a href="/full_raw_data.csv">here</a>.
        </p>
        <p>
          The source code for the website and data fetching can be found <a href="https://github.com/mountainvalleycode/ultimategamedata">here</a>.
        </p>
        <p>If you have questions, comments, or feedback, feel free to grab a hold of me on Reddit: u/mountainorvalley.</p>
      </Card>
    </Container>
  );
};
