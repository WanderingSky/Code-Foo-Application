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

// BEGIN: License Plate Generator-Specific functions

function clearNumInput() {

	if(document.getElementById("num_input").value == "Population Size" || document.getElementById("num_input").value == "Enter Valid Population Size") {
		document.getElementById("num_input").value = "";
	}
	document.getElementById("num_input").style.color = "#000";
	
}

function checkIsNumber() {
	
	var num_input = document.getElementById("num_input").value;
	
	if(!num_input.match("[0-9]+")) {
		document.getElementById("num_input").value = "Enter Valid Population Size";
		document.getElementById("num_input").style.color = "#F00";
	}
	
}

function generatePattern() {
	
	var num_input = document.getElementById("num_input").value;
	
	xmlHttp.onreadystatechange = function() { display("output_block") };
	xmlHttp.open('GET', 'generatedpattern.php?population_size=' + num_input, false);
	xmlHttp.send('');
	
	return (false);	
	
}