//configure message .. must be minimum 6 characters long
message="(c) Copyright 2004 David Zammit.COM All rights reserved"
//animate text in NS6? (0 will turn it off)
ns6switch=1

var ns6=document.getElementById&&!document.all

quit=0;
mes=new Array();
mes[0]=-1;
mes[1]=-2;
mes[2]=-4;
mes[3]=-6;
mes[4]=-9;
mes[5]=-6;
mes[6]=-4;
mes[7]=-2;
mes[8]=-1;
bmp=9; // bump array size
num=0;
add=-1;
txt="";

function jump0()
{
  if (ns6&&!ns6switch){
    jump.innerHTML=message
    return
  }
  for(i=0; i != message.length;i++) {
    txt=txt+"<span style='position:relative;' id='n"+i+"'>"+message.charAt(i)+"</span>"
    };
  jump.innerHTML=txt;
  txt="";
  jump2();
}

function jump2()
{
txt="";
for(i=0;i != message.length;i++)
{
  if(i+num > -1 && i+num < bmp){
    txt=txt+"<span style='position:relative;top:"+mes[i+num]+"'>"+message.charAt(i)+"</span>"
  }
  else{
    txt=txt+"<span>"+message.charAt(i)+"</span>"
  }
}
jump.innerHTML=txt;
txt="";
if((num >= (-message.length)) && (num <= 0 + bmp)){
  num+=add;
  if (quit==0)
    setTimeout("jump2()",50)
}
else{
  add=-add;
  num+=add;
  if (quit==0)
    setTimeout("jump0()",1000)
}
}

if (document.all||document.getElementById){
  jump=(document.getElementById)? document.getElementById("jumpx") : document.all.jumpx;
  jump0();
}

