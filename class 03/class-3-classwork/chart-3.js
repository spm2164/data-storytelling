(function() {
  var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

  var xPositionScale = d3.scaleLinear().domain([1,25]).range([0, width]);
  var yPositionScale = d3.scaleLinear().domain([0,50]).range([height, 0]);

  // Create our line function
  var line = d3.line()
        .x(function(d){
          return xPositionScale(d.day) })
        .y(function(d){
          return yPositionScale(d.temperature) });

  // Read in our data
  d3.queue()
    .defer(d3.csv, "data-singleline-cimmeria.csv")
    .await(ready);

  function ready(error, datapoints) {

  svg.append("path")
    .datum(datapoints)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "green");

  svg.selectAll(".cimmeriaCirle")
    .data(datapoints)
    .enter().append("circle")
    .attr("class", "cimmeriaCirle")
    .attr("fill", "green")
    .attr("r", 3)
    .attr("cx", function(d){
      return xPositionScale(d.day)})
    .attr("cy", function(d){
      return yPositionScale(d.temperature)});

  var xAxis = d3.axisBottom(xPositionScale)
  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  var yAxis = d3.axisLeft(yPositionScale);
  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);
  }

})();
