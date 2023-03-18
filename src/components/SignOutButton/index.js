import React from 'react'
import { Popconfirm, Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { clearAuthToken } from '../../services/auth'

export default function SignOutButton() {
  const history = useHistory()

  const onSignOutClick = () => {
    clearAuthToken()
    history.replace('/sign-in')
  }

  return (
    <Popconfirm
      placement="leftTop"
      title="Are you sure that you want to sign out?"
      onConfirm={onSignOutClick}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip placement="left" title="Sign Out">
        <Button shape="circle" icon={<LogoutOutlined />} />
      </Tooltip>
    </Popconfirm>
  )
}
