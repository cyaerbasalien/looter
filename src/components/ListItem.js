import React from 'react';
import { Icon } from 'antd';

function ListItem({ name, removeItem }) {
  return (
    <div className="list-item">
      {name}
      <Icon className="close-icon" type="close" onClick={removeItem} />
    </div>
  );
}

export default ListItem;
