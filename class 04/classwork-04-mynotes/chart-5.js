(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-5")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var radius = 100;

  var radiusScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, radius]);
  
  var angleScale = d3.scalePoint()
    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Placeholder'])
    .range([0, Math.PI * 2]);

  var colorScale = d3.scaleLinear().domain([32, 85]).range(['blue', 'red'])

  var radialLine = d3.radialLine()
    .angle(function(d) {
      return angleScale(d.month)
    })
    .radius(function(d) {
      return radiusScale(d.high);
    })

  d3.queue()
    .defer(d3.csv, "ny-temps.csv")
    .await(ready)

  function ready(error, datapoints) {
    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    datapoints.push(datapoints[0]);

    g.selectAll(".temps")
      .data(datapoints)
      .enter().append("text")
      .attr("x", function(d) {
        var a = angleScale(d.month);
        var r = radiusScale(d.high);
        return (r + 10) * Math.sin(a);
      })
      .attr("y", function(d) {
        var a = angleScale(d.month);
        var r = radiusScale(d.high);
        return (r + 10) * Math.cos(a) * -1;
      })
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text(function(d) {
        return d.high;
      })

    g.selectAll(".month-line")
      .data(datapoints)
      .enter().append("line")
      .attr("x0", 0)
      .attr("y0", 0)
      .attr("x1", function(d) {
        var a = angleScale(d.month);
        var r = radiusScale(d.high);
        return r * Math.sin(a);
      })
      .attr("y1", function(d) {
        var a = angleScale(d.month);
        var r = radiusScale(d.high);
        return r * Math.cos(a) * -1;
      })
      .attr("stroke", function(d) {
        return colorScale(d.high);
      })
      .attr("stroke-width", 2)



  }
})();