(function() {
  var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var actualSvg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)

  var svg = actualSvg
              .append("g")
              .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

  var xPosScale = d3.scaleLinear().domain([1, 25]).range([0, width]);
  var yPosScale = d3.scaleLinear().domain([1, 50]).range([height, 0]);

  d3.queue()
    .defer(d3.csv, "data-singleline-cimmeria.csv")
    .await(ready);

  function ready(error, datapoints) {
    console.log(datapoints);


  svg.selectAll("circle")
    .data(datapoints)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", function(d){
      return xPosScale(d.day)})
    .attr("cy", function(d){
      return yPosScale(d.temperature)})

  var xAxis = d3.axisBottom(xPosScale)
  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  var yAxis = d3.axisLeft(yPosScale);
  svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);

  }
})();
