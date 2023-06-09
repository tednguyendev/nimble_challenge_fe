import React from 'react'
import { Layout } from 'antd'

const { Header, Footer, Content } = Layout

function DefaultLayout({ children, ...props }) {
  return (
    <Layout>
      <Header>
        <h2 style={{ color: '#fff' }}>Nimble Scraper</h2>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Powered By Nimble</Footer>
    </Layout>
  )
}

export default DefaultLayout
