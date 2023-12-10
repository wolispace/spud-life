<?php

$id = $_REQUEST['id'] ?? '';
$id = cleanString($id);

// unique code for js loading
$v = rand(10, 99999);

logIt(json_encode($_REQUEST));


if (empty($id)) {
  outputGamePage($v);
} else {
  saveLoad($v, $id);
}

function logIt($str) {
  //file_put_contents('_log.txt', "{$str}\n", FILE_APPEND | LOCK_EX);
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
  $dataFile = "_saves/_save_{$id}.js";
  logIt($dataFile);

  return $dataFile;
}

function getSaveScript($v, $id)
{
  $jsDataFileName = getJsDataFileName($id);
  if (file_exists($jsDataFileName)) {
    return "<script src='{$jsDataFileName}?{$v}' ></script>";
  } else {
    return "<script>alert('no transfer code [{$id}] found');</script>"; 
  }
}

function getScripts($v)
{
  $scripts = "<script src='_js_files.min.js?{$v}'></script><script>const isDev = false</script>";
  if (isDevMode()) {
    $scripts = '<script>const isDev = true</script>';
    $scripts .= readFolder("src1", 'dev');
    $scripts .= readFolder("src2", 'dev');
    $scripts .= readFolder("src3", 'dev');
    $scripts .= readFolder("src_", 'dev');
  }
  
  return $scripts;
}

function readFolder ($folder, $v) {
  $scripts = '';
  $files = scandir($folder);
  foreach ($files as $file) {
    if ($folder == 'src2' && $file == 'lists.js') {
      continue;
    }
    if ($file[0] != '.' && substr($file, 0, 1) != '_') {
      $scripts .= "<script src='{$folder}/{$file}?{$v}'></script>\n";
    }
  }

  return $scripts;
}

function outputGamePage($v, $id = '')
{
  $scripts = getScripts($v);
  $saveScript = empty($id) ? '<script>//no id</script>' : getSaveScript($v, $id);
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
