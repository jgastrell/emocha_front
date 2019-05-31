import React from 'react';
import { Col, Row } from 'antd';

const style = {
  color: 'rgba(0, 0, 0, 0.85)',
  fontWeight: 500,
};
const rowStyle = { 
  paddingTop: '20px',
  height: '50px',
  backgroundColor: 'rgb(250,250,250)',
  borderBottom: '1px solid #e8e8e8',
  marginTop: '25px',
  marginBottom: '10px'
};

const WidgetHeader = () => {
  return (
    <Row gutter={24} type="flex" style={rowStyle}>
      <Col span={5}><span style={style}>Type</span></Col>
      <Col span={5}><span style={style}>Size</span></Col>
      <Col span={5}><span style={style}>Color</span></Col>
      <Col span={5}><span style={style}>Quantity</span></Col>
      <Col span={4}><span style={style}>Action</span></Col>
    </Row>
  );
};

export default WidgetHeader;  