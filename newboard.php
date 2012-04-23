<?php
    
$row=$_GET["row"];
$col=$_GET["col"];

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