(function() {
  var margin = { top: 30, left: 50, right: 30, bottom: 50},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleLinear().domain([1,25]).range([0, width]);
  var yPositionScale = d3.scaleLinear().domain([0,50]).range([height, 0]);

  // Create our line function
  var line = d3.line()
    .x(function(d) {
      return xPositionScale(d.day);
    })
    .y(function(d) {
      return yPositionScale(d.temperature);
    })

  // Read in our data
  d3.queue()
    .defer(d3.csv, "data/temperature-cimbria.csv")
    .await(ready);

  function ready(error, datapoints) {

    svg.append("path")
      .datum(datapoints)
      .attr("d", line) 
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
    
    // Add in axes

    var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", 15)
      .attr("y", 16)
      .text("Day");

    var yAxis = d3.axisLeft(yPositionScale)
      .tickFormat(function(d) {
        return d3.format("d")(d) + "°"
      });

    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);
;
  }

})();