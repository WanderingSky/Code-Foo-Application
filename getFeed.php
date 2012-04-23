<?php

$url = $_REQUEST["url"];
if (!$url) { 
	$xml = 'Invalid request - url not found'; 
	echo $xml;
	exit;
}

$rss =  simplexml_load_file($url);

if ($rss->channel)			{ $feedType = "rss"; }
if ($rss->entry[0]) 		{ $feedType = "atom"; }
if ($rss->channel->items)	{ $feedType = "rdf"; }

switch ($feedType) {
	case "rss":
		$feed_title =  $rss->channel->title;
		$feed_description = $rss->channel->description;
		$feed_link = $rss->channel->link;
		$feed_logo = $rss->channel->image->url;
		
		if ($feed_logo) {
			$xml = '<img src="' . $feed_logo . '" /><br>';
		} else {
			$xml = '';
		}
		
		$xml .= '<a class="title_link" href="' . $feed_link . '">' . $feed_title . '</a>';
		$xml .= '<hr size="1">';
		$xml .= '<ul class="rss_list">';
		
		$i=0;
		foreach ($rss->channel->item as $item) {
			$itemLink = $item->link;
			$itemLink = str_replace('http:/www', 'http://www', $itemLink);
			$itemLink = str_replace('https:/www', 'https://www', $itemLink);
			
			$xml .= '<li><a id="rss_link'.$i.'" href="' . $itemLink . '" onmouseover="preview('.$i.')" onmouseout="resetpreview('.$i.')">' . $item->title . '</a>';		
			//$xml .= '<br>';	
			$xml .= '<div id="popup'.$i.'" class="popup">
						<div id="title'.$i.'" class="popup_title">'.$item->title.'</div>
						<div id="desc'.$i.'" class="desc">' . $item->description . '</div>
					</div>';
			$xml .= '</li>';
			//$xml .= '<br>';	
			$xml .= '<hr class="clear" size="1">';
			
			$i++;
		}
		$xml .= '</ul>';
		echo $xml;
		break;
	case "atom":
		$feed_title = $rss->title;
		$feed_description = $rss->name;
		$feed_link = $rss->link[0]->attributes()->href;
		$feed_logo = $rss->logo;
		
		if ($feed_logo) {
			$xml = '<img src="' . $feed_logo . '" /><br>';
		} else {
			$xml = '';
		}
		
		$xml .= '<a class="title_link" href="' . $feed_link . '">' . $feed_title . '</a>';
		$xml .= '<hr size="1">';
		$xml .= '<ul class="rss_list">';
		
		foreach ($rss->entry as $entry) {
			$entryLink = $entry->link[0]->attributes()->href;
			
			$xml .= '<li><a href="' . $entryLink . '">' . $entry->title . '</a>';
			
			if($entry->summary) {
				$summary = $entry->summary;
			} else {
				$summary = $entry->content;
			}
			
			//$xml .= '<br />';
			$xml .= '<div id="popup'.$i.'" class="popup">
						<div id="title'.$i.'" class="popup_title">'.$entry->title.'</div>
						<div id="desc'.$i.'" class="desc">' . $summary . '</div>
					</div>';
			$xml .= '</li>';
			//$xml .= '<br>';
			$xml .= '<hr class="clear" size="1">';
		}
		$xml .= '</ul>';
		echo $xml;
		break;
	case "rdf":
		$feed_title =  $rss->channel->title;
		$feed_description = $rss->channel->description;
		$feed_link = $rss->channel->link;
		$feed_logo = $rss->channel->image;

		if ($feed_logo) {
			$xml = '<img src="' . $feed_logo . '" /><br>';
		} else {
			$xml = '';
		}
		$xml .= '<a class="title_link" href="' . $feed_link . '">' . $feed_title . '</a>';
		$xml .= '<hr size="1">';
		$xml .= '<ul class="rss_list">';
		
		foreach ($rss->item as $item) {
			$xml .= '<li><a href="' . $item->link . '">' . $item->title . '</a>';
			//$xml .= '<br>';
			$xml .= '<div id="popup'.$i.'" class="popup">
						<div id="title'.$i.'" class="popup_title">'.$item->title.'</div>
						<div id="desc'.$i.'" class="desc">' . $item->description . '</div>
					</div>';
			$xml .= '</li><hr class="clear" size="1">';
		}
		$xml .= '</ul>';
		echo $xml;
		break;
	default:
//		echo ("Unknown format");
		print_r($rss);
		break;
}

exit;

?>
