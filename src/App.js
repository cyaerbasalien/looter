import React, { useState } from 'react';
import ListInput from './components/ListInput';
import ListItem from './components/ListItem';
import './App.scss';
import { Layout, Icon } from 'antd';
import 'antd/dist/antd.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [items, setItems] = useState([]);

  function addPlayerToList(player) {
    if (!players.includes(player)) {
      setPlayers([...players, player]);
    }
  }

  function addItemToList(item) {
    if (!items.includes(item)) {
      setItems([...items, item]);
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider width="fit-content">
        <div className="item-list">
          Add Player
          <ListInput addToList={addPlayerToList} />
          <div>
            Players:{' '}
            {players.map(player => (
              <ListItem
                key={player}
                name={player}
                removeItem={() =>
                  setPlayers(
                    players.filter(playerName => playerName !== player)
                  )
                }
              />
            ))}
          </div>
        </div>
        <div className="item-list">
          Add Item
          <ListInput addToList={addItemToList} />
          <div>
            Items:{' '}
            {items.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content></Layout.Content>
    </Layout>
  );
}

export default App;
