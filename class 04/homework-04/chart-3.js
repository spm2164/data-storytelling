(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //var radius = 100;

  var arc = d3.arc()
    .outerRadius(function(d){
      return d.data.high;
    })
    .innerRadius(0);

  var pie = d3.pie()
    .sort(null)
    .value(1/12);

  var colorScale = d3.scaleLinear()
    .domain([25, 90])
    .range(["#80bfff", "#ff6666"]);

  d3.queue()
    .defer(d3.csv, "data/ny-temps.csv")
    .await(ready)

  function ready(error, datapoints) {

    var pieContainer = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    pieContainer.selectAll("path")
      .data(pie(datapoints))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", function(d){
        return colorScale(d.data.high);
      });

    pieContainer.append("text")
      .text("NYC high temperatures, by month")
      .attr("font-weight", "600")
      .attr("font-family", "sans-serif")
      .attr("font-size", 18)
      .attr("x", 0)
      .attr("y", -75)
      .attr("text-anchor", "middle");

  }
})();
