(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 400 - margin.top - margin.bottom,
    width = 616 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleLinear().domain([0,90000]).range([0, width]);
  var yPositionScale = d3.scaleLinear().domain([40,90]).range([height, 0]);
  var colorScale = d3.scaleLinear().domain([0,10000]).range(['#ef8a62', '#67a9cf'])

  d3.queue()
    .defer(d3.csv, "le_gdp_pop-2010.csv")
    .await(ready)

  function ready(error, datapoints) {
    svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", 4)
      .attr("cx", function(d) {
        return xPositionScale(d.GDP_per_capita)
      })
      .attr("cy", function(d) {
        return yPositionScale(d.life_expectancy)
      })
      .attr("fill", function(d) {
        return colorScale(d.GDP_per_capita)
      })
      .attr("stroke-width", 0.25)
      .attr("stroke", "black")

    var xAxis = d3.axisBottom(xPositionScale);
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis);

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis);

  }
})();