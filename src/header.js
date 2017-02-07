if (window!=top) top.location.href = location.href;

var expDays = 30;
var exp = new Date(); 
exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

function getTime()
{
var d = new Date();
return "Sydney: " + ShowTime(d) + ", GMT: " + GMTTime() + ", New York: " + NYTime();
}

function TimezoneOffset()
{
var ldNow = new Date();
var lnOffset = ldNow.getTimezoneOffset() / 60

lnOffset = -(lnOffset)
return(lnOffset);
}

function ShowTime(d)
{
  var s = "";
  var c = ":";
  var h, hr = "am";

  h = d.getHours();
  if (h == 12) { hr = "pm"; }
  if (h > 12) { h -= 12; hr = "pm"; }
  s += (h < 10) ? '0' : '';
  s += h + c;
  s += (d.getMinutes() < 10) ? '0' :'';
  s += d.getMinutes() + c;
  s += (d.getSeconds() < 10) ? '0' :'';
  s += d.getSeconds()  + " " + hr;
  return(s);
}

function GMTTime()
{
  var d, s = "";
  d = new Date();
  d.setHours(d.getHours() - TimezoneOffset());
  return ShowTime(d);
}

function NYTime()
{
  var d, s = "";
  d = new Date();
  d.setHours(d.getHours() - TimezoneOffset() - 5);
  return ShowTime(d);
}

function SearchAndReplace( str, from, to ) {
    var idx = str.indexOf( from );

    while ( idx > -1 ) {
        str = str.replace( from, to ); 
        idx = str.indexOf( from );
    }

    return str;
}

function dzOpen(sUrl)     { window.open(sUrl, "_blank", ""); }
function dzOpenSrch(sUrl, sAfter) { 
sAfter = (sAfter === undefined) ? '' : sAfter;   
window.open(sUrl + Search.q.value + sAfter, "_blank", ""); 
}
function dzOpenSrchC(sUrl, sAfter){
sAfter = (sAfter === undefined) ? '' : sAfter;   
 window.open(sUrl + SearchAndReplace(Search.q.value, " ", "-") + sAfter, "_blank", "");
 }
function writemail()      { document.location = "mailto:WebsiteVisitor@DavidZammit.com"; }

function loadpic(sFileUrl, sID) { 
	
 }
