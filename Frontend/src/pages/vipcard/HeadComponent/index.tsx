import React, { useRef, memo, useMemo, useState, useEffect } from 'react';
import { Button, Input, Modal, Upload, Tooltip, Badge, Image } from 'antd';
import type { InputRef } from 'antd';
import styles from './index.less';
import {
  ArrowLeftOutlined,
  MobileOutlined,
  DownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  FileAddOutlined,
  CodeOutlined,
  SketchOutlined,
  UploadOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
/*@ts-ignore*/
import { history } from 'umi';
import { saveAs } from 'file-saver';
import {uuid} from "@/component/utils";

const { confirm } = Modal;
// TODO 测试用
const isDev = true;

interface HeaderComponentProps {
  pointData: any;
  location: any;
  clearData: any;
  undohandler: any;
  redohandler: any;
}

const HeaderComponent = memo((props: HeaderComponentProps) => {
  const {
    pointData,
    location,
    clearData,
    undohandler,
    redohandler,
  } = props;


  const savePreview = () => {
    const { tid } = props.location.query || '';
    //req.post('/visible/preview', { tid, tpl: pointData });
    console.log('savePreview', { tid, tpl: pointData });
  };


  // 下载数据
  const downLoadJson = () => {
    const jsonStr = JSON.stringify(pointData);
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'template.json');
  };

  const deleteAll = () => {
    Modal.confirm({
      title: '确认清空画布?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        clearData();
      },
    });
  };

  const toHelp = () => {
    //window.open('/help');
  };

  const toBack = () => {
   //history.push('/inner');
  };

  const newPage = () => {
    clearData();
    history.push(`/vipcard?tid=${uuid(8, 16)}`);
  };

  const handleSaveCode = () => {
    Modal.confirm({
      title: '确定要下载吗? 每人每天只能下载2次哦~',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 未来的下载代码逻辑
      },
    });
  };




  const content = () => {
    return <div>Test</div>;
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoArea}>
        <div className={styles.backBtn} onClick={toBack}>
          <ArrowLeftOutlined />
        </div>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.controlArea}>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          onClick={handleSaveCode}
          disabled={!pointData.length}
        >
          <DownloadOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="下载json文件"
          onClick={downLoadJson}
          disabled={!pointData.length}
        >
          <CopyOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="新建页面"
          onClick={newPage}
          disabled={!pointData.length}
        >
          <FileAddOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="清空"
          onClick={deleteAll}
          disabled={!pointData.length}
        >
          <DeleteOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="撤销"
          onClick={undohandler}
          disabled={!pointData.length}
        >
          <UndoOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          title="重做"
          onClick={redohandler}
        >
          <RedoOutlined />
        </Button>
        <Button
          type="link"
          style={{ marginRight: '9px' }}
          onClick={toHelp}
          disabled={!pointData.length}
          title="使用帮助"
        >
          帮助
        </Button>
      </div>
    </div>
  );
});

export default HeaderComponent;
