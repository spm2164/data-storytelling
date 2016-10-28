(function() {
  var margin = {top: 40, right: 70, bottom: 40, left: 70},
      width = 860 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // We'll set the domain once we've read in
  // the data
  var xPositionScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  var yPositionScale = d3.scaleLinear()
    .range([height, 0]);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
    })

  var svg = d3.select("#chart-4")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  d3.queue()
    .defer(d3.csv, "data/letter-frequency.csv", function type(d) {
      d.frequency = +d.frequency;
      return d;
    })
    .await(ready)

  function ready(error, datapoints) {

    var everyLetter = datapoints.map(function(d) { return d.letter; })
    xPositionScale.domain(everyLetter);

    var frequencyMax = d3.max(datapoints, function(d) { return d.frequency; })
    yPositionScale.domain([0, frequencyMax]);

    svg.selectAll(".bar")
        .data(datapoints)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { 
          return xPositionScale(d.letter); 
        })
        .attr("y", function(d) { 
          return yPositionScale(d.frequency); 
        })
        .attr("width", xPositionScale.bandwidth())
        .attr("height", function(d) { 
          return height - yPositionScale(d.frequency); 
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

    // Set up our x axis
    var xAxis = d3.axisBottom(xPositionScale);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // set up our y axis
    var yAxis = d3.axisLeft(yPositionScale)
        .tickFormat(d3.format(".0%"));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

  };

})();