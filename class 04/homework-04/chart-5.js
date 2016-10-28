(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 450 - margin.top - margin.bottom,
    width = 1080 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-5")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var cityNames = ['NYC', 'Tuscon', 'Lima', 'Beijing', 'Melbourne', 'Stockholm'];

  var radius = 60;

  var radiusScale = d3.scaleLinear()
    .domain([0, 100])
    .range([20, radius]);

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

  var x = d3.scalePoint()
    .domain(cityNames)
    .range([0, width])
    .padding(50)

  d3.queue()
    .defer(d3.csv, "data/all-temps.csv")
    .await(ready)

  function ready(error, datapoints) {



    var nested = d3.nest()
      .key(function(d){
        return d.city;
      })
      .entries(datapoints);

    var multiples = svg.selectAll("g")
      .data(nested)
      .enter().append("g")
      .attr("transform", function(d){
        var xPos = x(d.key)
        return "translate(" + xPos + ",100)";
      })

      multiples.each(function(d){
        d3.select(this).selectAll("circle")
      .data([20, 30, 40, 50, 60, 70, 80, 90, 100])
      .enter().append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", function(d) {
        return radiusScale(d)
      })
      .attr("fill", "none")
      .attr("stroke", 'lightgray')
    })

    multiples.append("path")
      .data(nested)
      .attr("d", function(d){
        d.values.push(d.values[0])
        return radialArea(d.values) })
      .attr("stroke", "none")
      .attr("fill", "pink")
      .attr("opacity", 0.7)

    multiples.append("text")
     .data(nested)
     .text(function(d){
       return d.key
     })
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", 10)
     .attr("font-weight", "600")
     .attr("x", 0)
     .attr("y", 5)

    multiples.selectAll(".temp-label")
     .data([20, 40, 60, 80])
     .enter().append("text")
     .text(function(d){
       return d + "°"
     })
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", 3)
     .attr("stroke", "lightgray")
     .attr("x", 0)
     .attr("y", function(d){
       return -radiusScale(d) -5;
     })





  }
})();
