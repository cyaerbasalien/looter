import React, { useState, useEffect } from 'react';
import ListInput from './components/ListInput';
import ListItem from './components/ListItem';
import './App.scss';
import { Layout, Button } from 'antd';
// import Table from 'react-table-6';
import Select from 'react-select';
import 'antd/dist/antd.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [items, setItems] = useState({});
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    let storedPlayers, storedItems;
    try {
      storedPlayers = JSON.parse(localStorage.getItem('players'));
      storedItems = JSON.parse(localStorage.getItem('items'));
      if (storedPlayers) setPlayers(storedPlayers);
      if (storedItems) setItems(storedItems);
    } catch (err) {
      console.error(err);
    }
  }, []);

  function addPlayerToList(player) {
    if (!players.includes(player)) {
      setPlayers([...players, player]);
    }
  }

  function addItemToList(name) {
    if (!items[name]) {
      setItems({ ...items, [name]: {} });
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider theme="light" width="fit-content">
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
        <Button
          className="toggle-mode-btn"
          onClick={() => {
            if (isEditing) {
              localStorage.setItem('players', JSON.stringify(players));
              localStorage.setItem('items', JSON.stringify(items));
              setEditing(false);
            } else {
              setEditing(true);
            }
          }}
        >
          {isEditing ? 'Save Item Priorities' : 'Edit Item Priorities'}
        </Button>
        <div className="item-list">
          <ListInput
            label="Add Item"
            placeholder="Item Name"
            addToList={addItemToList}
          />
          <div>
            Items:{' '}
            {Object.keys(items).map(itemName => (
              <ListItem
                key={itemName}
                removeItem={() => {
                  const { [itemName]: removedItem, ...newItems } = items;
                  setItems(newItems);
                }}
              >
                <div>
                  {itemName}
                  {isEditing ? (
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      value={items[itemName].players}
                      onChange={playerList => {
                        const newItems = { ...items };
                        newItems[itemName].players = playerList;
                        setItems(newItems);
                      }}
                      options={players}
                      getOptionLabel={option => option}
                      getOptionValue={option => option}
                    />
                  ) : (
                    <>
                      <br />
                      {items[itemName].players &&
                        items[itemName].players.reduce(
                          (acc, playerName) => `${acc}, ${playerName}`
                        )}
                    </>
                  )}
                </div>
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
