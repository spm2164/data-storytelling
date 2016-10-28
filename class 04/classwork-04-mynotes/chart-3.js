(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal().range(['red', 'orange', 'blue'])

  var xPositionScale = d3.scalePoint()
    .domain(['October', 'November', 'December'])
    .range([0, width])
    .padding(0.5);

  var radius = 60;

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
    .defer(d3.csv, "1854-monthly.csv")
    .await(ready)

  function ready(error, datapoints) {
    var nested = d3.nest()
      .key(function(d) {
        return d.month;
      })
      .entries(datapoints);


    var charts = svg.selectAll(".pie-charts")
      .data(nested)
      .enter().append("g")
      .attr("transform", function(d) {
        var yPos = 200
        var xPos = xPositionScale(d.key);
        return "translate(" + xPos + "," + yPos + ")"
      })

    charts.append("text")
      .attr("x", 0)
      .attr("y", -80)
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.key
      })

    charts.each(function(d) {
        var monthlyData = d.values;
        var g = d3.select(this);

        g.selectAll("path")
          .data(pie(monthlyData))
          .enter().append("path")
          .attr("d", arc)
          .attr("fill", function(d) {
            return colorScale(d.data.cause_of_death);
          })
      })
  }
})();