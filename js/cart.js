//动画弹框
window.onload=function () {
    var hmWin=document.querySelector('.hm_win');
    var hmWinbox=hmWin.querySelector('.hm_win_box');
    var deleteList=document.querySelectorAll('.deleteBox');
    var deleteBtn=null;
    for (var i=0;i<deleteList.length;i++){
        deleteList[i].onclick=function () {
            hmWin.style.display="block";
            deleteBtn=this;
            var up=deleteBtn.querySelector('.up');
            up.style.webkitTransition="all 1s";
            up.style.transition="all 1s";
            up.style.webkitTransformOrigin="0 5px";
            up.transformOrigin="0 5px";
            up.style.webkitTransform="rotate(-30deg) translateY(2px)";
            up.style.transform="rotate(-30deg) translateY(2px)";
        }
    }
    //点击取消按钮
    hmWinbox.querySelector('.cancel').onclick=function () {
        hmWin.style.display="none";
        hmWinbox.classList.remove('bounceInDown');
        if(deleteBtn){
            var up=deleteBtn.querySelector('.up');
            up.style.webkitTransform="none";
            up.transform="none";
        }
    };
};