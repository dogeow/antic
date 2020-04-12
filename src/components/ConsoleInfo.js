const ConsoleInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  console.log(`%c ${process.env.REACT_APP_NAME}`, 'font-size:50px; text-shadow: 10px 10px 10px black');
  if (1) {
    console.group('用户列表');
    console.log('昵称: 小李世界');
    console.log('职业: 程序🐶');
    console.log('语言: PHP');
    if (1) {
      console.group('兴趣');
      console.log('音乐');
      console.log('守望先锋');
      console.groupEnd();
    }
    console.groupEnd();
  }
};

export default ConsoleInfo;
