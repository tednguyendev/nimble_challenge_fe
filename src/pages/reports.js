import React, { useState } from 'react'
import { Table, Button, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/Dashboard'

const { Column } = Table;
const { Dragger } = Upload;

export default function PostsPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    {
      key: '1',
      name: 'Report 1',
    },
    {
      key: '2',
      name: 'Report 2',
    },
    {
      key: '3',
      name: 'Report 3',
    },
  ];

  const handleCreateReport = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    message.success('Report successfully uploaded!');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const draggerProps = {
    name: 'report',
    multiple: false,
    showUploadList: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // replace with your own API endpoint
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
        <Table dataSource={data}>
          <Column title="Report Name" dataIndex="name" key="name" />
        </Table>
        <Modal title="Upload File" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
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
