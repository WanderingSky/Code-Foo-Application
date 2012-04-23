<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>License Plate Generator</title>
    <link rel="stylesheet" type="text/css" href="licenseplategenerator-style.css"> 
    <script type="text/javascript" src="licenseplategenerator-ajax.js"></script>
</head>

<body>

<div id="input_block" class="block">
	<span id="input_label" class="label">Population Size:</span>
	<input type="text" name="num_input" id="num_input" value="Population Size" style="color:#333" onclick="clearNumInput()" onchange="checkIsNumber()"/>
    <input type="button" name="generate" id="generate" value="Generate Pattern" onclick="generatePattern()"/>
</div>

<div id="output_block" class="block">
    <div id="pattern" class="info"><span id="pattern_label" class="label">Best Pattern:</span> <span id="num_numbers">0 Numbers</span> and <span id="num_letters">0 Letters</span></div>
    <div id="total_plates" class="info"><span id="total_plates_label" class="label">Total Plates:</span> 0</div>
    <div id="excess_plates" class="info"><span id="excess_plates_label" class="label">Excess Plates:</span> 0</div>
</div>

</body>
</html>