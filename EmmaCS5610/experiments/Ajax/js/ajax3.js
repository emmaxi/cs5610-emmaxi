function showHint(str) {
    console.log(str);
    var xmlhttp;
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
   
        xmlhttp = new XMLHttpRequest();
   
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","ajax3.asp?q="+ str, true);
    xmlhttp.send();
}