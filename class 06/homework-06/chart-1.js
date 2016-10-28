(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleLinear().domain([0,100000]).range([0, width]);
  var yPositionScale = d3.scaleLinear().domain([0,100]).range([height, 0]);
  var colorScale = d3.scaleOrdinal().range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33'])
  var radiusScale = d3.scaleSqrt().range([4, 20]).domain([0, 1400000000])

  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  d3.queue()
    .defer(d3.csv, "le_gdp_pop-2010.csv")
    .await(ready)

  function ready(error, datapoints) {
    d3.select("#country-display")
      .style("display", "none")

    colorScale.domain(function(d){
      return d.Continent;
    })

    var datapoints = datapoints.sort(function(a, b) {
      return b.Population - a.Population;
    });

    //console.log(sorted)
    //radiusScale.domain(0, d3.max(datapoints, function(d){return d.Population}))

    //console.log(d3.max(datapoints, function(d){return d.Population}))

    svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", function(d){
        return radiusScale(d.Population)
        //return d.Population
      })
      .attr("cx", function(d) {
        return xPositionScale(d.GDP_per_capita);
      })
      .attr("cy", function(d) {
        return yPositionScale(d.life_expectancy);
      })
      .attr("opacity", 0.5)
      .attr("class", function(d){
        return d.Continent.replace(" ", "").replace(".", "-")//.toLowercase()
      })
      // .attr("class", function(d){
      //   return d.Continent
      // });

    // svg.selectAll(".medium").moveToFront();
    // svg.selectAll(".small").moveToFront();
    // svg.selectAll(".tiny").moveToFront();

    svg.selectAll("circle")
      .on("mouseover", function(d){
        d3.select(this)
          //console.log("moused over", d.Country)
          .attr("fill", colorScale(d.Continent))
          .attr("opacity", 1)
        d3.select("#country-display")
          .style("display", "inline")
        d3.select("#selected")
          .text(d.Country)
          //console.log(d.Country)
        })
      .on("mouseout", function(){
        d3.select(this)
          .attr("fill", "black")
          .attr("opacity", 0.5)
        d3.select("#country-display")
          .style("display", "none")
      })

    svg.select("#selected")
      .data(datapoints)
      .enter().append("text")
      .text(function(d){
        return d.Country
      })

    d3.select("#N-America").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".N-America")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#S-America").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".S-America")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#Asia").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".Asia")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#Europe").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".Europe")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#Africa").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".Africa")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#Oceania").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 0)
      d3.selectAll(".Oceania")
      .transition()
      .duration(1000)
        .attr("r", function(d){
          return radiusScale(d.Population)
      })
    });

    d3.select("#All").on('click', function() {
      d3.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", function(d){
        return radiusScale(d.Population)
      })
    });

    d3.select("#small").on('click', function() {
      d3.selectAll("circle")
      .transition()
      .duration(1000)
      .attr("r", 0)
        .filter( function(d) {
          return d.Population < 10000000;})
        //.transition()
        //.duration(1000)
        .attr("r", function(d){
        return radiusScale(d.Population)
      })
    });

    d3.select("#nosmall").on('click', function() {
      d3.selectAll("circle")
      .transition()
      .duration(1000)
      .attr("r", 0)
        .filter( function(d) {
          return d.Population > 5000000;})
        //.transition()
        //.duration(1000)
        .attr("r", function(d){
        return radiusScale(d.Population)
      })
    });


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
