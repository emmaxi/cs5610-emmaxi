
function loadXMLDoc() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("effectZone").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "ajax1.txt", true);
    xmlhttp.send();
}