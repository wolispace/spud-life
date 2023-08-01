<?php

$id = $_REQUEST['id'];


if (empty($id)) {
  outputGamePage();
} else {
  saveLoad($id);
}

function isDevMode() {
  return isset($_REQUEST['dev']);
}

function saveLoad($id) {
  $data = $_REQUEST['data'];
  if (!empty($data)) {
    $jsDataFile = getJsDataFileName($id);
    file_put_contents($jsDataFile, $data);
  }
  outputGamePage($id);
}

function getJsDataFileName($id) {
  return "{$id}_saved.js";
}

function getSaveScript($id) {
  $jsDataFileName = getJsDataFileName($id);
  return "<script src='{$jsDataFileName}?1' ></script>";
}

function getScripts() {
  $scripts = "<script src='_js_files.min.js?1'></script>";
  if (isDevMode()) {
    $scripts = "<script src='js/utils.js?1'></script>
    <script src='js/scanner.js?1'></script>
    <script src='js/sky.js?1'></script>
    <script src='js/character.js?1'></script>
    <script src='js/player.js?1'></script>
    <script src='js/customers.js?1'></script>
    <script src='js/sack.js?1'></script>
    <script src='js/home.js?1'></script>
    <script src='js/hardware.js?1'></script>
    <script src='js/shop.js?1'></script>
    <script src='js/machines.js?1'></script>
    <script src='js/tools.js?1'></script>
    <script src='js/spuds.js?1'></script>
    <script src='js/controls.js?1'></script>
    <script src='js/fields.js?1'></script>
    <script src='js/svg.js?1'></script>
    <script src='js/hint.js?1'></script>
    <script src='js/dialog.js?1'></script>
    <script src='js/main.js?1'></script>";
  }

  return $scripts;
}

function outputGamePage($id = '') {
  $scripts = getScripts();
  $saveScript = empty($id) ? '' : getSaveScript($id);
  print "<!DOCTYPE html>
<html dir='ltr' lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Spud life</title>
    <link rel='stylesheet' href='layout.css?1' />
    <script src='js/lz-string.min.js' />
    {$scripts}
    {$saveScript}
  </head>
  <body>
    <div class='container'>
      <div class='field'></div>
      <div class='tools'></div>
      <div id='nightShade'></div>
      <div id='starField'></div>
      <div id='cloudLine'></div>
      <div id='buildingLine'></div>
      <div id='grassLine'></div>
      <div id='customerLine'></div>
    </div>
    <div id='itemSprite'></div>
    <div id='playerSprite'></div>
    <div id='hintSprite'></div>
    <div id='void'></div>    
    <div class='dialog'>
      <div class='header'>
        <div class='title'>Title</div>
        <div class='close buttonize' onclick='dialog.cancel()'>X</div>
      </div>
      <div class='content'></div>
      <div class='footer'></div>
    </div>
  </body>
</html>";
}
