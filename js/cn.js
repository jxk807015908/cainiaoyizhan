/**
 * Created by Administrator on 17-7-17.
 */
var oAdd=document.getElementById("addition");
var oShare=document.getElementById("share");
var oCnyz=document.getElementById("cnyz");
var oZc=document.getElementById("zc");
var oShelter=document.getElementById("model_window");
var oClose=document.getElementById("close");
var oReset=document.getElementById("reset");
var oUsername=document.getElementById("username");
var oPassword=document.getElementById("password");
var oUl=document.getElementById("slider");
var oLi=oUl.getElementsByTagName("li");
var oNext=document.getElementById("next");
var oPrev=document.getElementById("prev");

//分享菜单划出
window.onload=function ()
    {
    oShare.onmouseover=function ()
    {
        startMove(750);
    }
    oShare.onmouseout=function ()
    {
        startMove(960);
    }
}
var timer=null;
function startMove(iTarget)
{
    clearInterval(timer);
    timer=setInterval(function (){
        var iSpeed=0;
        if(oShare.offsetLeft<iTarget)
        {
            iSpeed=10;
        }
        else
        {
            iSpeed=-10;
        }
        if(oShare.offsetLeft==iTarget)
        {
            clearInterval(timer);
        }
        else
        {
            oShare.style.left=oShare.offsetLeft+iSpeed+'px';
        }
    }, 30);
}

//非模态登录窗口弹出
oZc.onclick=function(){
    oShelter.style.display="block";
};
oClose.onclick=function(){
    oShelter.style.display="none";
    oUsername.value="";
    oPassword.value="";
};
oReset.onclick=function(){
    oUsername.value="";
    oPassword.value="";
};

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}

//无缝滚动
function moveAll(el,old,iTarget){
    // 防止，你上一个动没有结束，又执行下一个动作
    clearInterval(el.timer);
    el.timer = setInterval(function(){
        var iSpeed = (iTarget - old)/10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(iTarget == old){
            clearInterval(el.timer);
        }
        else{
            old += iSpeed;
            el.style.left = old + 'px';
        }
    },30);
}
oUl.innerHTML+=oUl.innerHTML;
var length=parseInt(getStyle(oLi[0],"width"))+20;
console.log(length);
var inow=0;
oNext.onclick=function(){
    if(inow>=5) {
        inow=0;
        oUl.style.left=0;
    }
    moveAll(oUl,-inow*length,-(inow+1)*length);
    inow++
};
oPrev.onclick=function(){
    if(inow<=0) {
        inow=5;
        oUl.style.left="-"+5*length+"px";
    }
    moveAll(oUl,-inow*length,-(inow-1)*length);
    inow--;
};

//轮播（淡入淡出）
var fadetimer1=null;
var fadetimer2=null;
var oleftbutton=document.getElementById("leftbutton");
var orightbutton=document.getElementById("rightbutton");
var oshowpic=document.getElementById("showpic");
var oul=oshowpic.getElementsByTagName("ul")[0];
var oli=oul.getElementsByTagName("li");
var count=0;
function autoplay(){
    clearInterval(fadetimer1);
    fadetimer1=setInterval(function (){
            count++;
            if(count>=oli.length) count=0;
            show(count);
        },2000)
    }
autoplay();
function show(a){
    count=a;
    for(var i=0;i<oli.length;i++)
    {
        oli[i].style.opacity=0;
        oli[i].style.filter="alpha(opacity=0)";
    }
    clearInterval(fadetimer2);
    alpha=0;
    fadetimer2=setInterval(function(){
        alpha+=1;
        oli[a].style.opacity=alpha/100;
        oli[a].style.filter="alpha(opacity="+alpha+")";
        if(alpha>=100)
        {
            clearInterval(fadetimer2);
        }
    },10)
}
oleftbutton.onclick=function(){
    if(count<=0){
        count=oli.length;
    }
    clearInterval(fadetimer1);
    count--;
    show(count);
    autoplay();
};
orightbutton.onclick=function(){
    if(count>=oli.length-1){
        count=-1;
    }
    clearInterval(fadetimer1);
    count++;
    show(count);
    autoplay();
};