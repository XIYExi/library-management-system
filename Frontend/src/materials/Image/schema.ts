import {baseConfig, baseDefault, ICommonBaseType} from "@/component/core/common";
import {
  INumberConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TSwitchDefaultType,
  TTextDefaultType
} from "@/component/core/type";

type TImageEditData = Array<
  ISwitchConfigType |
  ITextConfigType |
  INumberConfigType
  >

export interface IImageConfig extends ICommonBaseType{
  circle: TSwitchDefaultType;
  src: TTextDefaultType;
}

interface IImageSchema {
  editData: TImageEditData;
  config: IImageConfig;
}

const Image: IImageSchema = {
  editData: [
    {
      key:'circle',
      name:'圆形图片',
      type:'Switch'
    },
    {
      key:'src',
      name:'图片链接',
      type:'Text'
    },
    ...baseConfig
  ],
  config:{
    circle: false,
    src: '',
    ...baseDefault
  }
}

export default Image;
