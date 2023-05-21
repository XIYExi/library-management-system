import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Divider,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Typography,
} from 'antd';
import axios from 'axios';
import { QuestionCircleOutlined } from '@ant-design/icons';
const {front_port} = require('../../../constant');


const CardPage = (props:any) => {
  const [data, setData] = useState<any>([]);

  const handleGetDataFromDB = async () => {
    await axios.post(front_port + '/api/card/findAll', {
      current: 1,
      limit: 20
    })
      .then(res => {
        const {data} = res;
        setData(data.records);
      })
      .catch(err => console.log('查询借阅卡列表错误', err))
  }

  useEffect(() => {
    handleGetDataFromDB();
  }, [])

  const columns = [
    {
      title: '编号',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: '持卡人',
      dataIndex: 'sna',
      key: 'sna',
    },
    {
      title: '类型',
      dataIndex: 'level',
      key: 'level',
      render: (_:any, record:any) => {
        return(
          <>
            {_ === 0
              ? <Badge color="hsl(102, 53%, 61%)" text="普通用户" />
              : <Badge color="volcano" text="VIP用户" />
            }
          </>
        )
      }
    },
    {
      title: '学院',
      dataIndex: 'sde',
      key: 'sde'
    },
    {
      title: '专业',
      dataIndex: 'ssp',
      key: 'ssp'
    },
    {
      title: '最大借阅数量',
      dataIndex: 'sup',
      key: 'sup'
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
    setIsModalOpen(true);
    setChoose(_);
  }

  const handleItemDelete = (_:any) => {
    axios.post(front_port + '/api/card/deleteBySno', {sno: _.sno})
      .then(res => {
        const {data} = res;
        data === 'ok' ? message.success('删除成功')
          : message.error('删除失败');
        handleGetDataFromDB();
      })
      .catch(err => console.log('删除借阅卡数据失败',err))
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<number>(0);
  const [choose, setChoose] = useState<any>({});
  const handleSelectChange = (value: number) => {
    // console.log(value)
    setSelectValue(value);
  }
  const handleLevelSubmit = () => {
    axios.post(front_port + '/api/card/updateLevel', {sno:choose.sno, level: selectValue})
      .then(res => {
        const {data} = res;
        data === 'ok' ? message.success('修改成功') : message.error('修改失败');
        handleGetDataFromDB();
      })
      .catch(err => console.log('修改借阅卡等级失败',err));
    setChoose({});
    setIsModalOpen(false);
    setSelectValue(0);
  }

  const [inputValue, setInputValue] = useState<string>('');
  const handleSnaChange = (e:any) => {
    setInputValue(e.target.value);
  }
  const handleSnaSearch = () => {
    if(inputValue.length !== 0){
      axios.post(front_port + '/api/card/snaSearch',{sna:inputValue})
        .then(res => {
          const {data} = res;
          console.log(data)
          setData(data);
        })
        .catch(err => console.log('持卡人模糊查询错误', err));
    }
  }

  const [addModal, setAddModal] = useState<boolean>(false);
  const [addList, setAddList] = useState<any>([]);
  const handleAddCard = () => {
    setAddModal(true);
  }
  const handleUserSearch = async (e:any) => {
    //console.log('search', e);
    if(e.length!==0){
      await axios.post(front_port + `/api/user/snaSearch`, {sna: e})
        .then(res => {
          const {data} = res;

          setAddList(data);
        })
        .catch(err => console.log('模糊查询学生姓名异常', err));
    }
  }
  const handleCardBtn = (item:any) => {
    // console.log(item);
    const id = item.id;
    axios.post(front_port + '/api/card/addCard',{id:id})
      .then(res => {
        const {data} = res;
        //console.log(res)
        data === 'ok' ? message.success('添加成功')
          : message.error('添加失败');
    })
      .catch(err => console.log('开卡失败',err));

    setAddModal(false);
    setAddList([]);
  }


  return(
    <>
      <Space style={{padding: '1.5em'}}>
        <Input allowClear style={{width: '600px'}} placeholder='输入持卡人姓名' onChange={e=>handleSnaChange(e)}/>
        <Button onClick={handleSnaSearch}>搜索</Button>
        <Button onClick={handleGetDataFromDB}>重置</Button>
        <Button onClick={handleAddCard}>添加借阅卡</Button>
      </Space>

      <Table dataSource={data} columns={columns}/>

      <Modal
        title="添加借阅卡"
        open={addModal}
        footer={null}
        mask
        maskClosable={false}
        >
        <Input.Search style={{width: '400px'}} placeholder='输入学生姓名进行查询' onSearch={e=>handleUserSearch(e)}/>

        {
          addList.length !==0 ?
            <React.Fragment>
              <List>
                {
                  addList.map((item:any,index:number) => {
                    return (
                      <List.Item
                        key={index}
                      >
                        <Space size='middle' style={{padding:'0.6em'}}>
                          <Typography.Text>{item.sna}</Typography.Text>
                          <Typography.Text>{item.sde}</Typography.Text>
                          <Typography.Text>{item.ssp}</Typography.Text>
                          <Button type='primary' onClick={()=>handleCardBtn(item)}>给TA办卡</Button>
                        </Space>
                      </List.Item>
                    )
                  })
                }
              </List>
            </React.Fragment>
            :
            <React.Fragment>
              <Divider/>
              <Typography.Text>查无此类人</Typography.Text>
            </React.Fragment>
        }

      </Modal>

      <Modal
        title="修改用户等级"
        open={isModalOpen}
        footer={null}
        mask
        maskClosable={false}
        onCancel={()=> {
          /**
           * 所有值全部回到最初状态，防止用户点击不操作
           */
          setIsModalOpen(false);
          setChoose({});
          setSelectValue(0);
        }}
      >
        <Select
          defaultValue={0}
          style={{width: 300}}
          onChange={handleSelectChange}
          options={[
            {
              label: '普通用户',
              value: 0
            },
            {
              label:'VIP用户',
              value: 1
            }
          ]}
        />
        <Button onClick={handleLevelSubmit}>提交</Button>


      </Modal>
    </>
  )
}

export default CardPage;
