import React,{FC,memo,useState} from "react";
import {Image} from "antd";
import {IImageConfig} from "@/materials/Image/schema";
import styled from "styled-components";

interface IImageProps extends IImageConfig{
  isTpl: boolean;
}

const AImageWrapper = styled.div<{
  $baseWidth: number;
  $baseHeight: number;
  $borderRadius: number;
  $baseLeft: number;
  $baseTop: number;
  $baseScale: number;
  $baseRotate: number;
  circle: boolean;
}>`
  overflow: hidden;
  position: absolute;
  width: ${(props) => props.$baseWidth + '%'};
  height: ${(props) => props.$baseHeight + '%'};
  border-radius: ${(props) => (props.circle && '50%' ) || props.$borderRadius};
  transform: ${(props) => `translate(${props.$baseLeft}px,${props.$baseTop}px)
      scale(${props.$baseScale / 100})
      rotate(${props.$baseRotate}deg)`};
`;

const AImageContainer = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const AImage:FC<IImageProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    src,
    circle,
  } = restProps;
  return(
    <>
      {
        isTpl ? (
          <Image src={''} alt={'Image预览链接错误'}/>
        ) : (
          <AImageWrapper
            circle={circle}
            $baseWidth={props.baseWidth}
            $baseHeight={props.baseHeight}
            $borderRadius={props.baseRadius}
            $baseLeft={props.baseLeft}
            $baseRotate={props.baseLeft}
            $baseScale={props.baseScale}
            $baseTop={props.baseTop}
          >
            <AImageContainer>
              <Image
                src={src}
                alt="图片src链接错误"
                style={{ width: '100%',borderRadius: ((circle && '50%')||0) }}
              />
            </AImageContainer>
          </AImageWrapper>
        )
      }
    </>
  )
}

export default memo(AImage);

