import * as React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 12,
  },
  apology: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
          <p>If you have questions, comments, or feedback, feel free to grab a hold of me on Reddit: u/mountainvalley.</p>
        </CardContent>
      </Card>

      <Card className={classes.card} variant="outlined">
        <CardContent>
          <h1>Status</h1>
          <h3>5:16 CST on August 28, 2020:</h3>
          <p>The data issue is now resolved, and the website is showing the correct statistics.</p>

          <h3>7:35pm CST on August 27, 2020:</h3>
          <p>We have the data set re-downloaded, and we are waiting for an independent script to finish running to verify the results.</p>

          <h3>6:53pm CST on August 26, 2020:</h3>
          <p>We discovered a problem with the data displayed on this website. We are currently working to fix the issue and will update the website as soon as we can. The issue is expected to be resolved within 24 hours. We are really sorry for the inconvenience.</p>
        </CardContent>
      </Card>

      <Card className={classes.apology} variant="outlined">
        <CardContent className={classes.content}>
          <h1>Apology to the Smash community and data enthusiasts</h1>
          <p>August 28, 2020</p>
          <p>There's no way to sugar-coat this: the data that was previously displayed on this website was completely wrong.</p>
          <p>
            Two months ago, I came across <a href="https://www.reddit.com/r/smashbros/comments/hfb2ep/i_analyzed_one_million_matches_and_found_smash/">this Reddit post</a> which presented some really interesting analysis based on around 1 million games' worth of data.
            After reading the post, I got a hold of the data set used in the post, and started doing my own number crunching (something like what is shown on the website here).
            I was surprised by the numbers: how sometimes they confirmed my understanding of theory, and how sometimes they contradicted it (as data often does, which is the beauty of it!).
            After playing around with the data for a few days, I wanted an easier way for me to quickly be able to quickly see how one character fairs versus another one in practice, instead of running code on my computer every single time.
            I also wanted to share this information with the Smash community, thinking it would help push the meta forward and change some people's minds about certain matchups / stages.
            So I decided to build this website to share that data set.
          </p>

          <p>
            Cut to 2 months later, to just a few days before the writing of this post.
            I decided now would be a good time to gather some new data as it's been a while since Min Min has been released.
            I wrote my own script to collect that data from smash.gg.
            The reasons I had for writing my own script weren't very good; it was a combination of the fact that I already had a lot of the code already written from earlier, and that I had a different code structure in mind to save the downloaded data.
          </p>
          <p>
            As my script was about halfway done fetching data from smash.gg, I started doing some preliminary numbers crunching / analysis.
            And what I saw was really surprising.
            I saw that with the data I downloaded, Lucina had an overall win rate of around 40%, which was completely different from her win rate 55% from the Reddit user's dataset.
            At first, I thought "no big deal, probably just an error in my code somewhere".
            I scanned through my code for errors and nothing turned up.
            Then I took random samples from my data set and looked up the corresponding games on the smash.gg as a sanity check, and every game checked out and was consistent with my data set.
          </p>

          <p>
            The next idea scared me: what if the original data set was incorrect?
            I reached out to the Reddit user and we discussed the code.
            The conclusion was that a merge error had replaced correct code with incorrect code.
          </p>

          <p>
            Which is really unfortunate, because this means that the data in the original data set was incorrect. There was an error in a line of code that populates the "winner" field in the dataset with, essentially, a random choice of the two characters in the game.
            Which means the original data set is... completely wrong.
          </p>
          <p>
            It was an honest mistake on the Reddit user's part, but it was my fault for not attempting to verify the data myself before sharing this website with the rest of the world.
            I was too eager and failed to take the necessary steps to make sure I was spreading correct information.
          </p>
          <p>
            I am really sorry for what happened, and I am embarrassed by this whole situation and my mistake.
            I wanted this website to be a source of truth for Smash Ultimate game data, but it has been the exact opposite.
            I know I have broken the trust of many people, and that this website may lose all credibility because of that.
            I am working hard to make this situation better.
          </p>
          <p>
            To prevent this kind of mistake from happening again, I'm making the data set used by the website available to download <a href="/full_raw_data.csv">here</a>.
            The data set includes the tournament name, event name, and player names so that even non-programmers can verify individual games.
            In addition, I've open-sourced all the code <a href="https://github.com/mountainvalleycode/ultimategamedata">here</a>, for those who want to take a look. The more eyes, the better!
          </p>
          <p>
            I think there's 2 lessons to be learned here.
            One is to not blindly trust what you see on the internet, no matter how many upvotes it has.
            I do this implicitly on a day-to-day basis.
            While it's infeasible to fact-check everything you come across, it's important to keep in mind that there is a possibility of misinformation.
          </p>
          <p>
            The second is that, when spreading information as I did, it is even more important to fact check to make sure you're not spreading false information.
            I needed to sanity check and triple check the code and data to make sure there hadn't been a mistake somewhere along the way, and I failed to do that.
          </p>
          <p>
            Moving foward from here, I will make sure to follow due diligence to avoid something like this from happening again.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
};
