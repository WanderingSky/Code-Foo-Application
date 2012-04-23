<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Liquid</title>
    <link id="css" rel="stylesheet" type="text/css" href="liquid-style.css"> 
    <script type="text/javascript" src="liquid-ajax.js"></script>
</head>

<body onresize="changeLogo()" onload="initDynamicStuff()">
	
	<div id="header">
    	<!--img id="logo" src="logo.png" width="300" height="100" alt="Liquid" /-->
        <a href="liquid.php" id="logo" title="Liquid Seraph Design"></a>
    	<ul id="menu">
        	<li class="menu_item">
            	<a class="menu_anchor" href="#">Home</a>
                <div id="dropdown_short" class="dropdown">
                	<div id="welcome" class="block">
                    	<p>Oh hai!</p>
                    </div>
                    <div id="welcome2" class="block">
                    	<p>Welcome to <span class="highlight">Liquid</span>.</p>
                    </div>
                </div>
            </li>
            <li class="menu_item">
            	<a class="menu_anchor" href="#">About</a>
                <div class="dropdown">
                	<div id="about_info">
                    	<img id="info_taiga" src="Taiga!.png" width=70 height=60 />
                        <p>Rawr! I'm the <span class="highlight">Info Taiga</span>!</p>
                    	<p>This is an example of a Mega Menu that my creator whipped up and integrated into the liquid design just for the hell of it.</p>
                        <p>It makes great use of horizontal space, is easier to read and is capable of more interesting layouts of links, images or textual information such as this.</p>
                        <p>Just check out the Showcase and other links for more examples of what the Mega Menu can do~!</p>
                    </div>
                </div>
            </li>
            <li class="menu_item">
            	<a class="menu_anchor" href="#">Showcase</a>
                <div class="dropdown">
                	<div class="two_col">
                    	<p>A 2-Column format!</p>
                        <p>How interesting!</p>
                    </div>
                    <div class="two_col">
                    	<p>Using columns, you could totally start laying out information like a newspaper!</p>
                    </div>
                    <div class="row">
                    	<p>Though I wouldn't know why you would want to pack a dense amount of info in a relatively compact space, it's nice to know the option is there~</p>
                    </div>
                </div>
            </li>
            <li class="menu_item">
            	<a class="menu_anchor" href="#">Fun</a>
                <div class="dropdown">
                	<div class="three_col">
                    	<span class="label">Links</span>
                        <ul class="link_list">
                        	<li>
                            	<a href="#">These</a>
                            </li>
                            <li>
                            	<a href="#">Links</a>
                            </li>
                            <li>
                            	<a href="#">Don't</a>
                            </li>                            
                        </ul>
                    </div>
                    <div class="three_col">
                    	<span class="label">Cool Stuff</span>
                        <ul class="link_list">
                        	<li>
                            	<a href="#">Actually</a>
                            </li>
                            <li>
                            	<a href="#">Go</a>
                            </li>
                        </ul>
                    </div>
                    <div class="three_col">
                    	<span class="label">Fun Things</span>
                        <ul class="link_list">
                        	<li>
                            	<a href="#">Anywhere</a>
                            </li>
                            <li>
                            	<a href="#">Just</a>
                            </li>
                            <li>
                            	<a href="#">So</a>
                            </li>
                            <li>
                            	<a href="#">You</a>
                            </li>
                            <li>
                            	<a href="#">Know</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="menu_item">
            	<a class="menu_anchor" href="#">Contact</a>
                <div class="dropdown">
                	<div id="contact_info">
                    	<img id="info_taiga" src="Taiga!.png" width=70 height=60 />
                        <p>Hi again! Didja miss me? Rawr~</p>
                        <p>If you like what you saw here and elsewhere feel free to drop a line @</p>
                        <p id="contact"><span class="highlight">BrianDBui@gmail.com</span> | | <span class="highlight">(714) 758-5360</span></p>
                        <p id="thanks">Thank you for visiting!</p>
                    </div>
                </div>
            </li>
            <li id="reverse" class="menu_item">
            	<a class="menu_anchor" href="#">Reverse</a>
                <div class="reverse_dropdown">
                	<p>Oh hey, a right-hand aligned version of the drop down box! How novel.</p>
                </div>
            </li>
        </ul>
    </div>
    
    <div id="body">
        <div id="mid_left" class="liquid_frame">
            <div class="inner_frame">
                <h1>The Current~</h1>
                <div id="time"></div>
                <div id="rss_controls">
                	<input type="button" id="refresh" onclick="getRSSFeed()" value="Refresh" />
                    <div class="rss_note">Auto-Refreshes <span class="highlight">RSS Feed</span> every minute.</div>
                    <div class="rss_note">Try <span class="highlight">Hovering</span> over the <span class="highlight">RSS Links</span> for a preview of the article!</div>
                </div>
                <div id="rss_feed"></div>
            </div>
        </div>
        
        <div id="mid_body" class="liquid_frame">
            <div class="inner_frame">
                <h1 id="mid_header">Blog | News</h1>
                <div id="main_frame">
                	<div class="post_info">
                    	<img class="avatar" src="Taiga!.png" width=70 height=60; />
                        <div class="name">Leo</div>
                    	<div class="level"><span class="highlight">Level 1 Info Taiga</span></div>
                        <div class="location">Location: <span class="highlight">In a Pocket</span></div>
                	</div>
                    <div class="post_title">My First Post~!</div>
                    <div class="post_date"><span class="highlight">April 14th, 2012</span></div>
                    <div class="post_body">
                        <p>Hello, hello! This here's an example of a post that you might see in any sort of blog or news site! Look at the sheer spaciousness of this
                        middle area! So glorious... But I digress.</p> 
                        <p>The central area would normally be comprised of many of these kinds of posts ordered from most recent post on top to oldest
                        at the bottom.</p> 
                        <p>Technically, you could do more than just have posts running through this main portion of the site. Instead of having posts occupy the uppermost part
                        of this column, you could have a scrolling menu of articles and/or videos that you wish to highlight, followed by an area filled with posts, like IGN's current site 
                        design, heh!</p>
                        <p>Alternatively, the RSS feeds shown in the left column could be presented in this main area instead, as it is a much larger space and more accomodating for large
                        images that may accompany an RSS post and were forcibly down-scaled to fit into the Left Column.</p>
                        <p>Another interesting usage would have been using this area as the iFrame 'viewport' for opening any links you clicked from that RSS Feed Reader on the left-hand side.
                        That way, you could visit another site without actually leaving this current site. Although it may seem a bit redundant in the face of browser tabbing, having
                        an everpresent and accessible list of articles from an array of sites (Though the RSS Reader is only grabbing feeds from IGN in this example, it is easy to extend to
                        multiple RSS feeds) at your fingertips still has its perks.</p>
                        <p>Anyhow, that's enough space filler for now.</p>
                        <p>Oh wait! That Right-side Column would be a good place to place advertisements where they're still easy to see, yet out of the way enough for anyone who reads from
                        left to right. The only problem with advertisements in this kind of layout is that to accomodate them, it would be best to have some kind of min-width that will assure
                        that ads will display properly. Images, or really any fixed structures (like that Mega Menu up there) are still notoriously difficult to wrangle into a liquid layout,
                        I'm afraid.</p>
                        <p>Hm... Because I still feel like this wall of text isn't huge enough, and I really don't feel like using indecipherable Latin to devour empty space, here's a picture
                        of a Gundam I saw on my travels in the Land of the Rising Sun.</p>
                        <img id="gundam" src="Gundam!.png" width=556 height=798 alt="It's a Gundam in Odaiba!" title="It's a Gundam in Odaiba!" />
                        <p>Pretty awesome, huh?</p>
                        <p>I thought so, too.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="mid_right" class="liquid_frame">
            <div class="inner_frame">
                <h1>Ads</h1>
                <div id="filler_ad">
                	<p>Want to rent this space? <span class="highlight">Apply Today!</span>*</p>
                    <p><span class="do_note">*There isn't anywhere to apply.</span></p>
                </div>
                <div id="filler_ad2">
                	<div id="big_sign">Visit Adelaide's Emporium of Advertisements!</div>
                    <p>More Ads than you can shake a stick at!</p>
                </div>
            </div>
        </div>
    </div>
    
    <div id="footer">
    	<span id="designer">Designed by Brian Bui</span>
    </div>

</body>
</html>