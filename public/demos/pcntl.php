<?php
$processNum = 4;
$timeStart = time();
$tasks = range(1, 20);

$jobs = [];
foreach ($tasks as $task) {
    //这里讲返回的结果对4进行取模，存入4个数组，然后4个进程分别读取不同的数据进行处理
    $jobs[$task % $processNum][] = $task;
}

$mainPid = posix_getpid();
echo "主进程：" . $mainPid . PHP_EOL;

for ($i = 0; $i < $processNum; $i++) {
    $pid = pcntl_fork();
    if ($pid == -1) {
        //错误处理：创建子进程失败时返回-1.
        die('could not fork');
    } elseif ($pid) {
        //父进程会得到子进程号，所以这里是父进程执行的逻辑
    } else { // 子进程得到的$pid为0, 所以这里是子进程执行的逻辑。
        $content = $jobs[$i];
        $childStart = time();
        foreach ($content as $v2) {
            sleep(1); // 子进程执行的逻辑
        }
        $childEnd = time();
        $childDiff = $childEnd - $childStart;
        echo "#" . posix_getpid() . "执行完毕，用时：" . $childDiff . "秒" . PHP_EOL;
        exit(); // 子进程执行完后必须退出，否则会循环的创建进程...
    }
}

//这里挂起主进程，等待子进程全部退出后再退出主进程
while ($processNum > 0) {
    if ( pcntl_wait($status) > 0) {
        $processNum--;
        echo "#" . $pid . "退出" . PHP_EOL;
    }
}

$timeEnd = time();
$diff = $timeEnd - $timeStart;
echo '共计用时：' . $diff . '秒';
