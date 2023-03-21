import React, { useState } from 'react'
import { Modal, Upload, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadReport } from '../../services/report';
import { useHistory } from 'react-router-dom';

import './style.scss'

const { Dragger } = Upload;

export default function CreateReport(
  {
    setSelectedReportId,
    fetchData,
    isModalVisible,
    setIsModalVisible,
    isLoading,
    setLoading
  }
  ) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [fileList, setFileList] = useState(null);

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
    showUploadList: {
      showRemoveIcon: false
    },
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
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleModalOk = async _ => {
    setLoading(true);
    const { success, data, error } = await uploadReport(fileList[0], name);
    if (success) {
      setIsModalVisible(false);
      setName('');
      setFileList([])
      message.success('Report successfully uploaded!');
      fetchData();
      handleOpenReportModal(data.data.id)
    } else {
      message.error(error);
    }
    setLoading(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setName('');
    setFileList([])
  };

  const handleOpenReportModal = (id) => {
    setSelectedReportId(id)
    if (id) {
      history.replace('/reports/' + id);
    }
  };

  return (
    <Modal
      title="Create New Report"
      visible={isModalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      okButtonProps={{ disabled: isLoading || fileList?.length === 0 }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <label htmlFor="report-name" style={{ fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Name(optional):</label>
      <Input
        id="report-name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <label htmlFor="csv-dragger" style={{ fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>File:</label>
      <Dragger {...draggerProps} id="csv-dragger">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single CSV file upload. Maximum size: 10MB.</p>
        <p className="ant-upload-hint">Note: We will trip the duplicated keywords in this CSV file to speed up the process of scraping data.</p>
      </Dragger>
    </Modal>
  )
}