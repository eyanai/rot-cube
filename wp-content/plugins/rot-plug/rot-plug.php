<?php
/*
Plugin Name: Rot cube plugin
Plugin URI: http://cambium.co.il
Description: דואג לפירסומים- הסרת פירסומים של פוסטים לפי התנהגות צפוייה מראש
Author: Yanai edri
Version: 0.1
Author URI: 
License: GPLv2 or later
*/

include ("setpost.php");

///json api extention
// Add a custom controller

function add_cube_controller($controllers) {
  // Corresponds to the class JSON_API_MyController_Controller
  $controllers[] = 'cube';
  return $controllers;
}
add_filter('json_api_controllers', 'add_cube_controller');

// Register the source file for JSON_API_Widgets_Controller

function set_cube_controller_path() {
  return plugin_dir_path( __FILE__ ).'/cube.php';
}
add_filter('json_api_cube_controller_path', 'set_cube_controller_path');


