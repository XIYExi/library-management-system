import React from 'react';
import { Menu, Slider } from 'antd';
import {
  AndroidOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  ReadOutlined, UserOutlined,
} from '@ant-design/icons';
import {history} from 'umi';


const MenuSlider = (props: any) => {

  return (
    <React.Fragment>

      <Menu mode="inline">
        <Menu.Item
          icon={<ClockCircleOutlined />}
          onClick={() => {
            history.push('/');
          }}
        >
          首页
        </Menu.Item>
        <Menu.Item
          icon={<ReadOutlined />}
          onClick={() => {
            history.push('/book');
          }}
        >
          图书
        </Menu.Item>
        <Menu.Item
          icon={<IdcardOutlined />}
          onClick={() => {
            history.push('/card');
          }}
        >
          借阅卡
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/user');
          }}
        >
          学生列表
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/borrowing');
          }}
        >
          藏书库
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/myborrowing');
          }}
        >
          我的借阅
        </Menu.Item>
        <Menu.Item
          icon={<UserOutlined />}
          onClick={() => {
            history.push('/borrowbook');
          }}
        >
          借书
        </Menu.Item>
        <Menu.Item
          icon={<AndroidOutlined />}
          onClick={() => {
            history.push('/mock');
          }}
        >
          ROOT
        </Menu.Item>
      </Menu>

    </React.Fragment>
  )
}

export default MenuSlider;
