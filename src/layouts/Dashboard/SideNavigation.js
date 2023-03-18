import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import {
  SolutionOutlined,
} from '@ant-design/icons'
const { Sider } = Layout

export default function SideNavigation() {
  const history = useHistory()
  const onMenuItemClick = React.useCallback(
    ({ key }) => {
      history.push(key)
    },
    [history]
  )

  return (
    <Sider
      width={250}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Typography.Title
        level={3}
        style={{
          padding: '12px 20px',
          color: '#fff',
          textAlign: 'center',
          background: '#000',
          margin: 0,
        }}
      >
        Nimble crawler
      </Typography.Title>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[history.location.pathname]}
        onClick={onMenuItemClick}
      >
        <Menu.Item key="/reports" icon={<SolutionOutlined />}>
          Reports
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
