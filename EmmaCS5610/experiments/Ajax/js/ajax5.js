
 function search() {
    $.get(
               "ajax5.aspx",
               { company: $("#company option:selected").val() },
               function (data) {
                   var obj = eval("(" + data + ")");
                   var title = "The information of " + obj.name;
                   $("#header").html(title);
                   var introduction = "<h4>Introduction: </h4>" + obj.introduction;
                   $("#introduction").html(introduction);
                   var founder = "<h4>Founder: </h4>" + obj.founder;
                   $("#founder").html(founder);
                   var revenue = "<h4>Revenue: </h4>" + obj.revenue;
                   $("#revenue").html(revenue);
                   var place = "<h4>Place: </h4>" + obj.place;
                   $("#place").html(place);
               });
};