import { css } from 'styled-components';
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../constants';
import {
  CSS,
  FlexAlignment,
  FlexDirection,
  FlexWrap,
} from '../types/style.types';

export function activeStates(activeStyles: CSS) {
  return css`
    &:active,
    &:focus,
    &:hover {
      ${activeStyles};
      outline: none;
    }
  `;
}

export function flexin({
  jc = `center`,
  ai = `center`,
  fd = `row`,
  fw = `nowrap`,
}: {
  jc?: FlexAlignment;
  ai?: FlexAlignment;
  fd?: FlexDirection;
  fw?: FlexWrap;
}) {
  return css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `;
}

export function fontLine(fs: string, lh = `normal`) {
  return css`
    font-size: ${fs};
    line-height: ${lh};
  `;
}

export function tablet(tabletCss: CSS) {
  return css`
    @media screen and (max-width: ${TABLET_BREAKPOINT}) {
      ${tabletCss}
    }
  `;
}

export function mobile(mobileCss: CSS) {
  return css`
    @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
      ${mobileCss}
    }
  `;
}
