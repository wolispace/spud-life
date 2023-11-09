<?php

$id = $_REQUEST['id'] ?? '';
$id = cleanString($id);

// unique code for js loading
$v = rand(10, 99999);

//file_put_contents('_request.txt', json_encode($_REQUEST));

if (empty($id)) {
  outputGamePage($v);
} else {
  saveLoad($v, $id);
}

function cleanString($str)
{
  $str = preg_replace('/[^a-z0-9]/i', '', $str);

  return substr($str, 0, 15);
}

function isDevMode()
{
  return file_exists('_dev.txt');
}

function saveLoad($v, $id)
{
  $data = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';
  if (!empty($data)) {
    $jsDataFile = getJsDataFileName($id);
    $saveData = "const saveId = `{$id}`; const saveData = '{$data}';";
    file_put_contents($jsDataFile, $saveData);
  }
  outputGamePage($v, $id);
}

function getJsDataFileName($id)
{
  return "_saves/_save_{$id}.js";
}

function getSaveScript($v, $id)
{
  $jsDataFileName = getJsDataFileName($id);
  return "<script src='{$jsDataFileName}?{$v}' ></script>";
}

function getScripts($v)
{
  $scripts = "<script src='_js_files.min.js?{$v}'></script><script>const isDev = false</script>";
  if (isDevMode()) {
    $scripts = '<script>const isDev = true</script>';
    $scripts .= readFolder("src1", $v);
    $scripts .= readFolder("src2", $v);
    $scripts .= readFolder("src3", $v);
  }
  
  return $scripts;
}

function readFolder ($folder, $v) {
  $scripts = '';
  $files = scandir($folder);
  foreach ($files as $file) {
    if ($file[0] != '.') {
      $scripts .= "<script src='{$folder}/{$file}?{$v}'></script>\n";
    }
  }

  return $scripts;
}

function outputGamePage($v, $id = '')
{
  $scripts = getScripts($v);
  $saveScript = empty($id) ? '' : getSaveScript($v, $id);
  print "<!DOCTYPE html>
<html dir='ltr' lang='en'>
  <head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0, interactive-widget=resizes-visual' />
    <title>Spud life</title>
    <link rel='stylesheet' href='layout.css?{$v}' />
    {$saveScript}
    <script src='js/lz-string.min.js?{$v}' ></script>
    {$scripts}
  </head>
  <body style='margin: 0'>
    <div class='world'></div>
    <div class='controls'></div>
  </body>
</html>";
}
