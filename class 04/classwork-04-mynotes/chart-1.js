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

  d3.queue()
    .defer(d3.csv, "arc-data.csv")
    .await(ready)

  function ready(error, datapoints) {
    // This is an ARC GENERATOR.
    // We used d3.line() to make lines
    // and d3.area() to make areas
    // and now we use d3.arc to make arc

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(20)
      .startAngle(0)
      .endAngle(1);

    var arcHolder1 = svg.append("g").attr("transform", "translate(100,100)");

    arcHolder1.append("path")
      .attr('d', arc)
      .attr('fill', 'pink');

    var arcHolder2 = svg.append("g").attr("transform", "translate(300,100)");

    // You can change parts of the generator
    // at a time - this one has the same startAngle and outerRadius
    arc.endAngle(Math.PI / 2).outerRadius(100)

    arcHolder2.append("path")
      .attr('d', arc)
      .attr('fill', 'black');

    arc.startAngle(Math.PI).endAngle(Math.PI * 1.25).innerRadius(75);
    
    arcHolder2.append("path")
      .attr('d', arc)
      .attr('fill', 'red');

    arc.startAngle(Math.PI * 1.25).endAngle(Math.PI * 2).innerRadius(0).outerRadius(50);
    
    arcHolder2.append("path")
      .attr('d', arc)
      .attr('fill', 'orange');

    arcHolder2.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 20)
      .attr("fill", "purple")

  }
})();