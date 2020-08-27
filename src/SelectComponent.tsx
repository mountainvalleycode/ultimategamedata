import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export interface ISelectItem {
  slug: string;
  name: string;
  imageUrl?: string;
}

interface Props {
  label: string;
  items: ISelectItem[];
  selectedItem: ISelectItem | null;
  onChange: (event: React.ChangeEvent<{}>, value: ISelectItem | null, reason: string) => void;
  marginBottom?: boolean;
}

export const SelectComponent = (props: Props) => {
  const classes = useStyles();

  const style = {
    ...{
      width: '240px',
      backgroundColor: 'white',
      borderRadius: '4px',
    },
    ...(props.marginBottom ? { marginBottom: '20px' } : {}),
  };

  return (
    <Autocomplete
      style={style}
      options={props.items}
      value={props.selectedItem}
      onChange={props.onChange}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(option) => {
        const maybeImage = option.imageUrl ? (
          <img src={option.imageUrl} style={{ width: '20px', height: '20px', marginRight: '6px' }}/>
        ): null;
        return (
          <React.Fragment>
            { maybeImage }
            { option.name }
          </React.Fragment>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
