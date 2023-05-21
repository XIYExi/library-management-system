import React, { useEffect, useState } from 'react';
import './index.less';
import { Badge, Button, Input, message, Popconfirm, Space, Table, Typography } from 'antd';
import axios from 'axios';
const {front_port } = require('../../../constant');

export default function IndexPage() {

  const [data, setData] = useState<any>([]);
  const handleGetDataFromDB = async () => {
    await axios.post(front_port + '/api/user/list')
      .then(res => {
        const {data} = res;
        setData(data);
      })
      .catch(err => console.log('查询学生用户列表失败',err));
  }
  useEffect(()=>{
    handleGetDataFromDB();
  }, [])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'sna',
      key: 'sna',
    },
    {
      title: '学院',
      dataIndex: 'sde',
      key: 'sde'
    },
    {
      title: '专业',
      dataIndex: 'ssp',
      key: 'ssp'
    },
    {
      title: '最大借阅数量',
      dataIndex: 'sup',
      key: 'sup'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ]

  const [inputValue,setInputValue] = useState<string>('');
  const handleSnaChange = (e:any) => {
    setInputValue(e.target.value);
  }
  const handleSnaSearch = () => {
    if(inputValue.length!==0){
      axios.post(front_port + '/api/user/snaSearch', {sna: inputValue})
        .then(res => {
          const {data} = res;
          setData(data);
        })
        .catch(err => console.log('模糊查询学生姓名异常',err));
    }
  }


  return (
    <div>
      <Space style={{padding: '1.5em'}}>
        <Input allowClear style={{width: '600px'}} placeholder='请输入学生姓名' onChange={e=>handleSnaChange(e)}/>
        <Button onClick={handleSnaSearch}>查询</Button>
        <Button onClick={handleGetDataFromDB}>重置</Button>
      </Space>

      <Table dataSource={data} columns={columns}/>
    </div>
  );
}
