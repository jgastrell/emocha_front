import React from 'react';
import { Table, Spin, Button, Select } from 'antd';

const Option = Select.Option;

class Controller extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.state = { 
      visible: false,
      widgetToCreate: [],
      tableState: [],
    };
  };

  setFieldWidgetToCreate = (key, value) => {
    const { widgetToCreate } = this.state;
    const widgetWithNewField = [...widgetToCreate, {key:value}];
    this.setState({widgetToCreate:widgetWithNewField});
  };

  setTableState = (id, field, value) => {
    const { tableState } = this.state;
    const tableStateWithoutRow = tableState.filter(row => row.id !== id);
    const rowToModify = tableState.filter(row => row.id === id).pop();
    if(rowToModify === undefined) {
      this.setState({
        tableState: [...tableStateWithoutRow,{ id, [field]:value }]
      });
    } else {
      delete(rowToModify[field]);
      this.setState({
        tableState: [...tableStateWithoutRow,{ ...rowToModify, [field]:value }]
      });
    }
  };

  getOptions = (qty) => {
    let result = []
    for(let i = 1; i <= qty; i++){
      result.push(<Option value={i} key={i}>{i}</Option>)
    }
    return result;
  };

  columns = 
    [{
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (text, record) => {
        const parsedText = JSON.parse(text);
        const { key } = record;
        return (
          <Select
            style={{ width: 120 }}
            onChange={value => this.setTableState(key, 'size', value)}
          >
            {parsedText.map((size, index) => <Option key={index} value={size}>{size}</Option>)}
          </Select>
        );
      }
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (text, record) => {
        const parsedText = JSON.parse(text);
        const { key } = record;
        return (
          <Select
            style={{ width: 120 }}
            onChange={value => this.setTableState(key, 'color', value)}
          >
            {parsedText.map((color, index) => <Option key={index} value={color}>{color}</Option>)}
          </Select>
        );
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => {
        const { key } = record;
        return (
          <div>
            <Select
              style={{ width: 120 }}
              onChange={value => this.setTableState(key, 'quantity', value)}
            >
              {this.getOptions(text)}
            </Select>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text ,record) => (
        <span>
          <Button 
            type="primary"
            size="small"
            shape="round"
            onClick={() => {
              const { key, type } = record;
              const { tableState } = this.state;
              const row = tableState.filter(elem => elem.id === key).pop();
              this.addWidgetToOrder({ ...row, type });
              this.updateBadge();
            }}
          >
            {'Add to Cart'}
          </Button>
        </span>
      ),
    },
  ];

  updateBadge = () => {
    const { badgeCounter, setBadgeCounter } = this.props;
    const increasedBadgeCounter = badgeCounter + 1;
    setBadgeCounter(increasedBadgeCounter);
  };

  addWidgetToOrder = (widget) => {
    const { currentOrder, setCurrentOrder } = this.props;
    const newOrder = [...currentOrder];
    newOrder.push(widget);
    setCurrentOrder(newOrder);
  }

  getTableData = (widgets) => {
    return widgets.map(widget => {
      const { size, type, color, id, quantity } = widget;
      return {
        key: id,
        type,
        size,
        color,
        quantity
      }
    })
  };

  render () {
    const { data: { widgets, loading }} = this.props;
    if (loading) return <Spin size='large'style={{marginTop: '150px', marginLeft:'450px'}}/>;
    return (
      <div>
        <Table columns={this.columns} dataSource={this.getTableData(widgets)} pagination={false} />
      </div>
    );
  }

};

export default Controller;