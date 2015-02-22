<?php
$a[] = "Java";
$a[] = "Windows";
$a[] = "Asp";
$a[] = "Jsp";
$a[] = "C";
$a[] = "C++";
$a[] = "C#";
$a[] = "Python";
$a[] = "Linux";
$a[] = "PHP";
$a[] = "JavaScript";
$a[] = "AngularJS";
$a[] = "jQuery";
$a[] = "NodeJS";
$a[] = "Ruby";


$q = $_REQUEST["q"];

$hint = "";


if ($q !== "") {
    $q = strtolower($q);
    $len=strlen($q);
    foreach($a as $name) {
        if (stristr($q, substr($name, 0, $len))) {
            if ($hint === "") {
                $hint = $name;
            } else {
                $hint .= ", $name";
            }
        }
    }
}

echo $hint === "" ? "no suggestion" : $hint;
?>