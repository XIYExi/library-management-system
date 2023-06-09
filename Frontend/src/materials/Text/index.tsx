import React, {FC, memo} from "react";
import {ITextConfig} from "@/materials/Text/schema";
import styled from "styled-components";
import {Image, Typography} from "antd";
import img from '@/assets/Typography.svg';

export interface ITextConfigProps extends ITextConfig {
  isTpl: boolean;
}
type TTextSelectKeyType = 'left' | 'right' | 'center';
type TSelectDefaultType<KeyType> = KeyType;
const ATextWrapper = styled(Typography.Text)<{
  $color: string;
  $textAlign: TSelectDefaultType<TTextSelectKeyType>;
  $fontSize: number;
  $lineHeight: number;
}>`
  color: ${(props) => props.$color};
  text-align: ${(props) => props.$textAlign};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
`;

const AText:FC<ITextConfigProps> = (props:any) => {
  const {isTpl,...restProps} = props;
  const { textAlign, text, fontSize, color, lineHeight, ...rest } = restProps;
  return(
    <>
      {
        isTpl ? (
          <div style={{padding:'1em'}}>
            <Image src={img} alt='Text预览异常'/>
          </div>
        ) : (
          <ATextWrapper
            $color={color}
            $lineHeight={lineHeight}
            $fontSize={fontSize}
            $textAlign={textAlign}
            {...rest}
          >
            {text}
          </ATextWrapper>
        )
      }
    </>
  )
}
export default memo(AText);
