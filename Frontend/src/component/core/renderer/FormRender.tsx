import React, {FC, memo, RefObject, useEffect} from "react";
import {Form, Input, InputNumber, Select, Switch} from "antd";
import { Store } from 'antd/lib/form/interface';
import ColorPicker from "@/component/core/component/color-picker/ColorPicker";

interface FormEditorProps{
  uid: string;
  onSave: Function;
  onDel: Function;
  defaultValue: {[key:string]:any};
  config: Array<any>;
  rightPannelRef: RefObject<HTMLDivElement>;
}


const FormEditor:FC<FormEditorProps> = (props) => {
  const {
    config,
    defaultValue,
    onSave,
    uid,
    rightPannelRef
  } = props;
  const [form] = Form.useForm();
  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };
  useEffect(() => {
    return () => {
      form.resetFields();
    }
  }, [uid, form]);
  const handleChange = () => {
    onFinish(form.getFieldsValue());
  }

  return (
    <Form
      name='form_editor'
      form={form}
      labelCol={{ span:6 }}
      wrapperCol={{ span:16 }}
      initialValues={defaultValue}
      onValuesChange={handleChange}
    >
      {
        config.map((item:any, i:number) => {
          return (
            <React.Fragment key={i}>
              {
                item.type === 'Number' && (
                  <Form.Item label={item.name} name={item.key}>
                    <InputNumber max={item.range && item.range[1]} />
                  </Form.Item>
                )
              }
              {
                item.type === 'Text' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Input />
                  </Form.Item>
                )
              }
              {
                item.type === 'Color' && (
                  <Form.Item label={item.name} name={item.key}>
                    <ColorPicker />
                  </Form.Item>
                )
              }
              {
                item.type === 'Switch' && (
                  <Form.Item label={item.name} name={item.key} valuePropName="checked">
                    <Switch />
                  </Form.Item>
                )
              }
              {
                item.type === 'Select' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Select placeholder="请选择">
                      {item.range.map((v: any, i: number) => {
                        return (
                          <Select.Option value={v.key} key={i}>
                            {v.text}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                )
              }
            </React.Fragment>
          )
        })
      }
    </Form>
  )
}

export default memo(FormEditor);
