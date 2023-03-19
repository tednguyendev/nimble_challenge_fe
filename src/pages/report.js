import React from "react";
import Report from "../components/Report";
import DashboardLayout from '../layouts/Dashboard'

function ReportPage(props) {
  return (
    <DashboardLayout>
      <Report reportId={props?.computedMatch?.params?.reportId}/>
    </DashboardLayout>
  );
}

export default ReportPage;
