<link rel="stylesheet" type="text/css" href="licenseplategenerator-style.css"> 

<?php

	// Get the population size we are working with
	$population = $_GET['population_size'];
	
	// What follows is the formula for determining the best pattern (ranked based on how many excess plates they produced) was for the given Population
	// This is also based on the assumption that it is possible for Letters and Numbers to be repeated across the pattern
	$POSSIBLE_NUMBERS = 10;
	$POSSIBLE_LETTERS = 26;
	
	$num_numbers = 0;
	$num_letters = 0;
	$total_plates = 0;
	$excess_plates = 0;
	$excess_plates_set = false;
	
	for($i=0; (pow($POSSIBLE_NUMBERS, $i)<=$population && $excess_plates > 0) || !$excess_plates_set || pow($POSSIBLE_NUMBERS, $i) < ($population+$excess_plates); $i++) {
		for($k=0; 
			(pow($POSSIBLE_LETTERS, $k)<=($population-pow($POSSIBLE_NUMBERS, $i)) && $excess_plates > 0) 
				|| !$excess_plates_set 
				|| pow($POSSIBLE_LETTERS, $k) < ($population+$excess_plates); 
			$k++) {
			
			$curr_total_plates = pow($POSSIBLE_NUMBERS, $i) * pow($POSSIBLE_LETTERS, $k);
			// This is a special case where the value should actually be 0 instead of 1, because we're using an exponential formula to calculate the number of permutations,
			// When you have 0 Letters and 0 Numbers (10^0 * 26^0 = 1), that's actually 1 kind of permutation (but an invalid one in practical application)
			if($curr_total_plates == 1) {
				$curr_total_plates = 0;
			}
			$curr_excess_plates = $curr_total_plates - $population;
			
			if(($curr_excess_plates<$excess_plates || !$excess_plates_set) && $curr_excess_plates >= 0) {
				if(!$excess_plates_set) {
					$excess_plates_set = true;
				}
				$excess_plates = $curr_excess_plates;
				$total_plates = $curr_total_plates;
				$num_numbers = $i;
				$num_letters = $k;
			}
		}
	}

?>

<div id="pattern" class="info"><span id="pattern_label" class="label">Best Pattern:</span> <span id="num_numbers"><?php echo $num_numbers; ?> Numbers</span> and <span id="num_letters"><?php echo $num_letters; ?> Letters</span></div>
<div id="total_plates" class="info"><span id="total_plates_label" class="label">Total Plates:</span> <?php echo $total_plates; ?></div>
<div id="excess_plates" class="info"><span id="excess_plates_label" class="label">Excess Plates:</span> <?php echo $excess_plates; ?></div>