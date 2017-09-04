
  //1. 找对象
  var box=document.querySelector(".all");
  var screen = document.querySelector(".screen");
  var ul = screen.children[0];
  var ullis = ul.children;
  var ol = screen.children[1];
  var arr = document.querySelector("#arr");
  var leftArr = arr.querySelector(".left");
  var rightArr=arr.querySelector(".right");
  var imgwidth=screen.offsetWidth;

  var pic=fk=0;
  var timer;
  //2. 动态创建结构
  //2.1 创建小方块,ulLis
  //根据ul中li的个数创建小方块
  for(var i = 0;i < ullis.length;i++){
    var li = document.createElement("li");
    ol.appendChild(li);
    li.innerHTML = i+1;
  }
  var ollis=ol.children;
  ollis[0].className="current";

  //2.2 创建假图片
  //2.2.1 克隆ul下的第一个li
  var cloneli = ullis[0].cloneNode(true);
  ul.appendChild(cloneli);
  //3. 简单轮播功能
  //3.1 给小方块注册点击事件
  for(var i=0;i<ollis.length;i++){
    ollis[i].index=i;//存索引
    ollis[i].addEventListener("click", function(){
      //3.2 小方块高亮排他
      for(var i=0;i<ollis.length;i++){
        ollis[i].className="";
      }
      this.className="current";
      //3.3. 移动ul
      var target=-this.index*imgwidth;
      animate(ul,target);

      pic=fk=this.index;
    })
  }

  //4. 左右焦点功能（无缝）
  //4.1 鼠标经过盒子，显示箭头
  box.onmouseover=function(){
    arr.style.display="block";
    //清除定时器
    clearInterval(timer);
  }
  //4.2 鼠标离开盒子，隐藏箭头
  box.onmouseleave=function(){
    arr.style.display="none";
    timer=setInterval(function(){
      rightArr.onclick();
    },1000)
  }
  //4.3 点击右箭头
  rightArr.onclick=function(){
    //如果已经到了最后一张假图片，让ul瞬移到第一张真图片
    if(pic==ollis.length){
      ul.style.left=0;
      pic=0;
    }
    pic++;//记录出去的图片张数

    fk++;
    if(fk==ollis.length){
      fk=0;
    }
    for(var i=0;i<ollis.length;i++){
      ollis[i].className="";
    }
    ollis[fk].className="current";
    var target=-pic*imgwidth;
    animate(ul,target);
  }
  //4.4 点击左箭头
  leftArr.onclick=function(){
    if(pic==0){
      ul.style.left=-(ullis.length-1)*imgwidth+"px";
      pic=ullis.length-1;
    }
    pic--;

    //同步小方块
    fk--;
    if(fk==-1){
      fk=ollis.length-1;
    }
    for(var i=0;i<ollis.length;i++){
      ollis[i].className="";
    }
    ollis[fk].className="current";
    var target=-pic*imgwidth;
    animate(ul,target);
  }
  //5. 自动播放的功能
  timer=setInterval(function(){
    rightArr.onclick();
  },1000)
  //6. 同步问题
  //6.1 点击右箭头,同步
  //6.2 点击左箭头，同步
  //6.3 点击小方块，同步
