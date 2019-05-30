import React from 'react';
import { Table, Button, Spin } from 'antd';
import ORDER from '../../graphql/queries/ORDERS';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
];

class Controller extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  getTableData = () => {
    const { currentOrder } = this.props;
    return currentOrder.map((widget, index) => {
        const { id, type, size, color, quantity } = widget;
        return {
          key: id * index,
          type,
          size,
          color, 
          quantity
        };
    });
  };
  
  submitOrder = async () => {
    const { createOrder, currentOrder, setBadgeCounter, setCurrentOrder } = this.props;
    await createOrder({
      variables: {
        widgets: currentOrder
      },
      refetchQueries:[{ query: ORDER }]
    });
    setBadgeCounter(0);
    setCurrentOrder([]);
  };  

  render () {
    const { data: { loading }} = this.props;
    if (loading) return <Spin size='large'style={{marginTop: '150px', marginLeft:'450px'}}/>;
    return (
      <div>
        <Table columns={columns} dataSource={this.getTableData()} pagination={false} />
        <Button type='primary' style={{ float: 'right', marginTop: '15px'}} onClick={this.submitOrder}>{'Submit Order'}</Button>
      </div>
    );
  }

};

export default Controller;