(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-4")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var radius = 100;

  var radiusScale = d3.scaleLinear()
    .domain([0, 100])
    .range([20, radius]);

  // since you probably don't want to type them,
  // and i won't make you use .map later, the months are
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'rando'];

  var angleScale = d3.scalePoint()
    .domain(months)
    .range([0, Math.PI * 2]);

  var radialArea = d3.radialArea()
    .angle(function(d) {
      return angleScale(d.month)
    })
    .outerRadius(function(d) {
      return radiusScale(d.high);
    })
    .innerRadius(function(d){
      return radiusScale(d.low)
    })

    var colorScale = d3.scaleLinear()
      .domain([15, 100])
      .range(["#80bfff", "#ff6666"]);


  d3.queue()
    .defer(d3.csv, "data/ny-temps.csv")
    .await(ready)

  function ready(error, datapoints) {
    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    datapoints.push(datapoints[0]);

    g.selectAll("circle")
      .data([20, 30, 40, 50, 60, 70, 80, 90, 100])
      .enter().append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", function(d) {
        return radiusScale(d)
      })
      .attr("fill", "none")
      .attr("stroke", 'lightgray')

    g.append("path")
      .datum(datapoints)
      .attr("d", radialArea)
      .attr("stroke", "none")
      .attr("fill", "lightblue")
      .attr("opacity", 0.7)

    g.append("text")
     .text("NYC")
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", 20)
     .attr("font-weight", "600")
     .attr("x", 0)
     .attr("y", 8)

    g.selectAll(".temp-label")
     .data([20, 40, 60, 80])
     .enter().append("text")
     .text(function(d){
       return d + "°"
     })
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", 5)
     .attr("stroke", "lightgray")
     .attr("x", 0)
     .attr("y", function(d){
       return -radiusScale(d) -10;
     })




  }
})();
