import React, { useEffect, useState } from "react";
import { Progress, Table, Modal, Spin, Tooltip, Input, Alert, message } from "antd";
import { getReport } from "../../services/report";
import { useHistory } from 'react-router-dom';
import { getScrapedPage } from '../../services/keyword'

const shouldSpin = (record, report) => record.status === "pending" && report.status !== 'failed'

export default function ReportDetail ({ reportId, setSelectedReportId }) {
  const history = useHistory();
  const [report, setReport] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [err, setErr] = useState(null);
  const [downloadingKeywords, setDownloadingKeywords] = useState([]);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      const result = await getReport(reportId);

      if (result.success) {
        const notTheFirstFetch = report

        if (notTheFirstFetch) {
          setIsPolling(true)
        }
        setReport(result.data.record);
      } else {
        message.error(result.error);
        setErr(result.error);
      }
    }

    const modalIsOpen = reportId
    const isPending = !report || report.status === 'pending'

    if (!err && modalIsOpen && isPending) {
      const interval = setInterval(fetchReport, 4000);

      return () => clearInterval(interval);
    }
  }, [reportId, report?.status, err]);

  useEffect(() => {
    console.log('========>isPolling : ', isPolling)
    if (isPolling && report?.status === 'failed') {
      message.error('System currently out of capacity. Please try again after some minutes.')
    }
  }, [report?.status, isPolling]);

  const columns = [
    {
      title: 'Keyword',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: 'Ad Words Count',
      dataIndex: 'ad_words_count',
      key: 'ad_words_count',
      render: (ad_words_count, record) => shouldSpin(record, report) ? <Spin /> : ad_words_count,
    },
    {
      title: 'Links Count',
      dataIndex: 'links_count',
      key: 'links_count',
      render: (links_count, record) => shouldSpin(record, report) ? <Spin /> : links_count,
    },
    {
      title: 'Total Results',
      dataIndex: 'total_results',
      key: 'total_results',
      render: (num, record) => shouldSpin(record, report) ? <Spin /> : (
        num ? (
          <Tooltip title={num.toLocaleString()}>
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)}
          </Tooltip>
        ) : num
      ),
    },
    {
      title: 'Search Time',
      dataIndex: 'search_time',
      key: 'search_time',
      render: (search_time, record) => shouldSpin(record, report) ? <Spin /> : search_time,
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
      render: (id, record) =>
      (shouldSpin(record, report) || downloadingKeywords.includes(id))
        ? <Spin />
        : (
          (record.status === "success")
          ? (
            <a href="#" role="button" onClick={() => handleDownload(id, record)}>
              Click here to download
            </a>
          ) : (<></>)
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

  const handleModalCancel = () => {
    setSelectedReportId(null)
    setReport(null)
    setErr(null)
    setDownloadingKeywords([])
    setIsPolling(false)
    history.replace('/reports');
  };

  const handleDownload = async (id, record) => {
    try {
      setDownloadingKeywords((prev) => prev.concat(id))

      const result = await getScrapedPage(id, record.value);

      if (!result.success) {
        message.error(result.error);
      }

      setDownloadingKeywords((prev) => prev.filter((cid) => cid !== id))
    } catch (error) {
      console.error(error);
    }
  }

  const filteredData = report?.keywords.filter((record) => record.value.toLowerCase().includes(searchText.toLowerCase())) || [];

  return(
    <Modal
      visible={reportId !== null}
      onCancel={handleModalCancel}
      footer={null}
      width='80%' // Set width to 80%
      style={{ top: 100 }} // Add some padding from top
      bodyStyle={{ height: '80vh', overflowY: 'auto' }} // Set height to 80% of viewport and add vertical scroll if necessary
    >
      {report ? (
      <div>
        <h1>{report.name}</h1>
        {
          report.status.toLowerCase() === 'pending' && (
            <Alert
              message="You can close this window and come back later for the result. We will also notify you through email, once the report is ready."
              type="info"
              showIcon
              style={{ marginTop: 12, marginBottom: 12 }}
            />
          )
        }
        <Input.Search placeholder="Search value" onChange={(e) => setSearchText(e.target.value)} style={{ width: 200, float: 'right' }} />
        <h2>{"Status: " + report.status.charAt(0).toUpperCase() + report.status.slice(1)}</h2>
        <Progress percent={report.percentage} />
        <Table dataSource={filteredData} columns={columns} />
      </div>
    ) : (err ? (<div>{err}</div>) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    ))}
    </Modal>
  )
};