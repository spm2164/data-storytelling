(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal().range(['#7fc97f', '#beaed4', '#fdc086'])

  var radius = 100;

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var pie = d3.pie()
    .value(function(d){
      return d.minutes;
    });
  //  .sort(null);

  var labelArc = d3.arc()
      .outerRadius(radius + 40)
      .innerRadius(radius - 30);

  d3.queue()
    .defer(d3.csv, "data/time-breakdown.csv")
    .await(ready);

  function ready(error, datapoints) {

    var pieContainer = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    pieContainer.selectAll("path")
      .data(pie(datapoints))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", function(d){
        return colorScale(d.data.task);
      });


    pieContainer.selectAll("text")
      .data(pie(datapoints))
      .enter().append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.task; })
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", function(d) {
      	if(d.startAngle > Math.PI) {
      	  return "end"
      	} else {
      	  return "start"
      	}
      });

  }
})();
