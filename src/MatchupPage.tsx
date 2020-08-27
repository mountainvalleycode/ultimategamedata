import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable, { Icons, MTableBodyRow } from 'material-table';
import Container from '@material-ui/core/Container';
import * as queryString from 'query-string';

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
import { stageLink } from './links';
import { getMatchupStats, MatchupStats, getWinPercent } from './stats';


export const MatchupPage = () => {
  const args = queryString.parse(window.location.search);
  const slugs1 = (args['character1'] as string).split(',');
  const slugs2 = (args['character2'] as string).split(',');
  const char1Names = slugs1.map(slug => characterNames[slug]);
  const char2Names = slugs2.map(slug => characterNames[slug]);

  const stats = getMatchupStats(slugs1, slugs2);

  const stageRows = Object.entries(stats.stage).map(([stageSlug, record]) => {
    const totalGames = record.character1Wins + record.character2Wins;
    return {
      name: stageNames[stageSlug],
      char1Wins: record.character1Wins,
      char2Wins: record.character2Wins,
      char1WinPercent: getWinPercent(record.character1Wins, record.character2Wins),
      char2WinPercent: getWinPercent(record.character2Wins, record.character1Wins),
      totalGames: totalGames,
      link: <a href={stageLink(stageSlug)}>View stage</a>,
    }
  });

  stageRows.sort((a, b) => a.name < b.name ? -1 : 1);

  const totalGames = stats.overall.character1Wins + stats.overall.character2Wins;
  const char1WinPercent = getWinPercent(stats.overall.character1Wins, stats.overall.character2Wins);
  const char2WinPercent = getWinPercent(stats.overall.character2Wins, stats.overall.character1Wins);

  const char1NamesString = char1Names.join(' / ');
  const char2NamesString = char2Names.join(' / ');

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
      <h1>{char1NamesString} vs {char2NamesString}</h1>
      <div>There are { totalGames.toLocaleString() } total recorded games.</div>
      <div>
        { char1NamesString } has won { stats.overall.character1Wins } ({ char1WinPercent }%) of the games.
      </div>
      <div style={{ marginBottom: '1.45rem' }}>
        { char2NamesString } has won { stats.overall.character2Wins } ({ char2WinPercent }%) of the games.
      </div>
      <MaterialTable
        style={{ marginBottom: '1.45rem' }}
        columns={[
          {
            title: "Stage",
            field: "name",
            cellStyle: { paddingLeft: '10px'},
            headerStyle: { paddingLeft: '10px' },
          },
          { title: `${char1NamesString} Win %`, field: "char1WinPercent", type: 'numeric' },
          { title: `${char2NamesString} Win %`, field: "char2WinPercent", type: 'numeric' },
          { title: "# Games", field: "totalGames", type: "numeric" },
          { title: `${char1NamesString} Wins`, field: "char1Wins", type: 'numeric' },
          { title: `${char2NamesString} Wins`, field: "char2Wins", type: 'numeric' },
          { title: "Stats", field: "link" },
        ]}
        data={stageRows}
        title={<h2>Breakdown by Stage</h2>}
        icons={tableIcons}
        options={{
          paging: false,
          padding: 'dense',
        }}
        components={{
          Row: (props: any) => <MTableBodyRow {...props} className="table-row"/>
        }}
      />
    </Container>
  );
};
