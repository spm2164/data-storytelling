(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 1080 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3b")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var cityNames = ['NYC', 'Tuscon', 'Lima', 'Beijing', 'Melbourne', 'Stockholm'];

  var radiusScale = d3.scaleLinear().domain([20, 120]).range([15, 100])

  var arc = d3.arc()
    .outerRadius(function(d){
      return radiusScale(d.data.high);
    })
    .innerRadius(0);

  var pie = d3.pie()
    .sort(null)
    .value(1/12);

  var colorScale = d3.scaleLinear()
    .domain([15, 100])
    .range(["#80bfff", "#ff6666"]);

  //console.log(colorScale.domain())

  var x = d3.scalePoint()
    .domain(cityNames)
    .range([0, width])
    .padding(50)

  d3.queue()
    .defer(d3.csv, "data/all-temps.csv")
    .await(ready)

  function ready(error, datapoints) {

    //console.log(datapoints)

    // colorScale.domain([function(d){return d3.min(d.low)},
    //                    function(d){return d3.max(d.high)}])

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

      multiples.append("text")
        .text(function(d){return d.key})
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("x", 0)
        .attr("y", 100)
        .attr("text-anchor", "middle");

      multiples.each(function(d){
        d3.select(this).selectAll("path")
          .data(pie(d.values))
          .enter().append("path")
          .attr("d", arc)
          .attr("fill", function(d){
            return colorScale(d.data.high);
          })
        })

  }
})();
