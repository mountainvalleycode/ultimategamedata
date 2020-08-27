import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable, { Icons, MTableBodyRow } from 'material-table';
import Container from '@material-ui/core/Container';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { characterNames } from './resources/characters';
import { stageNames } from './resources/stages';
import { characterLink } from './links';
import { getCharacterRankingsStats, CharacterRankingsStats, getWinPercent } from './stats';


export const RankingsPage = () => {
  const stats = getCharacterRankingsStats();

  const characterRows = Object.entries(stats.character).map(([charSlug, record]) => {
    return {
      name: characterNames[charSlug],
      wins: record.wins,
      losses: record.losses,
      winPercentage: getWinPercent(record.wins, record.losses),
      totalGames: record.wins + record.losses,
      link: <a href={characterLink([charSlug])}>View character</a>,
    };
  });

  characterRows.sort((a, b) => a.name < b.name ? -1 : 1);

  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <Container>
      <h1>Overall Character Stats</h1>
      <div style={{ marginBottom: '1.45rem' }}>
        There are { stats.overall.totalGames.toLocaleString() } total games recorded.
      </div>

      <MaterialTable
        style={{ marginBottom: '1.45rem' }}
        columns={[
          {
            title: "Character",
            field: "name",
            cellStyle: { paddingLeft: '10px' },
            headerStyle: { paddingLeft: '10px' },
          },
          { title: "Win %", field: "winPercentage", type: 'numeric' },
          { title: "# Games", field: "totalGames", type: "numeric" },
          { title: "# Wins", field: "wins", type: 'numeric' },
          { title: "# Losses", field: "losses", type: "numeric" },
          { title: "Character Stats", field: "link" },
        ]}
        data={characterRows}
        title="Characters"
        icons={tableIcons}
        options={{
          pageSize: 20,
          padding: 'dense',
        }}
        components={{
          Row: (props: any) => <MTableBodyRow {...props} className="table-row"/>
        }}
      />
    </Container>
  );
};
