import React from 'react';
import { Table, Spin } from 'antd';

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'orderId',
    key: 'orderId',
  },
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

  getTableData = (orders) => {
    let counter = 0,
      tableData = [];
    for(let order of orders) {
      const { id, widgets } = order;
      const parsedWidgets = JSON.parse(widgets);
      for(let widget of parsedWidgets) {
        const { type, size, color, quantity } = widget;
        tableData.push({
          orderId: id,
          key: counter,
          type,
          size,
          color,
          quantity
        })
        counter++;
      }
    };
    return tableData;
  }

  render () {
    const { data: { orders, loading }} = this.props;
    if (loading) return <Spin size='large' style={{marginTop: '150px', marginLeft:'450px'}}/>;
    return (
      <div>
        <Table columns={columns} dataSource={this.getTableData(orders)} pagination={false} />
      </div>
    );
  }

};

export default Controller;