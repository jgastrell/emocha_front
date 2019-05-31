import React from 'react';
import WidgetHeader from '../widgetHeader';
import WidgetRow from '../widgetRow';

const WidgetContainer = props => {
  const { widgets } = props;
  return (
    <div>
      <WidgetHeader />
      {widgets.map((widget, index) => <WidgetRow  key={index} widget={widget} {...props} />)}
    </div>
  );
};

export default WidgetContainer;