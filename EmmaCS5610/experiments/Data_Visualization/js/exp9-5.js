google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
                ['Year', 'Arizona Population', 'Massachusetts Population'],
                ['2000', 5166697, 6363015],
                ['2001', 5304417, 6411730],
                ['2002', 5452108, 6440978],
                ['2003', 5591206, 6451637],
                ['2004', 5759425, 6451279],
                ['2005', 5974834, 6453031],
                ['2006', 6192100, 6466399],
                ['2007', 6362241, 6499275],
                ['2008', 6499377, 6543595],
                ['2009', 6595778, 6593587]
            ]);


    var options = {
        title: 'Population: Arizona Vs Massachusetts',
        legend: {
            position: 'top'
        }

    };


    var chart = new google.visualization.BarChart(document.getElementById('population_bar_chart'));
    chart.draw(data, options);

    var chart = new google.visualization.LineChart(document.getElementById('population_line_chart'));
    chart.draw(data, options);

    

}