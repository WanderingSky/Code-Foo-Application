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

// BEGIN: Connect 4-Specific functions!

var freefall = false;
var defaultLeft = 0;
var defaultTop = 0;
var defaultsSet = false;
var white = "#FFF";
var black = "#000";
// This follows the row x col structure (Best for analyzing entire rows)
var board = [ 	[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]
			];
// This follows the col x row structure (Best for analyzing entire columns)
var cpu_board = [	[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0]
				];
var victory = false;
var draw = false;
// For the Scores: Index 0 = Wins, 1 = Losses, 2 = Draws
var p1Score = [0, 0, 0];
var p2Score = [0, 0, 0];
var lockoutActions = false;
// For P1 Color: 1 = White, 2 = Black
// White goes first
var color_empty = 0;
var color_white = 1;
var color_black = 2;
var p1Color = color_white;
var p2Color = color_black;
var p1ColorChosen = false;
var p1Turn = false;
var turnCounter = 1;

function detectAction(e) {
	
	document.onmousemove=detectPosition;
	document.onmousedown=dropCircle;
	
	if(!defaultsSet) {
		defaultLeft = document.getElementById("play_piece").offsetLeft;
		defaultTop = document.getElementById("play_piece").offsetTop;
		defaultsSet = true;
	}
	
	return false;
	
}

function doNotDetectAction() {
	
	lockoutActions = true;
	
	return false;
	
}

function removeLockout() {
	
	lockoutActions = false;
	
	return false;
	
}

function detectPosition(e) {
	
	var x = e.pageX;
	var y = e.pageY;
	
	document.getElementById("mouse_position").innerHTML = "X: " + x + ", Y: " + y;
	
	x -= (document.getElementById("play_piece").offsetWidth/2);
	x -= document.getElementById("play_area").offsetLeft;
	if(x < document.getElementById("x0y0").offsetLeft) {
		x = document.getElementById("x0y0").offsetLeft;
	}
	if(x > document.getElementById("x6y0").offsetLeft) {
		x = document.getElementById("x6y0").offsetLeft;
	}
	
	if(!freefall) {
		document.getElementById("play_piece").style.left = x+"px";
	}
	
}

function dropCircle(e) {
	
	if(!freefall && !victory && !draw && !lockoutActions && p1ColorChosen && p1Turn) {
		
		freefall = true;
	
		var x = e.pageX;
		var y = e.pageY;
		
		var col0 = document.getElementById("x0y0").offsetLeft;
		var col1 = document.getElementById("x1y0").offsetLeft;
		var col2 = document.getElementById("x2y0").offsetLeft;
		var col3 = document.getElementById("x3y0").offsetLeft;
		var col4 = document.getElementById("x4y0").offsetLeft;
		var col5 = document.getElementById("x5y0").offsetLeft;
		var col6 = document.getElementById("x6y0").offsetLeft;
		
		//x -= (document.getElementById("play_piece").offsetWidth/2);
		var marginLeft = 1;
		var marginTop = 1;
		
		x -= document.getElementById("play_area").offsetLeft;
		if(x < document.getElementById("x0y0").offsetLeft) {
			x = document.getElementById("x0y0").offsetLeft+marginLeft;
		}
		if(x > document.getElementById("x6y0").offsetLeft) {
			x = document.getElementById("x6y0").offsetLeft+marginLeft;
		}
		
		if(x >= col0 && x < col1) {
			doDrop(0);
		} else if(x >= col1 && x < col2) {
			doDrop(1);
		} else if(x >= col2 && x < col3) {
			doDrop(2);
		} else if(x >= col3 && x < col4) {
			doDrop(3);
		} else if(x >= col4 && x < col5) {
			doDrop(4);
		} else if(x >= col5 && x < col6) {
			doDrop(5);
		} else if(x >= col6) {
			doDrop(6);
		}
		
	}
	
}

function doDrop(col) {
	
	freefall = true;
	
	var marginLeft = 1;
	var marginTop = 1;
	if(col > 0) {
		marginLeft = -1;
		marginTop = -1;
	}
	var num_rows = 6;	// The total number of rows there are on the 7x6 Connect4 board
	var row=0;
	var lowestOpenSquareFound = false;
	
	do {
		if(document.getElementById("x"+col+"y"+row).innerHTML == "") {
			lowestOpenSquareFound = true;
		} else {
			row++;
		}
	} while(row<num_rows && !lowestOpenSquareFound);
	
	if(row == num_rows && !lowestOpenSquareFound) {
		alert("This Column is full! Try another one instead!");
		freefall = false;
	} else {
		var played_piece = document.getElementById("x"+col+"y"+row).innerHTML = "<div id='piece"+col+","+row+"' class='";
		var player = 0;
		if(document.getElementById("play_piece").style.backgroundColor == "rgb(255, 255, 255)" || document.getElementById("play_piece").style.backgroundColor == "") {
			played_piece += "white_circle";
			board[row][col] = color_white;
			cpu_board[col][row] = color_white;
			player = color_white;
		} else {
			played_piece += "black_circle";
			board[row][col] = color_black;
			cpu_board[col][row] = color_black;
			player = color_black;
		}
		played_piece += "' style='visibility:hidden; margin-left:0px; margin-top:0px;'></div>";
		
		checkVictoryConditions(row, col, player);
		
		var endX = document.getElementById("x"+col+"y"+row).offsetLeft+marginLeft;
		var endY = document.getElementById("x"+col+"y"+row).offsetTop+marginTop;
		var curveX = document.getElementById("x"+col+"y5").offsetLeft+marginLeft;
		var curveY = document.getElementById("x"+col+"y5").offsetTop+marginTop;
		
		var startX = document.getElementById("play_piece").offsetLeft;
		var startY = document.getElementById("play_piece").offsetTop;
		
		// This means we'll be calculating 50 points within the bezier curve created by these three points
		var interval = 1/30;
		var arcup = -document.getElementById("play_piece").offsetHeight;
		calcQuadraticBezierCurve(startX, startY, curveX, startY+arcup, curveX, curveY, endX, endY, 0, interval, true, row, col);
		//calcCubicBezierCurve(startX, startY, curveX, startY, curveX, curveY, endX, endY, 0, interval, true);		
		
		document.getElementById("x"+col+"y"+row).innerHTML = played_piece;		
		
		if(p1Turn) {
			p1MostRecentlyPlayedSquare = new Square(row, col);
		}
	}
	
}

function checkVictoryConditions(row, col, player) {
	
	//alert("Check for victories dangit!");
	
	// Check all the neighbors of the most recent move to see if that move won the game for the player
	var connected = 0;
	var endgame = false;
	
	var unplayedSquareFound = false;
	for(var i=0; i<6 && !unplayedSquareFound; i++) {
		for(var k=0; k<7 && !unplayedSquareFound; k++) {
			if(board[i][k] == color_empty) {
				unplayedSquareFound = true;
			}
		}
	}
	if(!unplayedSquareFound) {
		draw = true;
		endgame = true;
	}
	
	// Check horizontal connections
	for(var i=0; i<7 && connected < 4; i++) {
		if(board[row][i] == player) {
			connected++;
		} else {
			connected = 0;
		}
		if(connected == 4) {
			victory = true;
			endgame = true;
		}
	}
	
	connected=0;
	
	// Check vertical connections
	for(var i=0; i<6 && connected < 4; i++) {
		if(board[i][col] == player) {
			connected++;
		} else {
			connected = 0;
		}
		if(connected == 4) {
			victory = true;
			endgame = true;
		}
	}
	
	connected=0;
	
	// Check the ascending diagonal connections
	for(var i=0; i<7 && connected < 4; i++) {
		var curr_row = i-col+row;
		if(curr_row >= 0 && curr_row < 6) {
			if(board[curr_row][i] == player) {
				connected++;
			} else {
				connected = 0;
			}
		}
		if(connected == 4) {
			victory = true;
			endgame = true;
		}
	}
	
	connected=0;
	
	// Check the descending diagonal connections
	for(var i=0; i<7 && connected < 4; i++) {
		var curr_row = -(i-col)+row;
		if(curr_row >= 0 && curr_row < 6) {
			if(board[curr_row][i] == player) {
				connected++;
			} else {
				connected = 0;
			}
		}
		if(connected == 4) {
			victory = true;
			endgame = true;
		}
	}
	
	if(victory) {
		if(player == p1Color) {
			//alert("Hooray! You've won the game!");
			document.getElementById("dialog_box").style.left = "31px";
			document.getElementById("dialog_box").style.top = "-270px;";
			document.getElementById("note").innerHTML = "Hooray! You've won the game!<br><br>Press 'New Game' to play again!";			
			// Index 0 = Wins, 1 = Losses, 2 = Draws
			p1Score[0]++;
			p2Score[1]++;
		} else {
			//alert("Achievement Unlocked: 'I for one welcome our new robot overlords.'");
			document.getElementById("dialog_box").style.left = "31px";
			document.getElementById("dialog_box").style.top = "-270px;";
			document.getElementById("note").innerHTML = "<div id='achieve'>~Achievement Unlocked~</div>" 
															+ "<span id='achieve_text'>I for one welcome our new robot overlords.</span><br><br>Press 'New Game' to play again!";	
			// Index 0 = Wins, 1 = Losses, 2 = Draws
			p1Score[1]++;
			p2Score[0]++;
		}
	}
	if(draw) {
		//alert("The game is a draw! Come on, you can do better than that! Hit 'New Game' to try again!");
		document.getElementById("dialog_box").style.left = "31px";
		document.getElementById("dialog_box").style.top = "-270px;";
		document.getElementById("note").innerHTML = "The game is a draw! Come on, you can do better than that! Hit 'New Game' to try again!<br><br>Press 'New Game' to play again!";
		// Index 0 = Wins, 1 = Losses, 2 = Draws
		p1Score[2]++;
		p2Score[2]++;
	}
	
	var humanColor = "";
	var cpuColor = "";
	if(p1Color == color_white) {
		humanColor = "White (Human)";
		cpuColor = "Black (CPU)";
	} else {
		humanColor = "Black (Human)";
		cpuColor = "White (CPU)";
	}
	
	document.getElementById("player1_stats").innerHTML = "<span id='player1' class='player'>"+humanColor+"</span><span class='wins'>"+p1Score[0]+"</span><span class='losses'>"
															+p1Score[1]+"</span><span class='draws'>"+p1Score[2]+"</span>";
	document.getElementById("player2_stats").innerHTML = "<span id='player2' class='player'>"+cpuColor+"</span><span class='wins'>"+p2Score[0]+"</span><span class='losses'>"
															+p2Score[1]+"</span><span class='draws'>"+p2Score[2]+"</span>";
	
	return endgame;
	
}

function newGame() {
	
	victory = false;
	draw = false;
	p1ColorChosen = false;
	p1Turn = false;
	openingMovePlayed = false;
	turnCounter = 1;
	document.getElementById("play_piece").style.backgroundColor = "#FFF";
	document.getElementById("choose_color_title").innerHTML = "Choose a Color Before Beginning";
	document.getElementById("player1").innerHTML = "Player 1 (Human)";
	document.getElementById("player2").innerHTML = "Player 2 (CPU)";
	document.getElementById("dialog_box").style.left = "31px";
	document.getElementById("dialog_box").style.top = "-270px;";
	document.getElementById("note").innerHTML = "Select a color to start the game!";
	document.getElementById("calculations").innerHTML = "<div id='calc_title'>AI Calculations</div>";		
	
	for(var i=0; i<6; i++) {
		for(var k=0; k<7; k++) {
			board[i][k] = color_empty;
			cpu_board[k][i] = color_empty;
		}
	}
	
	xmlHttp.onreadystatechange = function() { display("board") };
	xmlHttp.open('GET', 'newboard.php?row=' + 6 + '&col=' + 7, false);
	xmlHttp.send('');
	
}

function chooseColor(whiteOrBlack) {
	
	if(!p1ColorChosen) {
		
		closeDialogBox();
	
		switch(whiteOrBlack) {
			case color_white:
				p1Color = color_white;
				p2Color = color_black;
				p1ColorChosen = true;
				p1Turn = true;
				document.getElementById("player1").innerHTML = "White (Human)";
				document.getElementById("player2").innerHTML = "Black (CPU)";
				document.getElementById("choose_color_title").innerHTML = "Color Set";
				document.getElementById("white").id = "white_selected";
				document.getElementById("black_selected").id = "black";
				//alert(document.getElementById("white_selected").innerHTML);
				break;
			case color_black:
				p1Color = color_black;
				p2Color = color_white;
				p1ColorChosen = true;
				p1Turn = false;
				document.getElementById("player1").innerHTML = "Black (Human)";
				document.getElementById("player2").innerHTML = "White (CPU)";
				document.getElementById("choose_color_title").innerHTML = "Color Set";
				if(document.getElementById("black") != null) {
					document.getElementById("black").id = "black_selected";
				}
				if(document.getElementById("white_selected") != null) {
					document.getElementById("white_selected").id = "white";
				}
				//alert(document.getElementById("black_selected").innerHTML);
				
				aiMove();
				break;
			default:
				alert("Invalid Color Choice Made! =(");
				break;
		}
		
	}
	
}

function closeDialogBox() {
	
	document.getElementById("dialog_box").style.left = "-999em";
	
}

// Decides who is playing next, the Human (P1) or the CPU (P2) based off of whether or not the Human is going
function nextTurn() {
	
	if(!victory && !draw) {
		p1Turn = !p1Turn;
		turnCounter++;
		if(!p1Turn) {
			//alert("AI Time?");
			aiMove();
		}
	}
	
}

// A modified function for calculating Quadratic Bezier Curves... To make the initial curve smoother (and clip less with the borders of the squares, thought it is STILL imperfect..)
// I have it calculate the first curve (Which is always terminated at the topmost square in the column the played piece is being dropped into). Once the piece reaches the top square, 
// I then immediately calculate the linear drop to the lowest open square in the column
function calcQuadraticBezierCurve(startX, startY, curveX, curveY, curveEndX, curveEndY, endX, endY, turn, interval, curve, row, col) {
	
	//alert(startX + " " + startY + " " + curveX + " " + curveY + " " + curveEndX + " " + curveEndY + " " + endX + " " + endY);
	
	if(curve) {
		var pointX = (Math.pow((1-turn), 2)*startX) + (2*(1-turn)*turn*curveX) + (Math.pow(turn, 2)*curveEndX);
		var pointY = (Math.pow((1-turn), 2)*startY) + (2*(1-turn)*turn*curveY) + (Math.pow(turn, 2)*curveEndY);
	} else {
		var pointX = (Math.pow((1-turn), 2)*curveEndX) + (2*(1-turn)*turn*endX) + (Math.pow(turn, 2)*endX);
		var pointY = (Math.pow((1-turn), 2)*curveEndY) + (2*(1-turn)*turn*curveEndY) + (Math.pow(turn, 2)*endY);
	}
	
	//alert(pointX + " " + pointY);
	
	document.getElementById("play_piece").style.left = pointX+"px";
	document.getElementById("play_piece").style.top = pointY+"px";
	
	if(turn<1) {
		if((turn+interval)>1) {
			setTimeout("calcQuadraticBezierCurve("+startX+", "+startY+", "+curveX+", "+curveY+", "+curveEndX+", "+curveEndY+", "
													+endX+", "+endY+", "+1+", "+interval+", "+curve+", "+row+", "+col+")", 20);
		} else {
			setTimeout("calcQuadraticBezierCurve("+startX+", "+startY+", "+curveX+", "+curveY+", "+curveEndX+", "+curveEndY+", "
													+endX+", "+endY+", "+(turn+interval)+", "+interval+", "+curve+", "+row+", "+col+")", 20);
		}
	} else {
		if(!curve) {
			freefall = false;
			//alert("X: " + col + " Y: " + row);
			document.getElementById("piece"+col+","+row).style.visibility = "visible";
			//alert(defaultLeft + " " + defaultTop);
			document.getElementById("play_piece").style.left = defaultLeft+"px";
			document.getElementById("play_piece").style.top = defaultTop+"px";
			//alert(document.getElementById("play_piece").style.backgroundColor);
			if(document.getElementById("play_piece").style.backgroundColor == "rgb(255, 255, 255)" || document.getElementById("play_piece").style.backgroundColor == "") {
				document.getElementById("play_piece").style.backgroundColor = black;
			} else {
				document.getElementById("play_piece").style.backgroundColor = white;
			}
			//alert(document.getElementById("play_piece").style.left + " " + document.getElementById("play_piece").style.top);
			
			// Play the next turn, either having the AI calculate a move, or allow the player to choose a move
			// This has to be called inside the bezier curve, because this is the only way I knew of to ensure that the animation was completed 
			// before the AI/Human Player attempted to make a move
			nextTurn();
		} else {
			var timeToWait = 20;
			if(curve) {
				timeToWait = 0;	
			}
			curve = false;
			setTimeout("calcQuadraticBezierCurve("+startX+", "+startY+", "+curveX+", "+curveY+", "+curveEndX+", "+curveEndY+", "+endX+", "+endY+", "+0+", "+interval+", "+curve
						+", "+row+", "+col+")", timeToWait);
		}
	}
	
}

function calcCubicBezierCurve(startX, startY, curveX, curveY, curveEndX, curveEndY, endX, endY, turn, interval) {
	
	var pointX = (Math.pow((1-turn), 3)*startX) + (3*Math.pow((1-turn),2)*turn*curveX) + (3*(1-turn)*Math.pow(turn, 2)*curveEndX) + (Math.pow(turn, 3)*endX);
	var pointY = (Math.pow((1-turn), 3)*startY) + (3*Math.pow((1-turn),2)*turn*curveY) + (3*(1-turn)*Math.pow(turn, 2)*curveEndY) + (Math.pow(turn, 3)*endY);
	
	document.getElementById("play_piece").style.left = pointX+"px";
	document.getElementById("play_piece").style.top = pointY+"px";
	
	if(turn<1) {
		if((turn+interval)>1) {
			setTimeout("calcCubicBezierCurve("+startX+", "+startY+", "+curveX+", "+curveY+", "+curveEndX+", "+curveEndY+", "+endX+", "+endY+", "+1+", "+interval+")", 20);
		} else {
			setTimeout("calcCubicBezierCurve("+startX+", "+startY+", "+curveX+", "+curveY+", "+curveEndX+", "+curveEndY+", "+endX+", "+endY+", "+(turn+interval)+", "+interval+")", 20);
		}
	} else {
		freefall = false;
	}
	
}

// ****************************************
// BEGIN: AI routines
// ****************************************

// The array for the Directly Playable Squares follows a Col x Row structure
function findDirectlyPlayableSquares() {
	
	// Stores the row of the directly playable square in the 7 columns of the standard Connect4 board
	var directlyPlayableSquares = [-1, -1, -1, -1, -1, -1, -1];
	
	// i = col, k = row
	for(var i=0; i<7; i++) {
		for(var k=0; k<6; k++) {
			if(cpu_board[i][k] == color_empty && directlyPlayableSquares[i] == -1) {
				directlyPlayableSquares[i] = k;
			}
		}
	}
	
	return directlyPlayableSquares;
	
}

// GENERAL NOTE: We always evaluate the board on the CPU's turn, looking at all the directlyPlayableSquares and calculating each square's 'potential' in leading the AI to victory
// The AI wants to maximize the #routes to victory (+) AND minimize the #routes to defeat (-), while also factoring in weights for moves that block threat pairs/triples from
// the opponent and/or create pairs/triples that lead toward victory. A move that will end the game takes absolute priority.
// EXTRA NOTE: The weights were assigned based on how high of a priority it was to address the given problem. Threats with multiple squares already claimed are generally more important than
// ones with fewer. Creating or blocking triples was a high priority. Winning supercedes everything. Losing comes a close second in importance.
// The actual values were assigned based on my personal feelings on how much 'more' important one class of problems was over the other, and the special rules were designed to circumvent
// these tiered priorities in specific cases where the general rule fails and leads the way to defeat.
// I actually came up with the special rules only after playing the AI myself for a while and figuring out certain strategies where the AI would always fail to resolve a threat.
// At this point in the evaluation function's development, I find it hard to force my way to victory, though I admit my skill in the game is little better than casual/beginner-level.
// Though imperfect, I think the current AI is strong enough to provide a healthy dose of challenge to even seasoned players of the game.
// EXTRA EXTRA NOTE: It is possible in the future to extensively improve the winning ability of the computer by having it search deeper into the search tree to project forward into time to
// see what the Victory Point totals would be like over a greater span of moves instead of stopping after a depth 5 analysis. However, the time it takes to calculate each stage after the
// 5th one rises exponentially, and with some testing on the 7th level analysis, I found that the browser freezes up and attempts to stop the script because it has determined that
// the javascript code is taking too long (on Firefox). Thus, I settled for only a 5-turn look ahead at this time.
var totalStages = 5;
function evaluateBoard() {
	
	//alert("Begin Evaluation!");
	
	// Gonna have the AI project moves 7 stages into the future (including the move it is about to make) in order to decide which move is the best to make
	var bestMove = multiStageEval(totalStages);	
	
	//alert("Best Move Got: Column #" + bestMove); 
	
	return bestMove;
	
}

function multiStageEval(stage) {
	
	allGroups = new Array();
	findAllGroups();
	
	var directlyPlayableSquares = new Array();
	directlyPlayableSquares = findDirectlyPlayableSquares();
	
	//document.getElementById("calculations").innerHTML += "Column 7 Playable Square: " + directlyPlayableSquares[6] + "<br>";
	
	// An array to store all 7 sets of completable groups found for the directly playable squares
	var cgs = new Array();
	var oCGs = new Array();
	
	for(var i=0; i<directlyPlayableSquares.length; i++) {
		if(directlyPlayableSquares[i] != -1) {
			if((stage%2) == 0) {
				// Even Stages are the Human's color (P1Color)
				cgs[i] = findAllCompletableGroupsThatContainSquare(new Square(directlyPlayableSquares[i], i), p1Color, p2Color);
				oCGs[i] = findAllOpponentCompletableGroupsAfterPlayingSquare(new Square(directlyPlayableSquares[i], i), p2Color, p1Color);
			} else {
				// Odd Stages are the CPU's color (P2Color)
				cgs[i] = findAllCompletableGroupsThatContainSquare(new Square(directlyPlayableSquares[i], i), p2Color, p1Color);
				oCGs[i] = findAllOpponentCompletableGroupsAfterPlayingSquare(new Square(directlyPlayableSquares[i], i), p1Color, p2Color);
			}
		} else {
			cgs[i] = new Array();
			oCGs[i] = new Array();
		}
	}
	
	//alert("Completable Groups Found!");
	
	var mostVP = 0;
	var bestMove = 0;
	var moveScores = new Array();
	var bestMoveInit = false;
	
	if(stage == 1) {
		// Last Stage is always the AI's turn
		for(var i=0; i<cgs.length; i++) {
			//document.getElementById("calculations").innerHTML += "Column #" + i + "<br>";
			if(directlyPlayableSquares[i] != -1) {
				var curr_VP = calcVictoryPoints(cgs[i], oCGs[i], i, p2Color, p1Color);
				moveScores[i] = curr_VP;
				if(!bestMoveInit) {
					mostVP = curr_VP;
					bestMove = i;
					bestMoveInit = true;
				} else {
					if(curr_VP > mostVP) {
						mostVP = curr_VP;
						bestMove = i;
					} else if(curr_VP == mostVP) {
						// If both moves are equally good, make a coin flip to see which one gets played, adds a bit of randomness to the AI's rather discrete playing style
						// Although, this sometimes leads the AI to make a sub-par move due to quirks of calculation. A little bit of randomness makes things more interesting though!
						var coinFlip = Math.floor(Math.random()*2);
						switch(coinFlip) {
							case 0:
								// Keep the current mostVP and bestMove~
								break;
							case 1:
								mostVP = curr_VP;
								bestMove = i;
								break;
							default:
								alert("Not supposed to be able to flip anything other than 0 or 1!");
								break;
						}
					}
				}
			}
		}
		//document.getElementById("calculations").innerHTML += "Stage 1 VP: " + mostVP + "<br>";
		
		/*playMove(directlyPlayableSquares[bestMove], bestMove, p2Color);
		var map = "";
		for(var r=5; r>=0; r--) {
			for(var c=0; c<7; c++) {
				map += board[r][c] + ", ";
			}
			map += "<br>";
		}
		undoMove(directlyPlayableSquares[bestMove], bestMove);		
		document.getElementById("calculations").innerHTML += "MAP FOR SHIZZLE <br>" + map;*/
		
		if(totalStages != 1) {
			return mostVP;
		}
	} else {
		for(var i=0; i<cgs.length; i++) {
			//document.getElementById("calculations").innerHTML += "Column #" + i + "<br>";
			if(directlyPlayableSquares[i] != -1) {
				var curr_VP = 0;
				
				alreadyWon = false;
				alreadyLost = false;
				
				if((stage%2) == 0) {
					// Even Turns are the Human's turn
					playMove(directlyPlayableSquares[i], i, p1Color);
					curr_VP = -(calcVictoryPoints(cgs[i], oCGs[i], i, p1Color, p2Color));
					//document.getElementById("calculations").innerHTML += "Stage " + stage + " VP (WIN? " + alreadyWon + " LOSE? " + alreadyLost + "): " + curr_VP + "<br>";
				} else {
					// Odd Turns are the CPU's turn
					playMove(directlyPlayableSquares[i], i, p2Color);
					curr_VP = calcVictoryPoints(cgs[i], oCGs[i], i, p2Color, p1Color);
					//document.getElementById("calculations").innerHTML += "Stage " + stage + " VP (WIN? " + alreadyWon + " LOSE? " + alreadyLost + "): " + curr_VP + "<br>";
				}
				
				/*var map = "";
				for(var r=5; r>=0; r--) {
					for(var c=0; c<7; c++) {
						map += board[r][c] + ", ";
					}
					map += "<br>";
				}
				
				document.getElementById("calculations").innerHTML += "MAP FOR SHIZZLE <br>" + map;*/
				
				// Early Victory/Loss Detection Bonus (So its absolute importance doesn't get eclipsed by longer-running searches in point-totals)
				if(alreadyWon || alreadyLost) {
					curr_VP *= stage;
				}
				
				if(((stage-1)%2) == 0  && !alreadyWon && !alreadyLost) {
					// If the next stage is even, we're simulating the opponent's moves in the NEXT multiStageEval, therefore their best value must be subtracted from our values
					curr_VP += multiStageEval(stage-1);
					//document.getElementById("calculations").innerHTML += "Stage " + stage + " Combo VP: " + curr_VP + "<br>";
				} else if(((stage-1)%2) == 1  && !alreadyWon && !alreadyLost) {
					// If the next stage is odd, we're simulating our future moves in the NEXT multiStageEval, so we add our best value to our values
					curr_VP += multiStageEval(stage-1);
					//document.getElementById("calculations").innerHTML += "Stage " + stage + " Combo VP: " + curr_VP + "<br>";
				}
				
				undoMove(directlyPlayableSquares[i], i);
				
				moveScores[i] = curr_VP;
				if(!bestMoveInit) {
					mostVP = curr_VP;
					bestMove = i;
					bestMoveInit = true;
				} else {
					// If it's our turn, we're trying to MAXIMIZE the value, if it's the opponent's turn, we're trying to MINIMIZE it
					if(((stage%2) == 1 && curr_VP > mostVP) || ((stage%2) == 0 && curr_VP < mostVP)) {
						mostVP = curr_VP;
						bestMove = i;
					} else if(curr_VP == mostVP) {
						// If both moves are equally good, make a coin flip to see which one gets played, adds a bit of randomness to the AI's rather discrete playing style
						// Although, this sometimes leads the AI to make a sub-par move due to quirks of calculation. A little bit of randomness makes things more interesting though!
						var coinFlip = Math.floor(Math.random()*2);
						switch(coinFlip) {
							case 0:
								// Keep the current mostVP and bestMove~
								break;
							case 1:
								mostVP = curr_VP;
								bestMove = i;
								break;
							default:
								alert("Not supposed to be able to flip anything other than 0 or 1!");
								break;
						}
					}
				}
			}
		}
		
		if(stage != totalStages) {
			return mostVP;
		}
	}
	
	//alert("Best Move Determined!");
	
	if(stage == totalStages) {
		var moveScoresString = "Turn " + turnCounter + "<br>";
		for(var i=0; i<moveScores.length; i++) {
			if(i == bestMove) {
				moveScoresString += "<b>";
			}
			moveScoresString += "Play Column #" + i + " = " + moveScores[i] + "<br>";
			if(i == bestMove) {
				moveScoresString += "</b>";
			}
			if(i == (moveScores.length-1)) {
				moveScoresString += "<hr>";
			}
		}
		document.getElementById("calculations").innerHTML += moveScoresString;
	}
	
	alreadyWon = false;
	alreadyLost = false;
	
	return bestMove;
	
}

function playMove(row, col, color) {
	
	board[row][col] = color;
	cpu_board[col][row] = color;
	
}

function undoMove(row, col) {
	
	board[row][col] = color_empty;
	cpu_board[col][row] = color_empty;
	
}

var alreadyWon = false;
var alreadyLost = false;
function calcVictoryPoints(routesToVictory, routesToDefeat, col, color, rivalColor) {
	
	var victoryPoints = 0;
	
	for(var i=0; i<routesToVictory.length; i++) {
		/*document.getElementById("calculations").innerHTML += "Curr VP: " + victoryPoints + "<br>";
		document.getElementById("calculations").innerHTML += "Curr Group [" + routesToVictory[i].square1.row + ", " + routesToVictory[i].square1.col + "]"
																+ " [" + routesToVictory[i].square2.row + ", " + routesToVictory[i].square2.col + "]"
																+ " [" + routesToVictory[i].square3.row + ", " + routesToVictory[i].square3.col + "]"
																+ " [" + routesToVictory[i].square4.row + ", " + routesToVictory[i].square4.col + "] <br>";*/
		var counter = 0;
		if(cpu_board[routesToVictory[i].square1.col][routesToVictory[i].square1.row] == color) {
			counter++;
		} else if(cpu_board[routesToVictory[i].square1.col][routesToVictory[i].square1.row] == rivalColor) {
			counter = 0;
		}
		if(cpu_board[routesToVictory[i].square2.col][routesToVictory[i].square2.row] == color) {
			counter++;
		} else if(cpu_board[routesToVictory[i].square2.col][routesToVictory[i].square2.row] == rivalColor) {
			counter = 0;
		}
		if(cpu_board[routesToVictory[i].square3.col][routesToVictory[i].square3.row] == color) {
			counter++;
		} else if(cpu_board[routesToVictory[i].square3.col][routesToVictory[i].square3.row] == rivalColor) {
			counter = 0;
		}
		if(cpu_board[routesToVictory[i].square4.col][routesToVictory[i].square4.row] == color) {
			counter++;
		} else if(cpu_board[routesToVictory[i].square4.col][routesToVictory[i].square4.row] == rivalColor) {
			counter = 0;
		}
		switch(counter) {
			case 0:
				// Creating a new single-filled group!
				victoryPoints += 5;
				break;
			case 1:
				// Creating a pair within the group!
				victoryPoints += 25;
				break;
			case 2:
				// Creating a triple within the group!
				victoryPoints += 70;
				if(isOpenEndedGroup(routesToVictory[i], color)) {
					// Creating this a triple from this group is nearly the same as victory
					victoryPoints += 700;
				}
				if(preferNonContinuousTriple(routesToVictory[i], color, col)) {
					// VEEERRY minor preference towards non-continuous triples, as continuous triples are still the best bet overall
					victoryPoints += 100;
				}
				break;
			case 3:
				// Victory if we play this move!
				//alreadyWon = true;
				victoryPoints += 9999;
				break;
			case 4:
				alreadyWon = true;
				victoryPoints += 1000000;
				//alert("This means we've already won!");
				break;
			default:
				//alert("We got more than 4 in the counter when a winning group = 4?! Huh? =(");
				break;
		}
		//document.getElementById("calculations").innerHTML += "NEW VP: " + victoryPoints + "<br>";
	}
	
	for(var i=0; i<routesToDefeat.length; i++) {
		var d_counter = 0;
		if(cpu_board[routesToDefeat[i].square1.col][routesToDefeat[i].square1.row] == rivalColor) {
			d_counter++;
		} else if(cpu_board[routesToDefeat[i].square1.col][routesToDefeat[i].square1.row] == color) {
			d_counter = 0;
		}
		if(cpu_board[routesToDefeat[i].square2.col][routesToDefeat[i].square2.row] == rivalColor) {
			d_counter++;
		} else if(cpu_board[routesToDefeat[i].square2.col][routesToDefeat[i].square2.row] == color) {
			d_counter = 0;
		}
		if(cpu_board[routesToDefeat[i].square3.col][routesToDefeat[i].square3.row] == rivalColor) {
			d_counter++;
		}  else if(cpu_board[routesToDefeat[i].square3.col][routesToDefeat[i].square3.row] == color) {
			d_counter = 0;
		}
		if(cpu_board[routesToDefeat[i].square4.col][routesToDefeat[i].square4.row] == rivalColor) {
			d_counter++;
		} else if(cpu_board[routesToDefeat[i].square4.col][routesToDefeat[i].square4.row] == color) {
			d_counter = 0;
		}
		switch(d_counter) {
			case 0:
				// Opponent has nothing in this group! I don't even know why this is here!
				victoryPoints -= 1;
				break;
			case 1:
				// Opponent has a single piece in this group! It's not that dangerous.
				victoryPoints -= 5;
				if(isOpenEndedGroup(routesToDefeat[i], rivalColor)) {
					// Defeating one of these groups is paramount
					victoryPoints -= 10;
				}
				break;
			case 2:
				// Opponent has a pair within the group! This is dangerous!
				victoryPoints -= 50;
				if(isOpenEndedGroup(routesToDefeat[i], rivalColor)) {
					// Defeating one of these groups is paramount
					victoryPoints -= 500;
				}
				if(preferNonContinuousTriple(routesToDefeat[i], rivalColor, col)) {
					// If there is an enemy group with a feature __OO or OO__, this is ridiculously dangerous and must be addressed!
					
					victoryPoints -= 500;
				}
				break;
			case 3:
				// Opponent has a triple within the group! We MUST stop this! (Only thing that supercedes this is Victory)
				//alreadyLost = true;
				victoryPoints -= 7777;
				break;
			case 4:
				alreadyLost = true;
				victoryPoints -= 5000000;
				//alert("This means Human Player already won!");
				break;
			default:
				//alert("We got more than 4 in the counter when a winning group = 4?! Huh? =(");
				break;
		}
	}
	
	//document.getElementById("calculations").innerHTML += "<hr>";
	
	return victoryPoints;
	
}

// A very dangerous special feature of a completable group!
function isOpenEndedGroup(group, color) {
	
	var isOpenEndedGroup = false;
	
	if(cpu_board[group.square1.col][group.square1.row] == color_empty && cpu_board[group.square2.col][group.square2.row] == color 
		&& cpu_board[group.square3.col][group.square3.row] == color && cpu_board[group.square4.col][group.square4.row] == color_empty) {
		isOpenEndedGroup = true;
	}
	// Other types of pairs that are extremely dangerous are also gonna be evaluated here, such as the feature: _O_O or O_O_ 
	// Which, having the possibility of being a group of 5 looking like this: _O_O_ is crazy dangerous
	// O_O_ version
	if(cpu_board[group.square1.col][group.square1.row] == color && cpu_board[group.square2.col][group.square2.row] == color_empty 
		&& cpu_board[group.square3.col][group.square3.row] == color && cpu_board[group.square4.col][group.square4.row] == color_empty) {
		isOpenEndedGroup = true;
	}
	// _O_O version
	if(cpu_board[group.square1.col][group.square1.row] == color_empty && cpu_board[group.square2.col][group.square2.row] == color
		&& cpu_board[group.square3.col][group.square3.row] == color_empty && cpu_board[group.square4.col][group.square4.row] == color) {
		isOpenEndedGroup = true;
	}
	
	// Only do the checks for _O__ and __O_ if all the squares are directly playable
	if(isDirectlyPlayable(group.square1.row, group.square1.col) && isDirectlyPlayable(group.square2.row, group.square2.col)
		&& isDirectlyPlayable(group.square3.row, group.square3.col) && isDirectlyPlayable(group.square4.row, group.square4.col)) {
		// _O__
		if(cpu_board[group.square1.col][group.square1.row] == color_empty && cpu_board[group.square2.col][group.square2.row] == color
			&& cpu_board[group.square3.col][group.square3.row] == color_empty && cpu_board[group.square4.col][group.square4.row] == color_empty) {
			isOpenEndedGroup = true;
		}
		// __O_
		if(cpu_board[group.square1.col][group.square1.row] == color_empty && cpu_board[group.square2.col][group.square2.row] == color_empty
			&& cpu_board[group.square3.col][group.square3.row] == color && cpu_board[group.square4.col][group.square4.row] == color_empty) {
			isOpenEndedGroup = true;
		}
	}
	
	return isOpenEndedGroup;
	
}

function isDirectlyPlayable(row, col) {
	var isDirectlyPlayable = false;
	var directlyPlayableSquares = findDirectlyPlayableSquares();
	
	if(directlyPlayableSquares[col] == row) {
		isDirectlyPlayable = true;
	}
	
	return isDirectlyPlayable;
}

// Special rule that puts a slight preference on non-continuous triples in cases where the pairs look like this: OO__ or __OO
function preferNonContinuousTriple(group, color, col) {
	
	//alert("Check if we Prefer This (Column " + col + ")");
	var preferNonContinuousTriple = false;
	
	// __OO version
	//alert("Square 1 Col: " + group.square1.col + " S1 Color: " + cpu_board[group.square1.col][group.square1.row] + " S2 Color: " + cpu_board[group.square2.col][group.square2.row]
	//		+ " S3 Color: " + cpu_board[group.square3.col][group.square3.row] + " S4 Color: " + cpu_board[group.square4.col][group.square4.row]);
	if(col == group.square1.col && cpu_board[group.square1.col][group.square1.row] == color_empty && cpu_board[group.square2.col][group.square2.row] == color_empty
		&& cpu_board[group.square3.col][group.square3.row] == color && cpu_board[group.square4.col][group.square4.row] == color) {
		preferNonContinuousTriple = true;
	}
	
	// OO__ version
	if(col == group.square4.col && cpu_board[group.square1.col][group.square1.row] == color && cpu_board[group.square2.col][group.square2.row] == color
		&& cpu_board[group.square3.col][group.square3.row] == color_empty && cpu_board[group.square4.col][group.square4.row] == color_empty) {
		preferNonContinuousTriple = true;
	}
	
	//alert("Prefer? " + preferNonContinuousTriple);
	
	return preferNonContinuousTriple;
	
}

function aiMove() {
	
	// We always evaluate the board on the CPU's turn, looking at all the directlyPlayableSquares and calculating each square's 'potential' in leading the AI to victory
	// The AI wants to maximize the #routes to victory (+) AND minimize the #routes to defeat (-), while also factoring in weights for moves that block threat pairs/triples from
	// the opponent and/or create pairs/triples that lead toward victory. A move that will end the game takes absolute priority.
	var bestMove = evaluateBoard();
	doDrop(bestMove);
	
}

// The set of all potential groups on a 7 x 6 board
var allGroups = new Array();

function Square(row, col) {
	this.row = row;
	this.col = col;	
	this.color = cpu_board[col][row];
}

function Group(square1, square2, square3, square4) {
	this.square1 = square1;
	this.square2 = square2;
	this.square3 = square3;
	this.square4 = square4;
	this.containsSquare = containsSquare;
}

// A function that belongs to the Group object
function containsSquare(square) {
	var foundSquare = false;
	if(this.square1.row == square.row && this.square1.col == square.col) {
		foundSquare = true;
	}
	if(this.square2.row == square.row && this.square2.col == square.col) {
		foundSquare = true;
	}
	if(this.square3.row == square.row && this.square3.col == square.col) {
		foundSquare = true;
	}
	if(this.square4.row == square.row && this.square4.col == square.col) {
		foundSquare = true;
	}
	
	return foundSquare;
}

// Finds all possible groups on a 7 x 6 board
function findAllGroups() {
	
	// find horizontal groups
	for(var i=0; i<6; i++) {
		for(var k=0; k<4; k++) {
			group = new Group(new Square(i, k), new Square(i,(k+1)), new Square(i, (k+2)), new Square(i, (k+3)));
			allGroups.push(group);
		}
	}
	
	// find vertical groups
	for(var i=0; i<7; i++) {
		for(var k=0; k<3; k++) {
			group = new Group(new Square(k, i), new Square((k+1), i), new Square((k+2), i), new Square((k+3), i));
			allGroups.push(group);
		}
	}
	
	// find the ascending groups
	for(var i=0; i<3; i++) {
		for(var k=0; k<4; k++) {
			group = new Group(new Square(i, k), new Square((i+1), (k+1)), new Square((i+2), (k+2)), new Square((i+3), (k+3)));
			allGroups.push(group);
		}
	}
	
	// find the descending groups
	for(var i=0; i<3; i++) {
		for(var k=3; k<7; k++) {
			group = new Group(new Square(i, k), new Square((i+1), (k-1)), new Square((i+2), (k-2)), new Square((i+3), (k-3)));
			allGroups.push(group);
		}
	}
	
}

// A modifier to allGroups that will limit the problem size to only immediate threats from P1 (Groups that are made up of ONLY P1 Color or Empty Squares)
function findAllGroupsThatContainPColorSquares(color, rivalColor) {
	
	var groupsWithPColorSquares = new Array();
	var directlyPlayableSquares = findDirectlyPlayableSquares();
	
	// Search the Col x Row cpu_board for pieces on the board owned by P1 (Human) or currently Empty
	for(var i=0; i<7; i++) {
		for(var k=0; k<6; k++) {
			//if(cpu_board[i][k] != p2Color) {
			//if(cpu_board[i][k] == p1Color || k == directlyPlayableSquares[i]) {
			if(cpu_board[i][k] == color) {
				var currGroups = findAllGroupsThatContainSquare(new Square(k, i));
				for(var m=0; m<currGroups.length; m++) {
					if(currGroups[m].square1.color != rivalColor && currGroups[m].square2.color != rivalColor && currGroups[m].square3.color != rivalColor 
						&& currGroups[m].square4.color != rivalColor) {
						var conflictWithGroupsWithPColorSquares = false;
						for(var n=0; n<groupsWithPColorSquares.length; n++) {
							if(currGroups[m] == groupsWithPColorSquares[n]) {
								conflictWithGroupsWithPColorSquares = true;
							}
						}
						if(!conflictWithGroupsWithPColorSquares) {
							groupsWithPColorSquares.push(currGroups[m]);
						}
					}
				}
			}
		}
	}
	
	return groupsWithPColorSquares;
	
}

function findAllGroupsThatContainSquare(square) {
	
	var groupsWithSquare = new Array();
	
	for(var i=0; i<allGroups.length; i++) {
		if(allGroups[i].containsSquare(square)) {
			groupsWithSquare.push(allGroups[i]);
		}
	}
	
	return groupsWithSquare;
	
}

function findAllGroupsThatContainBothSquares(square1, square2) {
	
	var groupsWithSquare = new Array();
	
	for(var i=0; i<allGroups.length; i++) {
		if(allGroups[i].containsSquare(square1) && allGroups[i].containsSquare(square2)) {
			//alert("Found a group with both squares!");
			groupsWithSquare.push(allGroups[i]);
		}
	}
	
	return groupsWithSquare;
	
}

function findAllCompletableGroupsThatContainSquare(square, color, rivalColor) {
	
	var completableGroupsWithSquare = new Array();
	
	var groupsWithSquare = findAllGroupsThatContainSquare(square);
	for(var i=0; i<groupsWithSquare.length; i++) {
		if(cpu_board[groupsWithSquare[i].square1.col][groupsWithSquare[i].square1.row].color != rivalColor 
			&& cpu_board[groupsWithSquare[i].square2.col][groupsWithSquare[i].square2.row].color != rivalColor 
			&& cpu_board[groupsWithSquare[i].square3.col][groupsWithSquare[i].square3.row].color != rivalColor
			&& cpu_board[groupsWithSquare[i].square4.col][groupsWithSquare[i].square4.row].color != rivalColor) {
			completableGroupsWithSquare.push(groupsWithSquare[i]);
		}
	}
	
	return completableGroupsWithSquare;
	
}

function findAllOpponentCompletableGroupsAfterPlayingSquare(square, color, rivalColor) {
	
	var opponentCompletableGroups = new Array();
	
	var groupsWithPColorSquares = findAllGroupsThatContainPColorSquares(color, rivalColor);
	// Might have some redundancies in there...
	groupsWithPColorSquares = groupsWithPColorSquares.concat(findAllGroupsThatContainSquare(new Square(square.row+1, square.col)));
	for(var i=0; i<groupsWithPColorSquares.length; i++) {
		/*if(groupsWithPColorSquares[i].square1.row != square.row && groupsWithPColorSquares[i].square1.row != square.col
			&& groupsWithPColorSquares[i].square2.row != square.row && groupsWithPColorSquares[i].square2.row != square.col
			&& groupsWithPColorSquares[i].square3.row != square.row && groupsWithPColorSquares[i].square3.row != square.col
			&& groupsWithPColorSquares[i].square4.row != square.row && groupsWithPColorSquares[i].square4.row != square.col) {*/
		if(!groupsWithPColorSquares[i].containsSquare(square)) {
			opponentCompletableGroups.push(groupsWithPColorSquares[i]);
		}
	}
	
	return opponentCompletableGroups;
	
}