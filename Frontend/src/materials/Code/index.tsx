import React, {FC, memo} from "react";
import {Image} from "antd";
import {ICodeConfig} from "@/materials/Code/schema";
import img from '@/assets/code.png';

interface ICodeProps extends ICodeConfig{
  isTpl:true;
}

const ACode:FC<ICodeProps> = (props) => {

  const {isTpl} = props;

  return(
    <>
      {
        isTpl ? (<>
          <Image src={img} style={{padding:'1em'}} alt='磁条组件图片预览错误'/>
        </> ) : (
          <div style={{
            backgroundColor: '#000',
            width:'100%',
            height:'45px'
          }} />
        )
      }

    </>
  )
}

export default memo(ACode);
