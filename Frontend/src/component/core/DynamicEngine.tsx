import {dynamic} from 'umi';
import React, {FC, memo, useMemo} from "react";
import {Spin} from "antd";

export interface DynamicType {
  isTpl: boolean;
  config: {[key:string]:any};
  type:string;
}

const DynamicFunc = (type:string) => {
  return dynamic({
    loader: async function(){
      const {default: Graph} = await import(`@/materials/${type}`);
      const Component = Graph;
      return (props:DynamicType) => {
        const {config, isTpl} = props;
        return <Component {...config} isTpl={isTpl} />;
      }
    },
    loading: () => (
      <div>
        <Spin>组件载入中，请稍等...</Spin>
      </div>
    )
  })
}

const DynamicEngine = memo((props:DynamicType) => {
  const {type, config} = props;
  const Dynamic = useMemo(()=>{
    return DynamicFunc(type) as unknown as FC<DynamicType>;
  }, [config]);
  return <Dynamic {...props}/>
})

export default DynamicEngine;
