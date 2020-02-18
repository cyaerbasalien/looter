import React from 'react';
import { Icon } from 'antd';

function ListItem({ children, removeItem }) {
  return (
    <div className="list-item">
      {children}
      <Icon className="close-icon" type="close" onClick={removeItem} />
    </div>
  );
}

export default ListItem;
