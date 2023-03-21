import React from 'react'
import { Button, Input, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import './style.scss'

const { Search } = Input;

export default function ReportHeader(
  {
    fetchData,
    pagination,
    setPagination,
    setKeyword,
    setIsModalVisible
  }
  ) {
  const handleSearch = (value) => {
    setKeyword(value);
    setPagination({ ...pagination, current: 1 });
  };

  const onSearch = (value) => {
    handleSearch(value);
  };

  const handleReload = () => {
    fetchData()
  };

  const handleCreateReport = () => {
    setIsModalVisible(true);
  };

  return (
    <Row>
      <Col flex="auto">
        <Search
          placeholder="Search by report name or by keywords"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </Col>
      <Col flex="35px">
        <Button
          icon={<ReloadOutlined />}
          onClick={handleReload}
          style={{marginRight: '20px'}}
        >
          Reload
        </Button>
      </Col>
      <Col>
        <Button type="primary" onClick={handleCreateReport} style={{ marginBottom: 16, marginRight: 16 }}>
          Create New Report
        </Button>
      </Col>
    </Row>
  )
}