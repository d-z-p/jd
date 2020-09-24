window.itcast={};
itcast.transitionEnd=function (dom,callback) {
    if (dom && typeof dom==='object'){
        dom.addEventListener('webkitTransitionEnd',function () {
            callback && callback();
        });
        dom.addEventListener('transitionEnd',function (){
            callback && callback();
        });
    }
};
itcast.tap=function (dom,callback) {
    if(dom && typeof dom==='object'){
        var  isMove=false;
        var  startTime=0;
        dom.addEventListener('touchstart',function (e) {
            startTime=Date.now();
        });
        dom.addEventListener('touchmove',function (e) {
            isMove=true;
        });
        dom.addEventListener('touched',function (e) {
            if ((Date.now()-startTime)<150 && !isMove){
            callback&&callback(e);
        }
        isMove=false;
        startTime=0;
        })
    }
}