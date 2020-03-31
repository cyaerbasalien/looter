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
    Cell: props => {
      if (props.value === true) {
        return (
          <div
            style={{
              backgroundColor: percentageToHsl(1),
              width: '15px',
              height: '15px',
            }}
          />
        );
      } else if (typeof props.value === 'string') {
        return (
          <div className="table-cell">
            <div
              style={{
                backgroundColor: percentageToHsl(props.value),
                width: '15px',
                height: '15px',
              }}
            />
            {props.value}
          </div>
        );
      } else {
        return (
          <div
          // style={{
          //   backgroundColor: percentageToHsl(0),
          //   width: '15px',
          //   height: '15px',
          // }}
          />
        );
      }
    },
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
      {data.length > 0 && (
        <ReactTable data={data} columns={columns} className="-highlight" />
      )}
    </>
  );
}

function getDataFromState(players, items, runs) {
  let playerProbabilities = {};
  players.forEach(player => (playerProbabilities[player] = {}));

  Object.keys(items).forEach(itemName => {
    items[itemName].upcoming.forEach((player, order) => {
      playerProbabilities[player][itemName] = chanceOfDrop(
        runs,
        order + 1,
        items[itemName].dropRate
      ).toPrecision(4);
    });
    items[itemName].history.forEach(player => {
      playerProbabilities[player][itemName] = true;
    });
  });
  return Object.keys(playerProbabilities).map(playerName => ({
    name: playerName,
    ...playerProbabilities[playerName],
  }));
}

function percentageToHsl(percentage, hue0 = 0, hue1 = 120) {
  if (typeof percentage === 'string') {
    percentage = Number(percentage);
  }
  var hue = percentage * (hue1 - hue0) + hue0;
  return 'hsl(' + hue + ', 100%, 50%)';
}

export default ProbabilityTable;
