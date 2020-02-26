import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // componentDidCatch and getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会加上。
  // https://zh-hans.reactjs.org/docs/hooks-faq.html
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // 将 component 中的报错发送到 Fundebug
    window.fundebug.notifyError(error, {
      metaData: {
        info: info
      }
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
      // Note: 也可以在出错的 component 处展示出错信息，返回自定义的结果。
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
