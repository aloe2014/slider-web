/**
 * Created by HUCC on 2016/12/11.
 */
//动画函数
function animate(element, target){
    if(element.timer) {
        //如果有值，说明已经开启过定时器
        clearInterval(element.timer);
    }
    element.timer = setInterval(function () {
        //leader = leader + step
        var leader = element.offsetLeft;
        var step = 30;
        if(target < leader) {
            step = -step;
        }

        
        //如果步数是9的话，永远都跑不到重点
        //如果到达终点的距离已经小于一步了，就不跑了，因为你再跑就过了。
        if(Math.abs(target-leader) >= Math.abs(step)) {
            leader = leader + step;
            element.style.left = leader + "px";
        }else {
            clearInterval(element.timer);
            //抱过去
            element.style.left = target + "px";
        }
    }, 15);
}