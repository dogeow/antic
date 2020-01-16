import React, { Component } from 'react'

const log = (methodName, args) => {
  console.log(methodName, args);
};

// Todo 部分生命周期不再可用，具体可看 https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
const NewComponent = (WrappedComponent) => {
  class NewComponent extends Component {
    state = {};

    UNSAFE_componentWillMount() {
      log('组件将会挂载', arguments);
    }

    componentDidMount() {
      log('组件结束挂载', arguments);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState, Content) {
      log('组件接收了新的参数', arguments);
    }

    shouldComponentUpdate(nextProps) {
      log('判断是否该更新', arguments);
    }

    UNSAFE_componentWillUpdate() {
      log('组件将会更新', arguments);
    }

    componentDidUpdate() {
      log('组件结束更新', arguments);
    }

    componentWillUnmount() {
      log('组件将会卸载', arguments);
    }

    render() {
      return <WrappedComponent/>
    }
  }

  return NewComponent
};

export default NewComponent;
