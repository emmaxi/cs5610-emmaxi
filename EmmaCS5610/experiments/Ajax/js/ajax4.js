function loadXMLDoc(url) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('result').innerHTML = "Last modified: " + xmlhttp.getResponseHeader('Last-Modified');
            document.getElementById('type').innerHTML = "Server Type: " + xmlhttp.getResponseHeader('server-type');
            document.getElementById('content').innerHTML = "Content Type: " + xmlhttp.getResponseHeader('content-type');
            document.getElementById('length').innerHTML = "Length: " + xmlhttp.getResponseHeader('length');
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}