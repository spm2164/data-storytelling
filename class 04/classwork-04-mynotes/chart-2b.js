(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-2b")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal().range(['red', 'orange', 'blue'])

  var radius = 100;

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var labelArc = d3.arc()
      .outerRadius(radius + 10)
      .innerRadius(radius + 10);

  var pie = d3.pie()
    .value(function(d) { 
      return d.count;
    })
    .sort(null);

  d3.queue()
    .defer(d3.csv, "1854-11.csv")
    .await(ready)

  function ready(error, datapoints) {
    pieHolder = svg.append("g").attr("transform", "translate(300,200)");

    var g = pieHolder.selectAll(".arc")
        .data(pie(datapoints))
        .enter().append("g");

    g.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          // you need to use d.data
          return colorScale(d.data.cause_of_death);
        })

    g.append("text")
      .attr("transform", function(d) { 
        return "translate(" + labelArc.centroid(d) + ")"; 
      })
      .attr("text-anchor", function(d) {
        if(d.startAngle + d.endAngle / 2 < Math.PI) {
          return 'start';
        } else {
          return 'end';
        }
      })
      .text(function(d) { 
        return d.data.cause_of_death; 
      });

  }
})();