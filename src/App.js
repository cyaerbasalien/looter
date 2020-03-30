import React, { useState, useEffect } from 'react';
import ListInput from './components/ListInput';
import ListItem from './components/ListItem';
import './App.scss';
import { Layout, Button, Icon } from 'antd';
import Select from 'react-select';
import ProbabilityTable from './components/ProbabilityTable';
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
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <div className="item-list">
          {isEditing && (
            <ListInput
              label="Add Item"
              placeholder="Item Name"
              addToList={addItemToList}
            />
          )}
          Items:{' '}
          {Object.keys(items).map(itemName => (
            <ListItem key={itemName}>
              <>
                <div className="item-name">
                  {itemName} {items[itemName].dropRate}{' '}
                  {isEditing && (
                    <Icon
                      className="close-icon"
                      type="close"
                      onClick={() => {
                        const {
                          [itemName]: removedItem,
                          ...remainingItems
                        } = items;
                        setItems(remainingItems);
                      }}
                    />
                  )}
                </div>
                {isEditing ? (
                  <>
                    <label>
                      Drop Rate:
                      <input
                        value={items[itemName].dropRate}
                        onChange={e => {
                          const newItems = { ...items };
                          newItems[itemName].dropRate = e.target.value;
                          setItems(newItems);
                        }}
                        type="number"
                      />
                    </label>
                    <label>
                      Upcoming:
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        value={items[itemName].upcoming}
                        onChange={playerList => {
                          const newItems = { ...items };
                          newItems[itemName].upcoming = playerList;
                          setItems(newItems);
                        }}
                        options={players}
                        getOptionLabel={option => option}
                        getOptionValue={option => option}
                      />
                    </label>
                    <label>
                      History:
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        value={items[itemName].history}
                        onChange={playerList => {
                          const newItems = { ...items };
                          newItems[itemName].history = playerList;
                          setItems(newItems);
                        }}
                        options={players}
                        getOptionLabel={option => option}
                        getOptionValue={option => option}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    {items[itemName].upcoming &&
                      items[itemName].upcoming.reduce(
                        (acc, playerName) => `${acc}, ${playerName}`
                      )}
                  </>
                )}
              </>
            </ListItem>
          ))}
        </div>
        <div className="item-list">
          {isEditing && (
            <ListInput
              label="Add Player"
              placeholder="Player Name"
              addToList={addPlayerToList}
            />
          )}
          <div>
            Players:{' '}
            {players.map(player => (
              <ListItem key={player}>
                {player}{' '}
                {isEditing && (
                  <Icon
                    className="close-icon"
                    type="close"
                    onClick={() =>
                      setPlayers(
                        players.filter(playerName => playerName !== player)
                      )
                    }
                  />
                )}
              </ListItem>
            ))}
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content>
        {players.length && Object.keys(items).length && (
          <ProbabilityTable players={players} items={items} />
        )}
      </Layout.Content>
    </Layout>
  );
}

export default App;
