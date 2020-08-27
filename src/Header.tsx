import * as React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import * as styles from './styles';


export const Header = () => {
  const title = 'Ultimate Game Data';

  return (
    <header
      style={{
        backgroundColor: styles.yaleBlue,
        marginBottom: '1.45rem',
      }}
    >
      <Container>
        <div
          style={{
            padding: `1.45rem 0`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              { title }
            </Link>
          </h1>
          <h1 style={{ margin: 0, fontWeight: 300 }}>
            <Link
              to="/about"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              About
            </Link>
          </h1>
        </div>
      </Container>
    </header>
  );
}
