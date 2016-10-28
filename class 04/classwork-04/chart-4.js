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
    .domain([15, 90])
    .range([0, radius]);

  var angleScale = d3.scalePoint()
    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'])
    .range([0, Math.PI * 2]);

  var line = d3.radialLine()
    .radius(function(d){
      return radiusScale(d.high);
    })
    .angle(function (d){
      return angleScale(d.month);
    })

  var colorScale = d3.scaleLinear().domain([0, 100]).range(['lightblue', 'pink'])

  d3.queue()
    .defer(d3.csv, "ny-temps.csv")
    .await(ready)

  function ready(error, datapoints) {

    var container
  }
})();
