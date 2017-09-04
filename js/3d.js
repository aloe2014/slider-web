// 需求 点击按钮一次，就让长方体沿着X轴旋转90度（是基于上一次的角度累加或者累减）
var dbox = document.querySelector('.dbox');
var _ul = dbox.querySelectorAll('ul');
var _li = dbox.querySelectorAll('li');
var dbtn_wrap = document.querySelector('.dbtn_wrap');
var btns = dbtn_wrap.querySelectorAll('button');
// 声明一个信号量
var num = 0;
// 声明一个开关变量
var flag = true;
// 切割的思路其实是让四个图片拼成一个图片 ，并且让每一张图片都往左走一定的距离
// 当用户暴力点击的时候会出现过度执行不过来的BUG情况，需要函数节流。思路：是默认点击之后将开关关闭，在最后一个ul的过渡执行完毕之后再重新开启
/*transitionend 过渡执行完毕之后触发的事件*/
_ul[_ul.length -1].addEventListener('transitionend',function(){
  console.log(1);
  // 在过渡执行完毕之后重新打开开关
  flag = true;
})

for(var i = 0; i < btns.length; i++){
  btns[i].setAttribute('data-index', i);
  btns[i].addEventListener('click',function(){
    if(flag){
      flag = false;
      // 每次点击进行一次判断后在累加或者累减
      // 通过this去找到当前对象的自定义下标
      var index = this.dataset['index'];
      if(index == 1){
        num++;
      }else if(index == 0){
        num--;
      }
      // 给所有的UL添加翻转效果
      for(var i = 0; i < _ul.length; i++){
        _ul[i].style.transform = 'rotateX('+num*90+'deg)';
      }
    }
  })
}
