import React, {useEffect, useState} from 'react';
import {Alert, Button, Input, Popconfirm, Space, Table, Typography} from "antd";
import axios from "axios";
const {front_port} = require('../../../constant');

const Borrowing = (props:any) => {

  const [data, setData] = useState([]);
  const handleGetBookFromDB = async() => {
    await axios.post(front_port + '/api/book/selectBookForStu')
      .then(res => {
        const {data} = res;
        setData(data);
      })
      .catch(err => console.log('学生页面请求图书列表异',err));
  }

  useEffect(() => {
    handleGetBookFromDB();
  }, [])

  const columns = [
    {
      title:'编号',
      dataIndex:'id',
      key:'id',
    },
    {
      title: '书名',
      dataIndex: 'bna',
      key: 'bna',
    },
    {
      title: '出版时间',
      dataIndex: 'bda',
      key: 'bda',
    },
    {
      title: '出版社',
      dataIndex: 'bpu',
      key: 'bpu',
    },
    {
      title: '书架信息',
      dataIndex: 'bpl',
      key: 'bpl'
    },
    {
      title: '图书数量',
      dataIndex: 'bnu',
      key: 'bnu'
    }
  ]

  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  }
  const handleBookTitleSearch = () => {
    if(inputValue.length !== 0){
      axios.post(front_port + '/api/book/searchTitle', {title: inputValue})
        .then(res => {
          const {data} = res;
          setData(data);
        })
        .catch(err => console.log('学生页面模糊查询图书列表异常',err));
    }
  }

  return(
    <React.Fragment>

      <Alert
        style={{margin: '1.5em',marginBottom:0}}
        type='info'
        message='为了模拟图书馆借书场景，电脑只可以查询当前在馆的书籍而不可以借书，借书请复制当前图书的id去借书页面借书'/>

      <div>
        <Space style={{padding:'1.5em'}}>
          <Input style={{width:'600px'}} placeholder='请输入书名' onChange={e=>handleInputChange(e)}/>
          <Button onClick={handleBookTitleSearch}>搜索</Button>
          <Button onClick={handleGetBookFromDB}>重置</Button>
        </Space>
      </div>

      <Table dataSource={data} columns={columns} pagination={{defaultPageSize: 20}}/>
    </React.Fragment>
  )
}

export default Borrowing;
