<?php

$id = $_REQUEST['id'] ?? '';

// unique code for js loading
$v = rand(10,99999);

//file_put_contents('_request.txt', json_encode($_REQUEST));

if (empty($id)) {
  outputGamePage($v);
} else {
  saveLoad($v, $id);
}

function isDevMode() {
  return isset($_REQUEST['dev']);
}

function saveLoad($v, $id) {
  $data = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
  if (!empty($data)) {
    $jsDataFile = getJsDataFileName($id);
    $saveData = "const saveId = `{$id}`; const saveData = '{$data}';";
    file_put_contents($jsDataFile, $saveData);
  }
  outputGamePage($v, $id);
}

function getJsDataFileName($id) {
  return "_saves/_save_{$id}.js";
}

function getSaveScript($v, $id) {
  $jsDataFileName = getJsDataFileName($id);
  return "<script src='{$jsDataFileName}?{$v}' ></script>";
}

function getScripts($v) {
  $scripts = "<script src='_js_files.min.js?{$v}'></script>";
  if (isDevMode()) {
    $scripts = "<script src='js/utils.js?{$v}'></script>
    <script src='js/scanner.js?{$v}'></script>
    <script src='js/sky.js?{$v}'></script>
    <script src='js/character.js?{$v}'></script>
    <script src='js/player.js?{$v}'></script>
    <script src='js/customers.js?{$v}'></script>
    <script src='js/basket.js?{$v}'></script>
    <script src='js/home.js?{$v}'></script>
    <script src='js/hardware.js?{$v}'></script>
    <script src='js/shop.js?{$v}'></script>
    <script src='js/machines.js?{$v}'></script>
    <script src='js/tools.js?{$v}'></script>
    <script src='js/spuds.js?{$v}'></script>
    <script src='js/controls.js?{$v}'></script>
    <script src='js/fields.js?{$v}'></script>
    <script src='js/svg.js?{$v}'></script>
    <script src='js/hint.js?{$v}'></script>
    <script src='js/dialog.js?{$v}'></script>
    <script src='js/main.js?{$v}'></script>";
  }

  return $scripts;
}

function outputGamePage($v, $id = '') {
  $scripts = getScripts($v);
  $saveScript = empty($id) ? '' : getSaveScript($v, $id);
  print "<!DOCTYPE html>
<html dir='ltr' lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Spud life</title>
    <link rel='stylesheet' href='layout.css?{$v}' />
    {$saveScript}
    <script src='js/lz-string.min.js?{$v}' ></script>
    {$scripts}
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
