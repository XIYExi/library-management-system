import React from "react";
import {Layout} from "antd";
import ColorPicker from "@/component/core/component/color-picker/ColorPicker";

const VipCard = (props:any) => {


  return(
    <>
      <Layout>
        <Layout.Header></Layout.Header>
        <Layout>
          <Layout.Sider>s</Layout.Sider>
          <Layout.Content>
            <ColorPicker />
          </Layout.Content>
          <Layout.Sider>s</Layout.Sider>
        </Layout>
      </Layout>
    </>
  )
}

export default VipCard;
