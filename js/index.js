//块级作用域，声明变量只在这里起作用
// 关键词轮换
{
    //1.获取搜索框对象
    let input = document.querySelector('.search input');

    //2.设置关键词数组
    const keyWords = ['Vue3.0', 'React', '爬虫技术', 'Java','多线程'];

    //setInterval 每两秒切换关键词，就是切换input的placeholder值
    let i = 0;
    input.placeholder = keyWords[0];
    setInterval(() => {
        i ++;
        if (i == 5) {
            i = 0;
        }
       input.placeholder =  keyWords[i];
    }, 2000);
}

// 轮播图
{
    //声明轮播图数组
    const swiperImgList = [
        {
            path:'./images/swiper/swiper-1.jpg',
            url:'https://coding.imooc.com/class/474.html',
            bg:'./images/swiper/bj-0.jpg'
        },
        {
            path:'./images/swiper/swiper-2.jpg',
            url:'https://coding.imooc.com/class/490.html',
            bg:'./images/swiper/bj-1.jpg'
        },
        {
            path:'./images/swiper/swiper-3.jpg',
            url:'https://coding.imooc.com/class/482.html',
            bg:'./images/swiper/bj-2.jpg'
        },
        {
            path:'./images/swiper/swiper-4.jpg',
            url:'https://coding.imooc.com/class/494.html',
            bg:'./images/swiper/bj-3.jpg'
        }
    ];

    //获取切换按钮
    const rightArrow = document.querySelector('.arrow-r');
    const leftArrow = document.querySelector('.arrow-l');
    //获取a标签对象
    const swiperA = document.querySelector('.swiper a');
    //获取最外层通栏的div对象
    const banner = document.querySelector('#banner');
    //获取所有的切换圆点
    const lis = document.querySelectorAll('.circle-list li')
    //定义自动轮播的计时器
    let timer = null;


    //控制数组索引
    let i = 0;
    function changeImg(index) {
        swiperA.style.backgroundImage = `url(${swiperImgList[index].path})`;
        swiperA.href = swiperImgList[index].url;
        banner.style.backgroundImage = `url(${swiperImgList[index].bg})`;
        
        currentCircle(index);
    }

    changeImg(i);

    //设置是否允许点击事件的标志位
    //true则允许执行点击事件，false则不允许执行
    let flag = true;


    rightArrow.onclick = function () {
        if(flag == false) {
            return;
        }
        flag = false;

        i ++;
        if (i == 4) {
            i = 0;
        }
        changeImg(i);
        setTimeout(() => {
            flag = true;
        },1000);

    }

    leftArrow.onclick = function () {
        if(flag == false) {
            return;
        }
        flag = false;
        i--;
        if(i == -1) {
            i = 3;
        }

        changeImg(i);
        setTimeout(() => {
            flag = true;
        },1000);
    }

    function currentCircle (index) {
        for(let i = 0; i < lis.length; i++) {
            lis[i].className = '';
            lis[index].className = 'current';
        }
    }

    //循环注册圆点点击时间
    for(let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            if(flag == false) {
                return;
            }
            flag = false;

            changeImg(i);
            setTimeout(() => {
                flag = true;
            },1000);
        }
    }


    //自动轮播
    timer = setInterval(()=> {
        i++;
        if(i == 4) {
            i = 0;
        }
        changeImg(i);
    },3000);

    swiperA.onmouseenter = function (){
        clearInterval(timer);
    }
    swiperA.onmouseleave = function (){
        timer = setInterval(()=> {
            i++;
            if(i == 4) {
                i = 0;
            }
            changeImg(i);
        },3000); 
    }

    leftArrow.onmouseenter = function (){
        clearInterval(timer);
    }

    rightArrow.onmouseenter = function (){
        clearInterval(timer);
    }






}

//倒计时
{
    //1.获取结束时间点的时间戳
    let endDate = new Date('2022-12-1 14:00:00');
    endDate = parseInt(endDate.getTime() / 1000);

    //获取时分秒的标签对象

    const hourDom = document.getElementById('hour');
    const minDom = document.getElementById('min');
    const secDom = document.getElementById('sec');
    let timer = null;

    function countDown () {
        let nowDate = new Date();
        // let nowDate = new Date('2022-12-06 12:35:00');
        nowDate = parseInt(nowDate.getTime() / 1000);
    
        //3.计算剩余的总秒数
        let seconds = endDate - nowDate;
        console.log(seconds);
    
        if(seconds >= 0) {
            let hours = parseInt(seconds / 3600);
            hours = hours > 9 ? hours : '0' +hours
            let mins = parseInt(seconds % 3600 / 60);
            mins = mins > 9 ? mins : '0' +mins;
            let secs = seconds % 3600 % 60;
            secs = secs > 9 ? secs : '0' + secs;
        
            // console.log(hours, mins, secs);
        
            hourDom.innerHTML = hours;
            minDom.innerHTML = mins;
            secDom.innerHTML = secs;
        }else {
            clearInterval(timer);
            hourDom.innerHTML = '00';
            minDom.innerHTML = '00';
            secDom.innerHTML = '00';
            document.querySelector('.countdown p').innerHTML = '拼团已结束';
        }
    }

    //在页面载入时先执行一下这个办法
    countDown();


    //2.获取当前时间点的时间戳

    timer = setInterval(() => {
        countDown();
        
    },1000);



}

//滚动课程
{
//用定时器调整ul位置
    const ul = document.querySelector('.ms-list ul');
    let leftPX = 0;
    let timer = null;

    timer = setInterval(() => {
        leftPX --;
        if (leftPX == -1920) {
            leftPX = 0;
        }
        ul.style.left = leftPX + 'px';
    },50);

    ul.onmouseenter = function () {
        clearInterval(timer);
    }

    ul.onmouseleave = function () {
        timer = setInterval(() => {
            leftPX --;
            if (leftPX == -1920) {
                leftPX = 0;
            }
            ul.style.left = leftPX + 'px';
        },50);
    }


}

//课程切换

{
    //获取所有的a标签
    const tabs = document.querySelectorAll('.title-pic a');
    const uls = document.querySelectorAll('.course ul');

    //循环为所有的tab栏绑定点击事件
    for (let i = 0; i<tabs.length; i++) {
        tabs[i].onclick = function () {
            //清除所有a标签和ul标签样式
            for(let j = 0; j < tabs.length; j++) {
                tabs[j].className = '';
                uls[j].className = '';
            }
            tabs[i].className = 'active';
            uls[i] .className = 'current';
        }
    }

}