import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button, Modal, Upload, message, Input, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/Dashboard'
import { uploadReport, getReports } from '../services/report';
import { ReloadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Search } = Input;

const columns = [
  {
    title: 'Report Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (status) => status.charAt(0).toUpperCase() + status.slice(1),
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
    sorter: (a, b) => a.percentage - b.percentage,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    sortDirections: ['descend', 'ascend']
  },
];

export default function Report() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [fileList, setFileList] = useState(null);

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const handleTableChange = (pagination, _, sorter) => {
    setPagination(pagination);

    if (sorter) {
      let currentOrderBy = ""
      if (sorter.order === 'descend' && sorter.field === 'created_at') {
        currentOrderBy = "created_at_descending"
      } else if (sorter.order === 'ascend' && sorter.field === 'created_at') {
        currentOrderBy = "created_at_ascending"
      } else if (sorter.order === 'descend' && sorter.field === 'name') {
        currentOrderBy = "name_descending"
      } else if (sorter.order === 'ascend' && sorter.field === 'name') {
        currentOrderBy = "name_ascending"
      } else if (sorter.order === 'descend' && sorter.field === 'status') {
        currentOrderBy = "status_descending"
      } else if (sorter.order === 'ascend' && sorter.field === 'status') {
        currentOrderBy = "status_ascending"
      } else if (sorter.order === 'descend' && sorter.field === 'percentage') {
        currentOrderBy = "percentage_descending"
      } else if (sorter.order === 'ascend' && sorter.field === 'percentage') {
        currentOrderBy = "percentage_ascending"
      }
      setOrderBy(currentOrderBy);
    }
  };
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const resp = await getReports({
        page: pagination.current,
        perPage: pagination.pageSize,
        keyword,
        orderBy,
      });
      setData(resp.records);
      setPagination({ ...pagination, total: resp.total });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [pagination.current, pagination.pageSize, keyword, orderBy]);

  console.log('========>data : ', data)

  useEffect(() => {
  // Call the fetchData function
    fetchData();
  }, [fetchData]);

  const handleCreateReport = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async _ => {
    setLoading(true);
    const { success, error } = await uploadReport(fileList[0], name);
    if (success) {
      setIsModalVisible(false);
      setName('');
      setFileList([])
      message.success('Report successfully uploaded!');
      fetchData();
    } else {
      message.error(error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setName('');
    setFileList([])
  };

  const dummyRequest = ({ _, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleSearch = (value) => {
    setKeyword(value);
    setPagination({ ...pagination, current: 1 });
  };
  
  const onSearch = (value) => {
    handleSearch(value);
  };
  
  const draggerProps = {
    name: 'report',
    multiple: false,
    maxCount: 1,
    customRequest: dummyRequest,
    fileList: fileList,
    disabled: isLoading,
    beforeUpload: file => {
      const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
      if (!isCSV) {
        message.error('You can only upload CSV files!');
      }
      const maxSize = 10 * 1024 * 1024; // 10MB
      const isLtMaxSize = file.size <= maxSize;
      if (!isLtMaxSize) {
        message.error('File must be smaller than 10MB!');
      }
      if (isCSV && isLtMaxSize) {
        setFileList([file])
      }
      return isCSV && isLtMaxSize;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleReload = () => {
    fetchData()
  };

  return (
    <DashboardLayout>
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
      <Table
        dataSource={data}
        columns={columns}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey='id'
        size='small'
      />
      <Modal
        title="Upload File"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ disabled: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
      >
        <Input
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single CSV file upload. Maximum size: 10MB.</p>
          <p className="ant-upload-hint">Note: We will trip the duplicated keywords in this CSV file to speed up the process of scraping data.</p>
        </Dragger>
      </Modal>
    </DashboardLayout>
  )
}
