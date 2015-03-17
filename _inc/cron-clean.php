<?php
 /**
 * @author Aug Steyer <augsteyer@gmail.com>
 * Created: 3/7/2015 | 17:47
 */

global $wpdb;

//just a more complicated include
if(!isset($wpdb)) {
	$paths = array(
		dirname(dirname(dirname(dirname(__FILE__)))) . '/wp-load.php',
		'../../../../wp-load.php',
		'../../../wp-load.php',
		'../../wp-load.php',
		'../../wp-load.php',
		'../wp-load.php',
		'wp-load.php',
	);

	foreach ($paths as $path) {
		if (file_exists($path)) {
			require $path;
			break;
		}
	}
}

//Remove meta from all posts that have it
if(isset($_GET['key']) && $_GET['key'] === '4151' && isset($_GET['type'])){
	if (in_array($_GET['type'], array('daily','weekly','monthly'))){
		$type = "post_views_count_{$_GET['type']}";
		$wpdb->query(
			$wpdb->prepare(
				"
                DELETE FROM $wpdb->postmeta
		 		WHERE meta_key = %s
				", $type
			)
		);
		echo "Successfully cleaned up '{$type}' meta tags\n";
	}
}