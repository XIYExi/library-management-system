import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Form, Input, InputNumber, Layout, message, Modal, Popconfirm, Space, Table, Typography } from 'antd';
import axios from 'axios';
import { QuestionCircleOutlined } from '@ant-design/icons';
const {front_port} = require('../../../constant');

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Book = (props:any) => {

  const [data, setData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [choose,setChoose] = useState<any>({});

  const columns = [
    {
      title: '书名',
      dataIndex: 'bna',
      key: 'bna',
    },
    {
      title: '出版时间',
      dataIndex: 'bda',
      key: 'bda',
    },
    {
      title: '出版社',
      dataIndex: 'bpu',
      key: 'bpu',
    },
    {
      title: '书架信息',
      dataIndex: 'bpl',
      key: 'bpl'
    },
    {
      title: '图书数量',
      dataIndex: 'bnu',
      key: 'bnu'
    },
    {
      title:'操作',
      key: 'action',
      render: (_:any,record:any) => {
        // _是当前数据
        return(
          <>
            <Space size="middle">
              <Typography.Link onClick={()=>handleItemToUpdate(_)}>Update</Typography.Link>
              <Popconfirm onConfirm={()=>handleItemDelete(_)} title="确定要执行删除吗？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                <Typography.Link>Delete</Typography.Link>
              </Popconfirm>
            </Space>
          </>
        )
      }
    }
  ]

  const handleItemToUpdate = (_:any) => {
    // console.log(_);
    setChoose(_);
    setIsModalOpen(true);
  }
  const handleItemDelete = (_:any) => {
    axios.post(front_port + '/api/book/deleteById', {
      id: _.id
    })
      .then(response => {
        console.log(response)
        if(response.data === 'ok'){
          message.success('删除成功')
          handleGetBookPages();
        }
        else
          message.error('删除失败');
      })
  }

  useEffect(()=>{
     handleGetBookPages();
  },[])

  /**
   * 更新数据表单逻辑
   */
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values);

    const json:any = {
      id: choose.id,
      bna: ((values.bna === undefined || values.bna.length === 0) && choose.bna ) || values.bna,
      bda: ((values.bda === undefined || values.bda.length === 0) && choose.bda ) || values.bda,
      bpu: ((values.bpu === undefined || values.bpu.length === 0) && choose.bpu ) || values.bpu,
      bpl: ((values.bpl === undefined || values.bpl.length === 0) && choose.bpl ) || values.bpl,
      bnu: ((values.bnu === undefined || values.bnu === null) && choose.bnu ) || values.bnu,
    }

    /*json['createTime'] = choose['createTime'];
    json['updateTime'] = choose['updateTime'];
    json['delete'] = choose['delete'];
    json['version'] = choose['version'];*/

    await axios.post(front_port + '/api/book/updateById',json)
      .then(res => {
        // console.log(res.data)
        let msg = res.data;
        if(msg === 'ok'){
          message.success('更像成功');
          handleGetBookPages();
        }
        else{
          message.error('更新失败');
        }
      })

    setChoose({});
    setIsModalOpen(false);
  };
  const onReset = () => {
    form.resetFields();
  };

  const handleGetBookPages = async () => {
    await axios.post(front_port + '/api/book/listByPage',{
      current: 1,
      limit: 20
    })
      .then(res => {
        const {data} = res;
        console.log(data)
        setData(data.records);
      })
  }

  const [title, setTitle] = useState<string>('');
  const handleTitleChange = (e:any) => {
    setTitle(e.target.value);
  }

  const handleTitleSearch = () => {
    if(title.length !== 0){
      axios.post(front_port + '/api/book/searchTitle', {title: title})
        .then(res => {
          console.log(res.data);
          setData(res.data);
        })
    }
  }

  const handleAddBook = () => {
    setIsAddOpen(true);
  }

  const onAddFinish = async (values: any) => {
    const json:any = {
      bna: values.bna,
      bda: values.bda,
      bpu: values.bpu,
      bpl: values.bpl,
      bnu: values.bnu,
    }
    await axios.post(front_port + '/api/book/insertManuel', json)
      .then(res => {
        const {data} = res;
        console.log(data)
        if(data === 'ok'){
          message.success('添加图书成功');
          handleGetBookPages();
        }
        else
          message.error('添加图书失败');
      })
      .catch(err => console.log('添加图书失败', err));
    setIsAddOpen(false);
  }

  return(
    <>
      <div className='search-wrapper'>
        <Space>
          <Input allowClear className='input-wrapper' onChange={e => handleTitleChange(e)} placeholder={'书名'}/>
          <Button onClick={handleTitleSearch}>查询</Button>
          <Button onClick={handleGetBookPages}>重置</Button>
          <Button onClick={handleAddBook}>录入图书</Button>
        </Space>

      </div>

      <Table columns={columns} dataSource={data}/>

      <Modal
        title="修改图书信息"
        open={isModalOpen}
        footer={null}
        mask
        maskClosable={false}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="id" label="编号">
            <Input disabled value={choose.id} placeholder={choose.id}/>
          </Form.Item>
          <Form.Item name='bna' label='书名'>
            <Input />
          </Form.Item>
          <Form.Item name='bda' label='出版日期'>
            <Input />
          </Form.Item>
          <Form.Item name='bpu' label='出版社信息'>
            <Input />
          </Form.Item>
          <Form.Item name='bpl' label='书架信息'>
            <Input />
          </Form.Item>
          <Form.Item name='bnu' label='图书数量'>
            <InputNumber />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/*添加图书*/}
      <Modal
        title="图书信息录入"
        open={isAddOpen}
        footer={null}
        mask
        maskClosable={false}
        onCancel={()=>setIsAddOpen(false)}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onAddFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name='bna' label='书名' rules={[{ required: true, message: '书名必须录入，请携带书名号' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='bda' label='出版日期'>
            <Input />
          </Form.Item>
          <Form.Item name='bpu' label='出版社信息'>
            <Input />
          </Form.Item>
          <Form.Item name='bpl' label='书架信息' rules={[{ required: true, message: '书架位置必须录入' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='bnu' label='图书数量' rules={[{ required: true, message: '图书数量必须录入' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Book;
