import React, { useEffect, useState } from "react";
import { Progress, Table, Modal, Spin, Tooltip, Input } from "antd";
import { getReport } from "../../services/report";

const columns = [
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: 'Ad Words Count',
    dataIndex: 'ad_words_count',
    key: 'ad_words_count',
  },
  {
    title: 'Links Count',
    dataIndex: 'links_count',
    key: 'links_count',
  },
  {
    title: 'Total Results',
    dataIndex: 'total_results',
    key: 'total_results',
    render: (num) => num ? (
      <Tooltip title={num.toLocaleString()}>
        {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)}
      </Tooltip>
    ) : num,
  },
  {
    title: 'Search Time',
    dataIndex: 'search_time',
    key: 'search_time',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => status.charAt(0).toUpperCase() + status.slice(1),
  },
  {
    title: 'Scraped HTML page',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <a href={id} >
        Click here to download
      </a>
    )
  },
  {
    title: 'Google search url',
    dataIndex: 'origin_page',
    key: 'origin_page',
    render: (page) => (
      <a target="_blank" href={page} rel="noreferrer">
        Click here to go
      </a>
    )
  }
];

export default function ReportDetail ({ reportId, selectedReportId, setSelectedReportId }) {
  const [report, setReport] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      const result = await getReport(reportId);
      setReport(result.record);
    };

    fetchReport();
  }, [reportId]);

  const handleModalCancel = () => {
    setSelectedReportId(null)
    setReport(null)
  };

  const filteredData = report?.keywords.filter((record) => record.value.toLowerCase().includes(searchText.toLowerCase())) || [];

  return(
    <Modal
      visible={selectedReportId !== null}
      onCancel={handleModalCancel}
      footer={null}
      width='80%' // Set width to 80%
      style={{ top: 100 }} // Add some padding from top
      bodyStyle={{ height: '80vh', overflowY: 'auto' }} // Set height to 80% of viewport and add vertical scroll if necessary
    >
      {report ? (
      <div>
        <h1>{report.name}</h1>
        <h2>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</h2>
        <Input.Search placeholder="Search value" onChange={(e) => setSearchText(e.target.value)} style={{ width: 200, float: 'right' }} />
        <Progress percent={report.percentage} />
        <Table dataSource={filteredData} columns={columns} />
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    )}
    </Modal>
  )
};