import React, { useState, useEffect } from "react";
import { Modal, Spin, message } from "antd";
import { getScrapedHtmlString } from '../../services/keyword'

import parse from 'html-react-parser'

export default function ScrapedHtmlDetail({ keywordId, setSelectedKeywordId }) {
  const [htmlString, setHtmlString] = useState('');
  const [err, setErr] = useState(null);

  const handleModalCancel = () => {
    setSelectedKeywordId(null)
    setHtmlString('')
    setErr(null)
  };

  useEffect(() => {
    async function fetchHtmlString() {
      const result = await getScrapedHtmlString(keywordId);

      if (result.success) {
        setHtmlString(result.data.data.html_string);
      } else {
        message.error(result.error);
        setErr(result.error);
      }
    }

    const modalIsOpen = keywordId

    if (!err && modalIsOpen) {
      fetchHtmlString()
    }
  }, [keywordId, err]);

  return(
    <Modal
      open={keywordId !== null}
      onCancel={handleModalCancel}
      footer={null}
      width='80%'
      style={{ top: 100 }}
      bodyStyle={{ height: '80vh', overflowY: 'auto' }}
    >
      {htmlString ? (
        <div>{parse(htmlString)}</div>
      ) : (err ? (<div>{err}</div>) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      ))}
    </Modal>
  )
};