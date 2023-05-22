import React from 'react';
import axios from 'axios';
import {Alert, Button, Collapse, Divider, message, Space} from 'antd';
const {front_port} = require('../../../constant');

const {Panel} = Collapse;

const MockPage = (props:any) => {

  const handleInsertStudent = () => {
    console.log(front_port + '/mock/user/insert')
    axios.post(front_port+'/mock/user/insert')
      .then(res => {
        // console.log(res.data)
        const {data} = res.data;
        axios.post(front_port + '/api/user/insert', data)
          .then(response => {
            const {res} = response.data.data;
            if(res === 'ok')
              message.info("40条随机学生添加成功");
            else
              message.error('学生添加失败');
          })
          .catch(err => console.log(err));
      });
  }

  const handleInsertBook = () => {
    axios.post(front_port + '/mock/book/insert')
      .then(res => {
        const {data} = res.data;
        axios.post(front_port + '/api/book/insert', data)
          .then(response => {
            const {res} = response.data.data;
            res === 'ok' ? message.info('100条随机图书添加完成')
              : message.error('图书添加失败');
          })
          .catch(err => console.log('中台请求失败',err));
      })
  }


  const handleInsertCard = () => {
    axios.post(front_port + '/mock/user/insert10')
      .then(res => {
        const {data} = res.data;
        // console.log(data);
        axios.post(front_port + '/api/card/insert', data)
          .then(res => {
            // console.log('添加成功',res)
            res.data === 'ok' ? message.success('批量添加借阅卡成功') : message.error('批量添加借阅卡失败');
          })
          .catch(err=>console.log('添加10条借阅卡错误',err))
      })
      .catch(err => console.log('添加10条学生数据失败',err));
  }

  const handleInsertBorrowing = () => {
    axios.post(front_port + '/api/borrowing/insertList')
      .then(res => {
        const {data} = res;
        data === 'ok' ? message.success('添加记录成功') : message.error('添加记录失败');
      })
      .catch(err => console.log('批量添加借阅记录失败',err));
  }

  return (
    <div style={{padding:'1.5em'}}>

      <Alert
        message="警告"
        description="管理员终极ROOT页面可以直接操作各种数据，通过mock.js生成虚拟数据，并直接写入数据库，由于没有写数据库事物和回滚，以下所有操作将不可逆，操作需谨慎！"
        type="warning"
        showIcon
        closable
      />

      <Divider />

      <Collapse defaultActiveKey={['1']} ghost accordion>
        <Panel header={<strong>批量添加学生信息40个</strong>} key="1">
          <p>将随机生成20条学生数据（非借阅卡信息），type默认为1，sup为10，初始化密码默认为123456</p>
          <Button onClick={handleInsertStudent}>批量添加学生</Button>
        </Panel>
        <Panel header={<strong>批量添加图书100个</strong>} key="2">
          <p>将随机生成100条图书信息，所有数据都将随机生成，不可干涉</p>
          <Button onClick={handleInsertBook}>批量添加图书</Button>
        </Panel>
        <Panel header={<strong>批量添加会员卡</strong>} key="3">
          <p>将一次性添加10条借阅卡记录</p>
          <p>由于从数据库里查学生信息太麻烦，所以生成借阅卡会添加 10条 额外的学生数据，并将学生数据添加借阅卡信息</p>
          <p>单独修改学生借阅卡信息请到借阅卡界面修改</p>
          <Button onClick={handleInsertCard}>批量添加借阅卡</Button>
        </Panel>

        <Panel header={<strong>批量添加借阅记录</strong>} key='4'>
          <p>从借阅卡中随机挑选10为幸运用户，并从书库中随机挑选10本书，为每位幸运用户随机添加1本借阅记录</p>
          <Button onClick={handleInsertBorrowing}>挑选幸运儿</Button>
        </Panel>

        <Panel header={<strong>模拟学生登录</strong>} key="5">
          <p>前台渲染学生界面还是管理界面是根据dva数据来的，但是登录后会把id存进localStorage，本命令将模拟把学生id写入localStorage</p>
          <Space>
            <Button onClick={()=>{
              localStorage.setItem("sno", "0247");
            }}>写入localStorage</Button>
            <Button onClick={()=>{
              localStorage.removeItem("sno");
            }}>清除数据</Button>
          </Space>
        </Panel>



      </Collapse>





    </div>
  );
}

export default MockPage;
