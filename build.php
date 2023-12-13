
<?php

// for compressing lists of strings

/*
./src_/lists.js defines list.raw = {} and is bundled in with dev mode

open build.php web page that simply loads ./scr_/lists.js and some utilities

trigger lists.raw to be compressed

send results back to this script in a form post 

take results and set lists.compressed

write back into ./src2/lists.js

exclude ./scr2/lists.js from dev (as it includes the raw lists)

*/

$compressed = $_REQUEST['compressed'] ?? '';
logIt($compressed);

if (empty($compressed)) {
  outputBuildPage();
} else {
  // write out src2/lists.js
  $jsFileMin = 'lists.min.js';
  $content = file_get_contents($jsFileMin);
  $replacement = "compressed: `{$compressed}`,";
  $newContent = preg_replace("/compressed: `.*`,/", $replacement, $content);
  file_put_contents($jsFileMin, $newContent);
  print "Ok";

}

function logIt($str) {
  //file_put_contents('_log.txt', "{$str}\n", FILE_APPEND | LOCK_EX);
}

function outputBuildPage()
{
  print "<!DOCTYPE html>
<html dir='ltr' lang='en'>
  <head>
    <meta charset='utf-8' />
    <script src='js/lz-string.min.js' ></script>
    <script src='src1/utils.js' ></script>
    <script src='src_/lists.js' ></script>
    <script src='src_/_build.js' ></script>
  </head>
  <body>
   List compressor
  </body>
</html>";
}
