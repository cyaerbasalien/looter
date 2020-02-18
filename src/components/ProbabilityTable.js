import React, { useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { chanceOfDrop } from '../helpers/mathHelpers';
import { Button } from 'antd';

function ProbabilityTable({ players, items }) {
  const [data, setData] = useState([]);
  const [runs, setRuns] = useState(1);

  const name = {
    Header: () => <span>Player</span>,
    accessor: 'name',
  };
  const probabilities = Object.keys(items).map(itemName => ({
    Header: () => <span>{itemName}</span>,
    accessor: itemName,
  }));
  const columns = [name, ...probabilities];

  function calculateProbability() {
    setData(getDataFromState(players, items, runs));
  }

  return (
    <>
      <label>
        Number of runs
        <input value={runs} onChange={e => setRuns(e.target.value)} />
      </label>
      <Button onClick={calculateProbability}>Run</Button>
      {data.length > 0 && <ReactTable data={data} columns={columns} />}
    </>
  );
}

function getDataFromState(players, items, runs) {
  let playerProbabilities = {};
  players.forEach(player => (playerProbabilities[player] = {}));

  Object.keys(items).forEach(itemName => {
    items[itemName].players.forEach((player, order) => {
      playerProbabilities[player][itemName] = chanceOfDrop(
        runs,
        order,
        items[itemName].dropRate
      ).toPrecision(4);
    });
  });

  return Object.keys(playerProbabilities).map(playerName => ({
    name: playerName,
    ...playerProbabilities[playerName],
  }));
}

export default ProbabilityTable;
