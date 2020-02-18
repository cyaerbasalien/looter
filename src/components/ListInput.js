import React, { useState } from 'react';

function ListInput({ addToList }) {
  const [name, setName] = useState('');

  function submit(e) {
    if (e.key === 'Enter') {
      addToList(name);
      setName('');
    }
  }

  return (
    <input
      className="list-input"
      placeholder="Name"
      value={name}
      onChange={e => setName(e.target.value)}
      onKeyPress={submit}
    />
  );
}

export default ListInput;
