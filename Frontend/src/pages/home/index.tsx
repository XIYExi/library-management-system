import React from "react";

import {Divider, Image, Typography} from "antd";
import logo from '../../assets/logo.png';

const Home = (props:any) =>{

  return(
    <div style={{textAlign:'center',margin:'10em'}}>
      <Image preview={false} src={logo} style={{borderRadius:'50%'}}/>
      <Divider />
      <Typography.Title>欢迎使用小水獭图书管理系统</Typography.Title>
    </div>
  )
}

export default Home;
