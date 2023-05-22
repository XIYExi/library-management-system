import React, {useState} from "react";
import {Button, Descriptions, Divider, Empty, Input, message, Space} from "antd";
import axios from "axios";
const {front_port} = require('../../../constant');

const {Item} = Descriptions;

const BorrowBook = (props:any) => {

  const [data, setData] = useState<any | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  }

  const handleSearchBookById = () => {
    if(inputValue.length !== 0){
      axios.post(front_port + '/api/book/searchById',{id: inputValue})
        .then(res => {
          const {data} = res;
          if(data.id === null || data.id === undefined)
            setData(undefined);
          else
            setData(data);
        })
        .catch(err => console.log('根据id搜索图书错误',err));
    }
  }

  const handleBorrowing = () => {
    const sno = localStorage.getItem("sno") || '0247';
    const _ = data;
    // 可以点的时候data肯定有值！
    axios.post(front_port + '/api/card/canBorrow', {
      sno: sno,
      bno: inputValue // inputValue就是bno，把bno送进去查询判断是否此书已经借阅了
    })
      .then(res => {
        const {data} = res;
        if(data === 'ok'){
          axios.post(front_port + '/api/borrowing/borrow', {
            ..._,
            sno: sno
          })
            .then(res => {
              const {data} = res;
              data === 'ok' ? message.success('借阅成功') :
                message.error(`借阅失败`);
            })
            .catch(err => console.log('借书失败',err));
        }
        else
          message.error(`${data}`);
      })
      .catch(err => console.log('查询用户是否可以继续借书',err))


  }


  return(
    <div style={{width:'100%',textAlign:"center", marginTop:'4em'}}>
      <Space style={{margin:'auto'}}>
        <Input onChange={e=>handleInputChange(e)} style={{width: '700px'}} placeholder='请输入图书编号bno，bno请去藏书库中copy~'/>
        <Button onClick={handleSearchBookById}>搜索</Button>
      </Space>

      <Divider style={{marginTop:'3em'}}/>

      {
        data === undefined
          ? <Empty description='暂无数据'/>
          : <Descriptions
          style={{padding:'2em'}}
            title="书单信息"
            size={'middle'}
          extra={<Button onClick={handleBorrowing}>借阅</Button>}
          >
            <Item label='编号'>{data.id}</Item>
            <Item label='书名'>{data.bna}</Item>
            <Item label='出版日期'>{data.bpu}</Item>
            <Item label='出版社'>{
              new Date(data.bda).getFullYear() + '-' +
              (new Date(data.bda).getMonth()+1) + '-'+
              new Date(data.bda).getDay()}</Item>
            <Item label='书架信息'>{data.bpl}</Item>
            <Item label='剩余数量'>{data.bnu}</Item>
          </Descriptions>

      }
    </div>
  )
}

export default BorrowBook;
