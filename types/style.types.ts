import type { FlattenSimpleInterpolation } from 'styled-components';

export type FlexAlignment =
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'center'
  | 'stretch';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'wrap' | 'nowrap';

export type CSS = FlattenSimpleInterpolation;
