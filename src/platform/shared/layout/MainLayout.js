import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MyHeader from '../header';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

class Sidebar extends React.Component {

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      collapsed: false,
      breadCrumbTitle: 'Orders',
    };
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  showBreadcrumbTitle = (data) => {
    const { key } = data;
    const breadCrumbTitle = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    this.setState({ breadCrumbTitle }); 
  };

  render() {
    const { breadCrumbTitle, collapsed } = this.state;
    const { children, badgeCounter } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['orders']} mode="inline" style={{paddingTop: '60px'}}>
            <Menu.Item key="orders" onClick={data => this.showBreadcrumbTitle(data)}>
              <Icon type="shopping-cart" />
              <span>Orders</span>
              <Link to="/orders" />
            </Menu.Item>
            <Menu.Item key="widgets" onClick={data => this.showBreadcrumbTitle(data)}>
              <Icon type="gift" />
              <span>Widgets</span>
              <Link to="/widgets" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <MyHeader count={badgeCounter}/>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{breadCrumbTitle}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>{'Coding Challenge - Jonathan Gastrell'}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;