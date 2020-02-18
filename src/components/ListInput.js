import React, { useState } from 'react';

function ListInput({ label, placeholder, addToList }) {
  const [name, setName] = useState('');

  function submit(e) {
    if (e.key === 'Enter') {
      addToList(name);
      setName('');
    }
  }

  return (
    <label className="list-input-label">
      {label}
      <input
        className="list-input"
        placeholder={placeholder}
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyPress={submit}
      />
    </label>
  );
}

export default ListInput;
