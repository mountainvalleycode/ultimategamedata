import * as React from 'react';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  card: (props: Props) => {
    let styles: any = {
      marginBottom: 12,
    };
    if (props.color !== undefined) {
      styles = {
        ...styles,
        backgroundColor: props.color,
      };
    }
    return styles;
  },
});

type Props = {
  color?: string;
};

export const Card: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <MuiCard className={classes.card} variant="outlined">
      <MuiCardContent>
        {props.children}
      </MuiCardContent>
    </MuiCard>
  );
};
