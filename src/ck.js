function cookiesAllowed() {
   setCookie('checkCookie', 'test', 1);
   if (getCookie('checkCookie')) {
      deleteCookie('checkCookie');
      return true;
   }
   return false;
}

function setCookie(name, value, expiredays, path, domain, secure) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
  var curCookie = name + "=" + escape(value) +
      ((expiredays) ? "; expires=" + exdate.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function cookiesAllowed() {
   setCookie('checkCookie', 'test', 1);
   if (getCookie('checkCookie')) {
      deleteCookie('checkCookie');
      return true;
   }
   return false;
}

function deleteCookie( name, path, domain ) {
   if ( getCookie( name ) ) document.cookie = name + '=' +
      ( ( path ) ? ';path=' + path : '') +
      ( ( domain ) ? ';domain=' + domain : '' ) +
      ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

