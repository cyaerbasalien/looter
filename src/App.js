import React, { useState } from 'react';
import ListInput from './components/ListInput';
import ListItem from './components/ListItem';
import './App.scss';
import { Layout } from 'antd';
import Table from 'react-table-6';
import 'antd/dist/antd.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [items, setItems] = useState([]);

  function addPlayerToList(player) {
    if (!players.includes(player)) {
      setPlayers([...players, player]);
    }
  }

  function addItemToList(name) {
    if (items.every(item => item.name !== name)) {
      setItems([...items, { name: name }]);
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider width="fit-content">
        <div className="item-list">
          <ListInput
            label="Add Player"
            placeholder="Player Name"
            addToList={addPlayerToList}
          />
          <div>
            Players:{' '}
            {players.map(player => (
              <ListItem
                key={player}
                removeItem={() =>
                  setPlayers(
                    players.filter(playerName => playerName !== player)
                  )
                }
              >
                {player}
              </ListItem>
            ))}
          </div>
        </div>
        <div className="item-list">
          <ListInput
            label="Add Item"
            placeholder="Item Name"
            addToList={addItemToList}
          />
          <div>
            Items:{' '}
            {items.map(item => (
              <ListItem
                key={item.name}
                removeItem={() =>
                  setItems(items.filter(({ name }) => name !== item.name))
                }
              >
                {item.name}
              </ListItem>
            ))}
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content></Layout.Content>
    </Layout>
  );
}

export default App;
