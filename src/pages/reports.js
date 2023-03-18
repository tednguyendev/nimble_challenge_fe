import React, { useState } from 'react'
import { Table, Button, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/Dashboard'
import { uploadReport } from '../services/report';
import useAuth from '../hooks/useAuth'

const { Column } = Table;
const { Dragger } = Upload;

export default function PostsPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [fileList, setFileList] = useState(null);
  const { isAuthenticated } = useAuth()
  console.log('========>isAuthenticated : ', isAuthenticated)
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

  const handleModalOk = async _ => {
    setLoading(true);
    const { success, error } = await uploadReport(fileList[0]);
    if (success) {
      setIsModalVisible(false);
      setFileList([])
      message.success('Report successfully uploaded!');
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
        <Table dataSource={data}>
          <Column title="Report Name" dataIndex="name" key="name" />
        </Table>
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
