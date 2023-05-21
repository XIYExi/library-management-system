import React, { useState } from 'react';
import { Divider, Layout } from 'antd';
import { IRouteComponentProps } from 'umi';
import MenuSlider from '@/component/Sider';

export default function LayoutPage({ children }: IRouteComponentProps){

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapse:any) => {
    setCollapsed(collapse);
  };

  return(
    <React.Fragment>
      <Layout>
        <Layout.Header>图书管理系统</Layout.Header>

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
              <Divider >Footer占位用</Divider>
              <div style={{textAlign:'center'}}>Footer</div>
            </Layout.Footer>
          </Layout>
        </Layout>



      </Layout>

    </React.Fragment>
  )
}
