const ConsoleInfo = () => {
  console.log('%c 滑稽实验室', 'font-size:50px; background: ; text-shadow: 10px 10px 10px green');
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
