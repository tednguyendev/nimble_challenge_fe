import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import { getReport } from "../../services/report";

export default function ReportDetail ({ reportId }) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const result = await getReport(reportId);
      setReport(result.data.record);
    };

    fetchReport();
  }, [reportId]);

  const columns = [
    {
      title: "Keyword",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "orange" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Search Time",
      dataIndex: "search_time",
      key: "search_time",
    },
  ];

  return (
    <>
    <div>aa</div>
      {report && (
        <Card title={`Report Details - ${report.name}`}>
          <p>
            <strong>Status:</strong>{" "}
            <Tag color={report.status === "pending" ? "orange" : "green"}>
              {report.status}
            </Tag>
          </p>
          <p>
            <strong>Percentage:</strong> {report.percentage}%
          </p>
          <p>
            <strong>Created At:</strong> {report.created_at}
          </p>
          <Table columns={columns} dataSource={report.keywords} />
        </Card>
      )}
    </>
  );
};