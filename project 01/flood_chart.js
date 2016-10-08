(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 20000 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#flood_chart")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // var arc = d3.arc()
  //   .innerRadius(0)
  //   .outerRadius(20)
  //   .startAngle(Math.PI)
  //   .endAngle(0);
  var line = d3.svg.line()
    .x(function(d) {return x(d.year)})
    .y(function(d) {return y(d.cost_int)})
    .interpolate(function(points) { return points.join("A 1,1 0 0 1 "); })
    //.curve(d3.curveCardinal.tension(1))



  //var x = d3.scaleBand().rangeRound([0, width])//.padding(.1);
  // var x = d3.scaleLinear().range([0, width]).domain([1903, 2014]);
  // var y = d3.scaleLinear().range([height-20, 0])
  //   .domain([500000000, 55000000000]);

  var x = d3.scale.linear().range([0, width]).domain([1903, 2014]);
  var y = d3.scale.linear().range([height-100, 0])
    .domain([500000000, 55000000000]);

  //var xAxis = d3.axisBottom().scale(x);
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  queue()
    .defer(d3.csv, "floods.csv", function(d){
      d.year = +d.year;
      d.cost_int=d.cost_int;
      return d;
    })
    .await(ready)

  function ready(error, datapoints) {

    //x.domain(datapoints.map(function(d) { return d.year; }));
    //y.domain([0, d3.max(datapoints, function(d) { return d.cost_int; })]);

    console.log(x.domain())
    console.log(y.domain())

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // svg.selectAll("rect")
    //   .data(datapoints)
    //   .enter().append("rect")
    //   .attr("x", function(d){
    //     console.log(x(d.year))
    //     return(x(d.year))
    //   })
    //   .attr("y", function(d){
    //     console.log(y(d.cost_int))
    //     return(y(d.cost_int))
    //   })
    //   .attr("fill", "blue")
    //   .attr("width", 2)
    //   .attr("height", function(d) { return height - y(d.cost_int); })
      //.text(function(d){return d.cost_str})

    peaks = svg.selectAll(".peak")
      .data(datapoints)
      .enter().append("circle")
      .attr("cx", function(d){
          return(x(d.year))
        })
      .attr("cy", function(d){
          return(y(d.cost_int))
        })
      .attr("r", 2)
      .attr("fill", "blue")


    svg.append("path")
      .datum(datapoints)
      .attr("class", "line")
      //.enter().append("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue")

    var fillArea = d3.svg.area()
      .x(line.x())
      .y0(line.y())
      .y1(height);

    // svg.append("path")
    //   .datum(datapoints)
    //   .attr("d", fillArea)
    //   .attr("fill", "blue")



  //console.log(datapoints)


  }
})();
