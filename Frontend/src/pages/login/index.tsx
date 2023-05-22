import React from 'react';
import logo from '../../assets/logo.png';
import signin from '../../assets//signin.png';
import axios from 'axios';
import { history } from 'umi';
import { message } from 'antd';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Popup,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from "styled-components";


const DividerWrapper = styled(Divider)`
  margin-top: 3em !important;
  margin-bottom: 3em !important;
`;

const FormItemWrapper = styled(Form.Input)`
  margin-bottom: 1.5em !important;
`;

const SegmentWrapper = styled(Segment)`
  margin-top: 0 !important;
  padding-top: 0 !important;
`;

class LoginForm extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      inputPwd: 0,
      inputUsername: '',
      which: 'in',
    };
  }



  bindInputUsername = (e:any) => {
    const inputTel = e.target.value;
    this.setState({
      inputUsername: inputTel,
    });
  };

  bindInputPwd = (e:any) => {
    const inputPwd = e.target.value;
    this.setState({
      inputPwd: inputPwd,
    });
  };

  bindLoginBtn = () => {
    const { inputUsername, inputPwd } = this.state;
    //console.log(inputUsername,inputPwd)
    if(inputUsername === '0247' && inputPwd === '123456'){
      localStorage.setItem("sno", "0247");
      localStorage.setItem("type","user");

    }
    else if(inputUsername === '1968' && inputPwd === '123456'){
      localStorage.setItem("sno", "1968");
      localStorage.setItem("type","root");
    }
    history.push('/');
  };




  render() {
    return (
      <div className="login">
        <Grid style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={4}>
              <div style={{ paddingLeft: '4em' }}>
                <Header as="h2" color="teal" textAlign="center">
                  <Image circular style={{ width: '64px' }} src={logo} />
                  <p
                    style={{
                      marginTop: '0.3em',
                      fontSize: '24px',
                      fontWeight: 550,
                    }}
                  >
                    小水獭图书管理系统
                  </p>
                </Header>

                <DividerWrapper horizontal>
                  {this.state.which === 'in' ? '用户登录' : '新用户注册'}
                </DividerWrapper>

                {this.state.which === 'in' && (
                  <>
                    <Form size="large">
                      <Segment basic>
                        <Form.Field>
                          <label>用户名</label>
                          <FormItemWrapper
                            fluid
                            icon="user"
                            iconPosition="left"
                            onChange={(e:any) => this.bindInputUsername(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>密码</label>
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            onChange={(e) => this.bindInputPwd(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          {/*@ts-ignore*/}
                          <Checkbox label="记住我" />
                          <span style={{ position: 'absolute', right: '5px' }}>
                            {/*@ts-ignore*/}
                            <Popup
                              content="用户名0247，密码123456登录学生系统；用户名1968，密码123456登录管理系统；"
                              position="bottom right"
                              trigger={<a>忘记密码？</a>}
                            />
                          </span>
                        </Form.Field>

                        <div style={{ marginTop: '3em' }}>
                          {/*@ts-ignore*/}
                          <Button
                            color="teal"
                            fluid
                            size="large"
                            onClick={this.bindLoginBtn}
                          >
                            登录
                          </Button>
                        </div>
                      </Segment>
                    </Form>
                    {/* @ts-ignore*/}
                    <SegmentWrapper basic textAlign={'center'}>
                      新用户？ <a>去管理员处办卡吧！</a>
                    </SegmentWrapper>
                  </>
                )}
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <Image
                centered
                src={signin}
                size="big"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
