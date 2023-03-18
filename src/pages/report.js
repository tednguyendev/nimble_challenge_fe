import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/Dashboard'
import { uploadReport, getReports } from '../services/report';

const { Dragger } = Upload;

const columns = [
  {
    title: 'Report Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
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
  const [fileList, setFileList] = useState(null);

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('created_at_ascending');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const handleTableChange = (pagination, _, sorter) => {
    setPagination(pagination);

    if (sorter) {
      let currentOrderBy = ""
      if (sorter.order === 'descend' && sorter.field === 'created_at') {
        currentOrderBy = "created_at_descending"
      } else if (sorter.order === 'ascend' && sorter.field === 'created_at') {
        currentOrderBy = "created_at_ascending"
      } else if (sorter.order === 'name' && sorter.field === 'created_at') {
        currentOrderBy = "name_ascending"
      } else if (sorter.order === 'name' && sorter.field === 'created_at') {
        currentOrderBy = "name_ascending"
      }
      setOrderBy(currentOrderBy);
    }
  };
// Define the fetchData function using useCallback to memoize it
const fetchData = useCallback(async () => {
  console.log('========> : fetchData' )
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
  console.log('========>pagination : ', pagination)
  // useEffect(() => {
  //   // Call the fetchData function
  //   fetchData();
  // }, [fetchData]);

  useEffect(() => {
    console.log('========> : useEffect' )
  // Call the fetchData function
    fetchData();
  }, [fetchData]);

  const handleCreateReport = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = async _ => {
    setLoading(true);
    const { success, error } = await uploadReport(fileList[0]);
    if (success) {
      setIsModalVisible(false);
      setFileList([])
      message.success('Report successfully uploaded!');
      fetchData();
    } else {
      message.error(error);
    }
    setLoading(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setFileList([])
  };

  const dummyRequest = ({ _, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // const handleSearch = (keyword) => {
  //   setKeyword(keyword);
  //   setPagination({ current: 1, pageSize: pagination.pageSize, total: pagination.total });
  // };

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

  return (
    <DashboardLayout>
      <div>
        <Button type="primary" onClick={handleCreateReport} style={{ marginBottom: 16 }}>
          Create New Report
        </Button>
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
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single CSV file upload. Maximum size: 10MB.</p>
          </Dragger>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
