import React from 'react';
import { Spin } from 'antd';
import WidgetContainer  from '../../../platform/components/widgetContainer';

class Controller extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  };

  validateQuantities = (row) => {
    const { currentOrder, data: { widgets }} = this.props, { id, quantity } = row, error = [];
    let totalQuantities = {};

    for (let widget of widgets) { // calculate total of widget per id
      const { id, quantity } = widget;
      totalQuantities[id] = quantity;
    };
    for (let order of currentOrder) { // substract from totals the amount from current order
      const { id, quantity } = order;
      totalQuantities[id] = totalQuantities[id] - quantity;
    };
    totalQuantities[id] = totalQuantities[id] - quantity; // substract from totals the amount selected
    Object.keys(totalQuantities).map(key => {
      if (totalQuantities[key] < 0) {
        const widget = widgets.find(widget => widget.id === key);
        const { type }  = widget;
        let msg = `No more widget of type ${type}`
        error.push(msg)
      }
      return true;
    });
    return error;
  };

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

  onSubmit = (e) => {
    e.preventDefault();
    console.log('e', e)
    return;
  }

  render () {
    const { data: { widgets, loading }} = this.props;
    if (loading) return <Spin size='large'style={{marginTop: '150px', marginLeft:'450px'}}/>;
    return (
      <WidgetContainer 
        onSubmit={this.onSubmit}
        widgets={widgets}
        addWidgetToOrder={this.addWidgetToOrder}
        updateBadge={this.updateBadge}
        validateQuantities={this.validateQuantities}
      />
    );
  }

};

export default Controller;