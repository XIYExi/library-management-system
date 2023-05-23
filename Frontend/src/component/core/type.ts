import { ReactNode } from 'react';

export interface INumberConfigType {
  key: string;
  name: string;
  type: 'Number';
  range?: [number, number];
  step?: number;
}
export type TNumberDefaultType = number;


////////////////////
export interface IColorConfigType {
  key: string;
  name: string;
  type: 'Color';
}
export type TColorDefaultType = string;

/////////////////////////////////
export interface ISelectConfigType<KeyType> {
  key: string;
  name: string;
  type: 'Select';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}
export type TSelectDefaultType<KeyType> = KeyType;

/////////////////////////
export interface ITextConfigType {
  key: string;
  name: string;
  type: 'Text';
  placeholder?: string;
}

export type TTextDefaultType = string;

///////////////

export interface ISwitchConfigType {
  key: string;
  name: string;
  type: 'Switch';
}
export type TSwitchDefaultType = boolean;


