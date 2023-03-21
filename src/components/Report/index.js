import React, { useState, useEffect, useCallback } from 'react'
import { Table, Button } from 'antd';
import { getReports } from '../../services/report';
import CreateDetail from './create-report'
import ReportDetail from './report-detail'
import ReportHeader from './report-header'
import { useHistory } from 'react-router-dom';

import './style.scss'

const getCurrentOrderBy = (sorter) => {
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

  return currentOrderBy
}

const getColumns = (handleOpenReportModal) => {
  return [
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
      sortDirections: ['descend', 'ascend'],
      render: (p) => p + "%",
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Action',
      key: 'id',
      render: (_, record) => (
        <Button onClick={() => handleOpenReportModal(record.id)}>View Detail</Button>
      ),
    }
  ]
}

export default function Report({ reportId }) {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [selectedReportId, setSelectedReportId] = useState(reportId || null);

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
    } catch (_) {
    }

    setLoading(false);
  }, [pagination.current, pagination.pageSize, keyword, orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableChange = (pagination, _, sorter) => {
    setPagination(pagination);

    if (sorter) {
      setOrderBy(getCurrentOrderBy(sorter));
    }
  };

  const handleOpenReportModal = (id) => {
    setSelectedReportId(id)

    if (id) {
      history.replace('/reports/' + id);
    }
  };

  return (
    <div>
      <ReportHeader
        fetchData={fetchData}
        pagination={pagination}
        setPagination={setPagination}
        setKeyword={setKeyword}
        setIsModalVisible={setIsModalVisible}
      />
      <Table
        dataSource={data}
        columns={getColumns(handleOpenReportModal)}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey='id'
        rowClassName="report-row"
        size='small'
        onRow={(record, _) => {
          return {
            onClick: (_) => {
              handleOpenReportModal(record.id);
            },
          };
        }}
      />
      <CreateDetail
        setSelectedReportId={setSelectedReportId}
        fetchData={fetchData}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isLoading={isLoading}
        setLoading={setLoading}
      />
      <ReportDetail
        setSelectedReportId={handleOpenReportModal}
        reportId={selectedReportId}
        fetchData={fetchData}
      />
    </div>
  )
}