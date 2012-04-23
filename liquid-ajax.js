// JavaScript Document

// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject(); 

// retrieves the XMLHttpRequest object
function createXmlHttpRequestObject() 
{	
  // will store the reference to the XMLHttpRequest object
  var xmlHttp;
  // if running Internet Explorer
  if(window.ActiveXObject)
  {
    try
    {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (e) 
    {
      xmlHttp = false;
    }
  }
  // if running Mozilla or other browsers
  else
  {
    try 
    {
      xmlHttp = new XMLHttpRequest();
    }
    catch (e) 
    {
      xmlHttp = false;
    }
  }
  // return the created object or display an error message
  if (!xmlHttp)
 
    alert("Error creating the XMLHttpRequest object.");
  else 
    return xmlHttp;
}

function display(idToInsert) {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			str = xmlHttp.responseText;
			document.getElementById(idToInsert).innerHTML = str;
		} else {
			alert('FROM DISPLAY: There was a problem with the request.');
		}
	}
}

// BEGIN: Liquid -Specific functions

function initDynamicStuff() {
	
	changeLogo();
	clock();
	getRSSFeed();
	
}

function changeLogo() {
	if (screen.width==1024 && screen.height==768) {
		document.getElementById("logo").style.backgroundImage = "url(logo.png)";
		document.getElementById("logo").style.width = "170px";
		document.getElementById("logo").style.height = "100px";
		document.getElementById("menu").style.marginTop = "10px";
		document.getElementById("menu").style.marginBottom = "10px";
		document.getElementById("menu").style.marginLeft = "19%";
		document.getElementById("refresh").style.cssFloat = "right";
		document.getElementById("refresh").style.marginRight = "5px";
		document.getElementsByClassName("rss_note")[0].cssFloat = "right";
		document.getElementsByClassName("rss_note")[1].cssFloat = "right";
	} else {
		document.getElementById("logo").style.backgroundImage = "url(logo.png)";
		document.getElementById("logo").style.width = "300px";
		document.getElementById("logo").style.height = "100px";
		document.getElementById("menu").style.marginTop = "30px";
		document.getElementById("menu").style.marginBottom = "15px";
		document.getElementById("menu").style.marginLeft = "20%";
		document.getElementById("refresh").style.cssFloat = "none";
		document.getElementById("refresh").style.marginRight = "0px";
		document.getElementsByClassName("rss_note")[0].cssFloat = "none";
		document.getElementsByClassName("rss_note")[1].cssFloat = "none";
	}
	
}

function clock() {
	var today=new Date();
	var month=today.getMonth();
	var day=today.getDate();
	var hour=today.getHours();
	var minutes=today.getMinutes();
	var seconds=today.getSeconds();
	var notation="a.m."
	
	if(hour == 0) {
		hour = 12;
	} else if(hour > 12) {
		hour = hour % 12;
		notation="p.m."
	}
	month=findMonth(month);
	minutes=addZeroes(minutes);
	seconds=addZeroes(seconds);
	document.getElementById('time').innerHTML = month+" "+day+", "+hour+":"+minutes+":"+seconds+" "+notation;
	t=setTimeout('clock()',500);
}

function findMonth(month) {
	switch(month) {
		case 0:
			month = "January";
			break;
		case 1:
			month = "February";
			break;
		case 2:
			month = "March";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "June";
			break;
		case 6:
			month = "July";
			break;
		case 7:
			month = "August";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "October";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "December";
			break;
	}
	return month;	
}

function addZeroes(value) {
	if (value<10) {
		value="0" + value;
	}
	return value;
}

function getRSSFeed() {
	
	var url = "http://feeds.ign.com/ignfeeds/games/";
	
	xmlHttp.onreadystatechange = function() { display("rss_feed") };
	xmlHttp.open('GET', 'getFeed.php?url=' + url, false);
	xmlHttp.send('');
	
	// set 1 minute timeout till next auto-refresh
	t=setTimeout('getRSSFeed()',60000);
	
}

var saveOldTop = 0;

function preview(index) {
	
	var popup = "popup" + index;
	var title = "title" + index;
	var desc = "desc" + index;
	var rssLink = "rss_link" + index;
	
	saveOldTop = document.getElementById(popup).offsetTop;
	
	
	document.getElementById(popup).style.position = "absolute";
	document.getElementById(popup).style.left = (document.getElementById("mid_left").offsetWidth+(screen.availWidth*0.01))+"px";
	
	var newTop = (document.getElementById(popup).offsetTop - document.getElementById(rssLink).offsetHeight);
	var popupHeight = document.getElementById(popup).offsetHeight;
	var bottomOffset = 10;
	if(popupHeight >= (window.innerHeight+window.pageYOffset-newTop)) {
		newTop = (window.innerHeight+window.pageYOffset-popupHeight-bottomOffset);
	}
	document.getElementById(popup).style.top = newTop+"px";
	
}

function resetpreview(index) {
	
	var popup = "popup" + index;
	var title = "title" + index;
	var desc = "desc" + index;
	
	document.getElementById(popup).style.position = "fixed";
	document.getElementById(popup).style.left = "-999em";
	document.getElementById(popup).style.top = saveOldTop+"px";
	
}