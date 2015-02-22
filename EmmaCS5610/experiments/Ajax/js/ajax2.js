function loadXMLDoc(url) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            xmlDoc = xmlhttp.responseXML;

           
            document.getElementById('movie_name').innerHTML = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            document.getElementById('actor').innerHTML = xmlDoc.getElementsByTagName("actor")[0].childNodes[0].nodeValue;
            document.getElementById('plot_box').innerHTML = xmlDoc.getElementsByTagName("AGE")[0].childNodes[0].nodeValue;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}