import React, {useEffect, useState} from 'react';
import {  Layout } from 'antd';
import { IRouteComponentProps } from 'umi';
import MenuSlider from '@/component/Sider';
import {history} from "umi";

export default function LayoutPage({ children }: IRouteComponentProps){

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapse:any) => {
    setCollapsed(collapse);
  };

  useEffect(()=>{
    if(localStorage.getItem("sno") === null){
      history.push('/login')
    }
  },[])

  return(
    <React.Fragment>
      <Layout>
        <Layout.Header style={{color:'white', fontSize:'24px'}}>小水獭图书管理系统</Layout.Header>

        <Layout>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={280}
            style={{ minHeight: '100vh' }}
            theme="light"
          >
            <MenuSlider />
          </Layout.Sider>
          <Layout>
            <Layout.Content>
              {children}
            </Layout.Content>
            <Layout.Footer>
              <div style={{textAlign:'center'}}>小水獭图书管理系统</div>
            </Layout.Footer>
          </Layout>
        </Layout>



      </Layout>

    </React.Fragment>
  )
}
