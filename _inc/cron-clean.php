<?php
 /**
 * @company SilverTribe
 * @author Aug <mycollegebox@aol.com>
 * Created: 3/7/2015 | 17:47
 */


global $wpdb;

if(!isset($wpdb)) {
	require_once("../../../../wp-load.php");
}

if(isset($_GET['key']) && $_GET['key'] === '4151' && isset($_GET['type'])){
	if (in_array($_GET['type'], array('daily','weekly','monthly'))){
		$type = "post_views_count_{$_GET['type']}";
		 $args = array(
			'meta_key'         => $type,
			'post_type'        => 'post',
			'post_status'      => 'publish',
		);
		$posts = get_posts( $args );
		foreach($posts as $post){
			delete_post_meta($post->ID, $type);
		}
	}

}