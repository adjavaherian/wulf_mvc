<?php

if(isset($_REQUEST["id"])){
	echo "{\"employees\":[{\"name\": \"Bob\"},{\"name\": \"Lou\"}]}";
}else{
    echo "<h3>Hi There.  I'm your HTML data.</h3>";
}
?>
