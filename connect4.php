<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Connect 4</title>
    <link id="css" rel="stylesheet" type="text/css" href="connect4-style.css"> 
    <script type="text/javascript" src="connect4-ajax.js"></script>
</head>

<body>

<div id="play_area" onmousemove="detectAction()">

<div id="title">Connect4! <span id="title_note">*[Works best in Firefox/Chrome]</span></div>

<div id="mouse_position">X: 0, Y:0</div>

<div id="leaderboard">
    <div id="leaderboard_title">Score Board<span class="wins">W</span><span class="losses">L</span><span class="draws">D</span></div>
    <div id="player1_stats"><span id="player1" class="player">Player 1 (Human)</span><span class="wins">0</span><span class="losses">0</span><span class="draws">0</span></div>
    <div id="player2_stats"><span id="player2" class="player">Player 2 (CPU)</span><span class="wins">0</span><span class="losses">0</span><span class="draws">0</span></div>
</div>

<!--div class="black_circle"></div-->
<div id="play_piece" class="white_circle"></div>

<div id="board">

	<?php
    
    $row=6;
    $col=7;
    
    for($i=($row-1); $i>=0; $i--) {
        echo "<div id='row".$i."' class='row'>";
        for($k=0; $k<$col; $k++) {
            $square = "<div id='x".$k."y".$i."' class='square";
			if($i == 0) {
				$square .= " bottom_most_row";
			}
			if($k == 0) {
				$square .= " left_most_col";
			}
			$square .= "'>";
			//$square .= "X: ".$k.", Y: ".$i;
			$square .= "</div>";
            
            echo $square;
        }
        echo "</div>";
    }
    
    ?>    
    
</div>

<input type="button" id="new_game" value="New Game" onmouseover="doNotDetectAction()" onmouseout="removeLockout()" onclick="newGame()" />

<div id="choose_color" onmouseover="doNotDetectAction()" onmouseout="removeLockout()">
	<div id="white_selected" onclick="chooseColor(1)">White</div>
    <div id="black" onclick="chooseColor(2)">Black</div>
</div>
<span id="choose_color_title">Choose a Color Before Beginning</span>

<div id="dialog_box" onmouseover="doNotDetectAction()" onmouseout="removeLockout()">
	<div id="dialogue">
    	<div id="note">Select a color to start the game!</div>
    	<input type="button" id="ok" value="OK" onclick="closeDialogBox()" />
	</div>
</div>

<div id="instructions">
<div id="instruction_title">Instructions</div>
<div class="rule"><div class="rule_num">1.</div><div class="rule_text">Select a <span class="highlight">Color</span> before beginning play. <br />* <span class="highlight">White Player</span> plays the first move.</div></div>
<div class="rule"><div class="rule_num">2.</div><div class="rule_text">Move your cursor to the column you wish to play in. <br /><span class="highlight">Left-Click</span> to play your move.</div></div>
<div class="rule"><div class="rule_num">3.</div><div class="rule_text"><span class="highlight">Connect 4</span> pieces of your color to win!</div></div>
<div class="rule"><div class="rule_num">4.</div><div class="rule_text">Click on the <span class="highlight">'New Game'</span> button to start a new game.<br /> You can do this at any time.</div></div>
</div>

</div>

<div id="calculations" onmouseover="doNotDetectAction()" onmouseout="removeLockout()"><div id="calc_title">AI Calculations</div></div>

</body>
</html>