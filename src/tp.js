/*
 * date:	2002-10-11
 * info:	http://inspire.server101.com/js/tp/
 */

var tp = [];
var tpl = [];

function tpSet(i, c) {
  if (document.createElement) {
	var e = document.getElementById(i);
	var l = document.createElement('ul');
	var p = document.createElement('div');
	e.className = l.className = p.className = c;

	var a, j, t;
	for (j = 2; j < arguments.length; j++) {
		c = document.getElementById(t = arguments[j]);
		tp[t] = c.parentNode.removeChild(c);

		a = l.appendChild(document.createElement('li'));
		a.className = c.className;
		tpl[t] = a = a.appendChild(document.createElement('a'));
	//	a.setAttribute('href', '');
		a.onmouseover=a.onfocus=Function('tpShow(\''+i+'\', \''+t+'\');');
		//a.onclick=Function('tpShow(\''+i+'\', \''+t+'\');');
		//a.onfocus=Function('tpColor(\''+i+'\', \''+t+'\');');
		a.appendChild(document.createTextNode(c.getAttribute('title')));
	}

	p.appendChild(tp[arguments[2]]);
	tpl[arguments[2]].className = 'active';

	while (e.firstChild) e.removeChild(e.firstChild);
	e.appendChild(l);
	e.appendChild(p);
  }
}


function tpShow(e, p) {
	e = document.getElementById(e).lastChild;
	tpl[e.replaceChild(tp[p], e.firstChild).getAttribute('id')].className = null;
	tpl[p].className = 'active';
}

function tpColor(e, p) {
	e = document.getElementById(e).lastChild;
	e.setAttribute('href', '');
	//tpl[e.replaceChild(tp[p], e.firstChild).getAttribute('id')].className = null;
	//tpl[p].className = 'active';
}