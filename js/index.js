window.onload=function () {
    search();
    banner();
    downTime();
};
//根据高度调整搜索栏透明度
function search() {
    var searchBox=document.querySelector('.hm_header_box');
    var bannerBox=document.querySelector('.hm_banner');
    var h=bannerBox.offsetHeight;
    window.onscroll=function () {
        var top=document.body.scrollTop;
        var opacity=0;
        if (top<h){
            opacity=top/h*0.85;
        } else {
            opacity=0.85;
        }
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    };
};
//滚动bannar
function banner(){
    var banner=document.querySelector('.hm_banner');
    var w=banner.offsetWidth;
    var imageBox=banner.querySelector('ul:first-child');
    var pointBox=banner.querySelector('ul:last-child');
    var points=pointBox.querySelectorAll('li');
    //添加过度
    var addTransition=function(){
        imageBox.style.webkitTransition="all .2s";
        imageBox.style.transition="all .2s";
    };
    //删除过度
    var removeTransition=function () {
        imageBox.style.webkitTransition="none";
        imageBox.style.transition="none";
    }
    //改变位子
    var setTranslateX=function (translateX) {
        imageBox.style.webkitTransform="translateX("+translateX+"px)";
        imageBox.style.transform="translateX("+translateX+"px)";
    };
    //自动滚动一秒一次
    var index=1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index*w);
    },1000);
    //加入过度事件
    itcast.transitionEnd(imageBox,function () {
/*        console.log('transitionEnd');*/
        if (index >= 9){
            index=1;
            removeTransition();
            setTranslateX(-index*w);
        } else if(index<=0){
            index=8;
            removeTransition();
            setTranslateX(-index*w);
        }
        setPoint();
    });
    //点的滚动
    var setPoint=function () {
        for (var i=0; i<points.length;i++){
            points[i].className="";
        }
        points[index-1].className="now";
    }
    //图片滑动
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;

    imageBox.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startX=e.touches[0].clientX;
    });
    //滑动距离
    imageBox.addEventListener('touchmove',function (e) {
        isMove=true;
        moveX=e.touches[0].clientX;
        distanceX=moveX-startX;
        var currX=-index*w+distanceX;
        removeTransition();
        setTranslateX(currX);
    });
    //判断是否翻页
    imageBox.addEventListener('touchend',function (e) {
        if(isMove && (Math.abs(distanceX)>w/3)){
            if(distanceX>0){
                index--;
            }else {
                index++;
            }
            addTransition();
            setTranslateX(-index*w);
        }
        //添加回定时器
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index*w);
        },1000);
    });
}
//倒计时
function downTime() {
    var time=5*60*60;
    var timer=null;
    var skTime=document.querySelector('.sk_time');
    var spans=skTime.querySelectorAll('span');
    timer=setInterval(function () {
        if (time<0){
            clearInterval(timer);
            return false;
        }
        time--;
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=time%60;
        console.log(h+':'+m+':'+s);
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000);
}