import React from 'react';
import { Icon } from 'antd';

function ListItem({ children, removeItem }) {
  return (
    <div className="list-item">
      <Icon className="close-icon" type="close" onClick={removeItem} />
      {children}
    </div>
  );
}

export default ListItem;
