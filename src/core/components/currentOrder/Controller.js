import React from 'react';
import { Table, Button, message } from 'antd';

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
    console.log('currentOrder',currentOrder)
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
    if (currentOrder.length === 0)  return message.error('No widgets added to order');
    await createOrder({
      variables: {
        widgets: currentOrder
      },
    });
    setBadgeCounter(0);
    setCurrentOrder([]);
    message.success('Order dispatched!');
  };  

  render () {
    return (
      <div>
        <Table columns={columns} dataSource={this.getTableData()} pagination={false} />
        <Button type='primary' style={{ float: 'right', marginTop: '15px'}} onClick={this.submitOrder}>{'Submit Order'}</Button>
      </div>
    );
  }

};

export default Controller;