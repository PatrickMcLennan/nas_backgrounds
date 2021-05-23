import React from 'react';
import NextDocument from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

/**
 * Create stylesheets from styled-components and apply
 * serverside.  This stops a brief flash of unstyled content.
 *
 * @see https://medium.com/javascript-in-plain-english/ssr-with-next-js-styled-components-and-material-ui-b1e88ac11dfa
 */

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(<App {...props} />),
        });
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }
}
