import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Image, List, message, Modal, Popconfirm, Space, Table, Typography} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
const {front_port} = require('../../../constant');
import code from '../../assets/code.png';

const MyBorrowing = (props:any) => {


  const [data, setData] = useState<[]>([]);
  const handleGeyMyBorrowingFromDB = async(sno:string) => {
    await axios.post(front_port + '/api/borrowing/getMyBorrowing', {
      sno: sno,
    })
      .then(res => {
        const {data} = res;
        console.log(data);
        setData(data);
      })
      .catch(err => console.log('我的借阅数据查询异常',err));
  }
  useEffect(()=>{
    const sno = localStorage.getItem("sno") || '0247';
    // TODO 此页面进来的话localStorage肯定有值，没值就给回退到登录页面了 但是编写的时候先用0247占位
    handleGeyMyBorrowingFromDB(sno);
  }, [])


  const columns = [
    {
      title:'工号',
      dataIndex: 'id',
      key:'id'
    },
    {
      title: '书名',
      dataIndex: 'bna',
      key:'bna'
    },
    {
      title:'借书时间',
      dataIndex:'createTime',
      key:'createTime',
      render:(_:any)=> {
        let date = new Date(_);
        return(
          <Typography.Text>{date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay()}</Typography.Text>
        )
      }
    },
    {
      title:'到期时间',
      dataIndex:'expire',
      key:'expire',
      render:(_:any)=> {
        let date = new Date(_);
        return(
          <Typography.Text>{date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDay()}</Typography.Text>
        )
      }
    },
    {
      title:'剩余借阅天数',
      dataIndex:'time',
      key:'time',
      render:(_:any)=> {
        return(
          <Typography.Text>
            {
              _ <= 0 ? <Typography.Text>{0 - _}天</Typography.Text>
                : <Typography.Text color='red'>过期{_}天</Typography.Text>
            }
          </Typography.Text>
        )
      }
    },
    {
      title: '逾期费用',
      dataIndex: 'money',
      key: 'money',
      render: (_: any, record: any) => {
        return (
          <>
            {
              _ < 0 ? <Typography.Text style={{color: 'red'}}>{0 - _}元</Typography.Text>
                : <Typography.Text>{_}元</Typography.Text>
            }
          </>
        )
      }
    },
    {
      title:'操作',
      key: 'action',
      render: (_:any,record:any) => {
        // _是当前数据
        return(
          <>
            <Space size="middle">
              <Typography.Link onClick={()=>handleReturnBook(_)}>还书</Typography.Link>
            </Space>
          </>
        )
      }
    }
  ]

  const handleReturnBook = (_:any) => {
    if(_.money > 0){
      Modal.confirm({
        title:'请先完成缴费',
        okText:'已完成缴费',
        onOk:() => {
            handleReturnBookFunc(_);
            Modal.destroyAll();
          },
        content:(
          <div >
            <Image width={250} preview={false} src={code}/>
          </div>
        )
      })
    }
    else{
      // console.log(_)
      // 不需要还钱，直接请求后端还书
      handleReturnBookFunc(_);
    }
  }

  const handleReturnBookFunc = (_:any) => {
    const sno = localStorage.getItem("sno") || '0247';
    axios.post(front_port + '/api/borrowing/returnBook',{
      id: _.id,
      sno: sno,
      bno: _.bno,
    })
      .then(res => {
        const {data} = res;
        data === 'ok' ? message.success('还书成功') : message.error('还书失败');
        handleGeyMyBorrowingFromDB(sno);
      })
      .catch(err => console.log('还书请求异常',err));
  }
  return(
    <>
      <Table dataSource={data} columns={columns}/>
    </>
  )
}

export default MyBorrowing;
