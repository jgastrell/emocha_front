import React from 'react';
import { Form, Button, Select, Row, Col, message } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;


const WidgetRow = ({ 
    widget,
    updateBadge,
    addWidgetToOrder,
    validateQuantities,
    form: { getFieldDecorator, validateFields }}) => {
  let { id, type, quantity, size, color} = widget;
  size = JSON.parse(size);
  color = JSON.parse(color);
  const getOptions = (qty) => {
    let result = []
    for(let i = 1; i <= qty; i++){
      result.push(<Option value={i} key={i}>{i}</Option>)
    }
    return result;
  };

  const onSubmit= (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        values['id'] = id;
        const error = validateQuantities(values);
        if (error.length > 0) {
          message.error(`${error.pop()}`);
          return;
        }
        updateBadge();
        addWidgetToOrder(values);
      }
    });
  }

  return (
    <Form onSubmit={onSubmit} layout={'horizontal'}>
      <Row type="flex" justify="start" gutter={24}>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('type', {
              initialValue: type,
            })(
              <span className="ant-form-text">{type}</span>,
            )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('size', {
                rules: [{ required: true, message: 'Please select your size' }],
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {size.map((size, index) => <Option key={index} value={size}>{size}</Option>)}
                </Select>,
              )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('color', {
                rules: [{ required: true, message: 'Please select your color' }],
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {color.map((color, index) => <Option key={index} value={color}>{color}</Option>)}
                </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Please select quantity' }],
              })(
                <Select
                  style={{ width: 120 }}
                >
                  {getOptions(quantity)}
                </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={4}>
          <FormItem>
            <Button 
              type="primary"
              size="small"
              shape="round"
              htmlType="submit"
            >
              {'Add to Cart'}
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
};

export default Form.create()(WidgetRow);

