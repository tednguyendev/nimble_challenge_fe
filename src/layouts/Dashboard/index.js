import React from 'react'
import { Layout, Col, Row } from 'antd'

import SideNavigation from './SideNavigation'
import SignOutButton from '../../components/SignOutButton'
import './style.scss'
const { Header, Content } = Layout

function DashboardLayout({ children, ...props }) {
  return (
    <Layout className="DashboardLayout">
      <SideNavigation />
      <Layout className="site-layout" style={{ marginLeft: 250 }}>
        <Header style={{ background: '#fff', padding: '0 25px' }}>
          <Row>
            <Col flex="auto"></Col>
            <Col flex="35px">
              <SignOutButton />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '10px 10px 0', overflow: 'initial' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
