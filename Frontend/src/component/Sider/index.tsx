import React, {useEffect, useState} from 'react';
import { Menu, Slider } from 'antd';
import {
  AndroidOutlined, BookOutlined,
  ClockCircleOutlined,
  IdcardOutlined, LogoutOutlined,
  ReadOutlined, RobotOutlined, SearchOutlined, UserOutlined,
} from '@ant-design/icons';
import {history} from 'umi';


const MenuSlider = (props: any) => {

  const [type,setType] = useState<string>('');
  useEffect(()=>{
    setType(localStorage.getItem("type") || "user");
  }, [])

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

        {
          type === 'root' &&(
            <>
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
                icon={<AndroidOutlined />}
                onClick={() => {
                  history.push('/mock');
                }}
              >
                ROOT
              </Menu.Item>
            </>
          )
        }

        {
          type === 'user' && (
            <>
              <Menu.Item
                icon={<BookOutlined />}
                onClick={() => {
                  history.push('/borrowing');
                }}
              >
                藏书库
              </Menu.Item>
              <Menu.Item
                icon={<RobotOutlined />}
                onClick={() => {
                  history.push('/myborrowing');
                }}
              >
                我的借阅
              </Menu.Item>
              <Menu.Item
                icon={<SearchOutlined />}
                onClick={() => {
                  history.push('/borrowbook');
                }}
              >
                借书
              </Menu.Item>
            </>
          )
        }

        <Menu.Item
          icon={<LogoutOutlined />}
          onClick={() => {
            setType('');
            localStorage.removeItem("type");
            localStorage.removeItem("sno");
            history.push("/login");
          }}
        >
          退出
        </Menu.Item>
      </Menu>

    </React.Fragment>
  )
}

export default MenuSlider;
