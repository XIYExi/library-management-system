import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Result, Tabs } from 'antd';
import {
  PieChartOutlined,
  PlayCircleOutlined,
  HighlightOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import FormEditor from "@/component/core/renderer/FormRender";
import DynamicEngine from "@/component/core/DynamicEngine";
import styles from './Container.less';
import { connect } from 'dva';

/**
 * antd template schema
 * */
import baseTemplate from "@/materials/template";
import baseSchema from "@/materials/schema";

import { ActionCreators, StateWithHistory } from 'redux-undo';
import {throttle} from "@/component/utils";
import HeaderComponent from "@/pages/vipcard/HeadComponent";
import CanvasControl from "@/pages/vipcard/CanvasControl";
import Calibration from "@/component/core/component/Calibration";
import SourceBox from './TargetBox';
import TargetBox from './SourceBox';

const { TabPane } = Tabs;

interface PointProps {
  x: number;
  y: number;
}

const Container = (props: {
  history?: any;
  location?: any;
  pstate?: any;
  cstate?: any;
  dispatch?: any;
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [rightColla, setRightColla] = useState<boolean>(true);
  const [scaleNum, setScale] = useState<number>(1);
  const [dragstate, setDragState] = useState<PointProps>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });
  const [tabsKey, setTabsKey] = useState<string>('1');

  const { pstate, cstate, dispatch } = props;
  const pointData = pstate ? pstate.pointData : [];
  const cpointData = cstate ? cstate.pointData : [];

  const changeCollapse = useMemo(() => {
    return (c: boolean) => {
      setCollapsed(c);
    };
  }, []);

  //右侧边框
  const changeRightColla = useMemo(() => {
    return (c: boolean) => {
      setRightColla(c);
    };
  }, []);

  const curPoint = pstate ? pstate.curPoint : {};

  // 指定当前画布id
  let canvasId = 'envelope_canvas';

  // 重定尺寸
  const backSize = () => {
    setScale(1);
    setDragState({
      x: 0,
      y: 0,
    });
  };

  // 左侧 Tabs 的 Icon
  const CpIcon = {
    base: <HighlightOutlined />,
    media: <PlayCircleOutlined />,
    control: <PieChartOutlined />,
    social: <AppstoreOutlined />,
  };

  // 生成头部
  const generateHeader = useMemo(() => {
    return (text: string) => {
      return (
        <div style={{ height: '10%' }}>
          {(CpIcon as any)['base']} {text}
        </div>
      );
    };
  }, [CpIcon]);

  // 滑动条
  const handleSlider = useMemo(() => {
    return (type: any) => {
      if (type)
        setScale((prev: number) => +(prev + 0.1).toFixed(1));
      else setScale((prev: number) => +(prev - 0.1).toFixed(1));
    };
  }, []);

  // 保存表单
  const handleFormSave = useMemo(() => {
    return (data: any) => {
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPoint, item: { ...curPoint.item, config: data } },
      });
    };
  }, [curPoint, dispatch]);

  // 清除全部数据
  const clearData = useCallback(() => {
    dispatch({ type: 'editorModal/clearAll' });
  }, [dispatch]);

  // 删除单个组件
  const handleDel = useMemo(() => {
    return (id: any) => {
      dispatch({
        type: 'editorModal/delPointData',
        payload: { id },
      });
    };
  }, [dispatch]);

  const redohandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.redo());
    };
  }, [dispatch]);

  const undohandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.undo());
    };
  }, [dispatch]);



  useEffect(() => {
    if (pstate.curPoint && pstate.curPoint.status === 'inToCanvas') {
      setRightColla(false);
    }
  }, [pstate.curPoint]);

  const allType = useMemo(() => {
    let arr: string[] = [];
    baseTemplate.map(v => {
      arr.push(v.type);
    })
    return arr;
  }, [baseTemplate]);

  useEffect(() => {
    console.log('curPoint', curPoint);
  }, []);

  const renderRight = useMemo(() => {
    return (
      <React.Fragment>
        <div
          ref={ref}
          className={styles.attrSetting}
          style={{
            transition: 'all ease-in-out 0.5s',
            transform: rightColla ? 'translate(100%,0)' : 'translate(0,0)',
          }}
        >
          {pointData.length && curPoint ? (
            <React.Fragment>
              <div className={styles.tit}>属性设置</div>
              <FormEditor
                uid={curPoint.id}
                onSave={handleFormSave}
                onDel={handleDel}
                defaultValue={curPoint.item.config}
                config={curPoint.item.editableEl}
                rightPannelRef={ref}
              />
            </React.Fragment>
          ) : (
            <div style={{ paddingTop: '100px' }}>
              <Result
                status="404"
                title="还没有数据哦"
                subTitle="赶快拖拽组件来生成你的页面吧～"
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }, [
    cpointData.length,
    curPoint,
    handleDel,
    handleFormSave,
    pointData.length,
    rightColla,
  ]);

  /* useEffect(()=>{
    //测试用
    antdSocialTemplate.map((value, i) => {
      console.log(antdSchema[value.type as keyof typeof antdSchema])
    })
  }, [])*/

  const tabRender = useMemo(() => {
    if (collapsed) {
      return (
        <>
          <TabPane tab={generateHeader('base')} key="1"></TabPane>
        </>
      );
    } else {
      return (
        <>
          <TabPane tab={generateHeader('base')} key="1">
            <div className={styles.ctitle}>基础组件</div>
            {baseTemplate.map((value, i) => {
              return (
                <TargetBox item={value} key={i} canvasId={canvasId}>
                  <DynamicEngine
                    isTpl={true}
                    type={value.type}
                    //@ts-ignore
                    config={
                      baseSchema[value.type as keyof typeof baseSchema].config
                    }
                  />
                </TargetBox>
              );
            })}
          </TabPane>
        </>
      );
    }
  }, [
    canvasId,
    collapsed,
    generateHeader,
    baseTemplate,
    baseSchema
  ]);

  const handleTabsChange = useCallback((e) => {
    console.log(String(e));
    setTabsKey(String(e));
  }, []);

  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        let diffx: number;
        let diffy: number;
        const newX = e.clientX;
        const newY = e.clientY;
        diffx = newX - diffmove.start.x;
        diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });
        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);

  useEffect(() => {
    if (diffmove.move && containerRef.current) {
      containerRef.current.style.cursor = 'move';
    } else {
      containerRef.current!.style.cursor = 'default';
    }
  }, [diffmove.move]);

  return (
    <div className={styles.editorWrap}>
      <HeaderComponent
        redohandler={redohandler}
        undohandler={undohandler}
        pointData={pointData}
        clearData={clearData}
        location={props.location}
      />
      <div className={styles.container}>
        <div
          className={styles.list}
          style={{
            transition: 'all ease-in-out 0.5s',
            position: 'fixed',
            width: collapsed ? '50px' : '350px',
            zIndex: 200,
            boxShadow: 'none',
          }}
        >
          <div className={styles.componentList}>
            <Tabs
              className="editorTabclass"
              onTabClick={() => changeCollapse(false)}
              activeKey={tabsKey}
              tabPosition={'left'}
              onChange={(e) => handleTabsChange(e)}
            >
              {tabRender}
            </Tabs>
          </div>
          <div
            className={styles.collapsed}
            style={{ position: 'absolute', bottom: '80px', left: '20px' }}
            onClick={() => changeCollapse(!collapsed)}
          >
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
        </div>

        <div
          style={{
            width: collapsed ? '50px' : '350px',
            transition: 'all ease-in-out 0.5s',
          }}
        ></div>

        <div
          className={styles.tickMark}
          id="calibration"
          ref={containerRef}
          onMouseDown={mousedownfn}
          onMouseMove={throttle(mousemovefn, 500)}
          onMouseUp={mouseupfn}
          onMouseLeave={mouseupfn}
          onWheel={onwheelFn}
        >
          <div className={styles.tickMarkTop}>
            <Calibration
              direction="up"
              id="calibrationUp"
              multiple={scaleNum}
            />
          </div>
          <div className={styles.tickMarkLeft}>
            <Calibration
              direction="right"
              id="calibrationRight"
              multiple={scaleNum}
            />
          </div>
          <SourceBox
            dragState={dragstate}
            setDragState={setDragState}
            scaleNum={scaleNum}
            canvasId={canvasId}
            allType={allType}
          />
          <CanvasControl
            scaleNum={scaleNum}
            handleSlider={handleSlider}
            backSize={backSize}
          />
        </div>

        {renderRight}

        <div
          className={styles.rightcolla}
          style={{
            position: 'absolute',
            right: rightColla ? 0 : '304px',
            transform: 'translate(0,-50%)',
            transition: 'all ease-in-out 0.5s',
          }}
          onClick={() => changeRightColla(!rightColla)}
        >
          {!rightColla ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </div>
        <div
          style={{
            width: rightColla ? 0 : '304px',
            transition: 'all ease-in-out 0.5s',
          }}
        ></div>
      </div>
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    pstate: state.present.editorModal,
    cstate: state.present.editorPcModal,
  };
})(Container);
