import React from 'react';
import { Layout, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const MyHeader = props => {
  const { count } = props;
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Link to="/currentOrder">
        <div style={{ float: 'right', marginRight: '15px', marginTop: '15px' }}>
          <Badge count={count}>
            <Icon
              type="shopping-cart"
              style={{ float: 'right', fontSize: '50px', marginRight: '15px' }}
            />
          </Badge>
        </div>
      </Link>
    </Header>
  );
};

export default MyHeader;