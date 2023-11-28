<?php
    // Get the version part to increment from the command line argument
    $versionPart = $argv[1];

    $versionFile = 'src1/version.js';
    $pattern = '/const version = "(\d+)\.(\d+)\.(\d+)";/';

    // Read the version.js file
    $fileContents = file_get_contents($versionFile);

    // Use a regular expression to extract the version numbers
    preg_match($pattern, $fileContents, $matches);

    // Get the major, minor, and patch numbers
    $major = intval($matches[1]);
    $minor = intval($matches[2]);
    $patch = intval($matches[3]);

    // Increment the appropriate version part
    switch ($versionPart) {
        case 'major':
            $major++;
            // Reset minor and patch versions when major version is incremented
            $minor = 0;
            $patch = 0;
            break;
        case 'minor':
            $minor++;
            // Reset patch version when minor version is incremented
            $patch = 0;
            break;
        case 'patch':
            $patch++;
            break;
    }

    // Construct the new version string
    $newVersion = "const version = \"{$major}.{$minor}.{$patch}\";";

    // Replace the old version string with the new one in the file contents
    $newFileContents = preg_replace($pattern, $newVersion, $fileContents);

    // Write the updated contents back to the file
    file_put_contents($versionFile, $newFileContents);