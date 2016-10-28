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
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(100)
                .startAngle(0)
                .endAngle(Math.PI / 2);


    var arcContainer = svg.append("g")
                          .attr("transform", "translate(100,250)");

    arcContainer.append("path")
      .attr("d", arc)

    arc.outerRadius(120)
       .startAngle(Math.PI / 2)
       .endAngle(Math.PI * 0.75);

    arcContainer.append("path")
      .attr("d", arc)
      .attr("fill", "pink")

    arc.outerRadius(80)
       .innerRadius(65)
       .startAngle(Math.PI * 1.25)
       .endAngle(Math.PI * 1.5);

    arcContainer.append("path")
      .attr("d", arc)
      .attr("fill", "green")

    arc.outerRadius(65)
       .innerRadius(0)
       .startAngle(Math.PI * 1.5)
       .endAngle(Math.PI * 1.85);

    arcContainer.append("path")
       .attr("d", arc)
       .attr("fill", "purple");

    // We used d3.line() to make lines
    // and d3.area() to make areas
    // and now we use d3.arc to make arc

  }
})();
