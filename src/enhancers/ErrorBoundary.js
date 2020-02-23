import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // 将component中的报错发送到Fundebug
    window.fundebug.notifyError(error, {
      metaData: {
        info: info
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
      // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
