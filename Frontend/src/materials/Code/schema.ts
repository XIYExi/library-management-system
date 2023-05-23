import {baseConfig, baseDefault, ICommonBaseType} from "@/component/core/common";
import {INumberConfigType} from "@/component/core/type";


type TCodeEditData = Array<INumberConfigType>;

export interface ICodeConfig extends ICommonBaseType{

}

interface ICodeSchema {
  editData: TCodeEditData;
  config: ICodeConfig;
}

const Code:ICodeSchema = {
  editData: [...baseConfig],
  config: {
    ...baseDefault
  }
}

export default Code;
