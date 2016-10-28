(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 3");

	var svg = d3.select("#chart-3")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var xPositionScale = d3.scaleLinear().range([0, width]);
	var yPositionScale = d3.scaleLinear().range([height, 0]);
	var colorScale = d3.scaleOrdinal(["red", "orange", "yellow"])//(d3.schemeCategory10);

	// Do you need a d3.line function for this? Maybe something similar?
	var line = d3.area()
							.x0(function(d){return xPositionScale(d.year)})
							.y0(function(d){return yPositionScale(d.value)})
							.y1(height)
							.curve(d3.curveMonotoneX);
	// Import your data file using d3.queue()
	d3.queue()
    .defer(d3.csv, "air-emissions.csv", function(d){
			d.value = +d.Value;
			d.year = +d.Year;
			//console.log(d.value, d.year)
			return d;
		})
    .await(ready);

	// Fix up the function definition! It doesn't just get an error...
	function ready(error, datapoints) {

		var minTime = d3.min(datapoints, function(d) { return d.year });
	  var maxTime = d3.max(datapoints, function(d) { return d.year });
	  xPositionScale.domain([minTime, maxTime]);

	  var minValue = d3.min(datapoints, function(d) {return d.value});
	  var maxValue = d3.max(datapoints, function(d) {return d.value});
	  yPositionScale.domain([minValue, maxValue]);

		// Draw your dots
		svg.selectAll("circle")
			.data(datapoints)
			.enter().append("circle")
			.attr("r", 2)
			.attr("cx", function(d){
				//console.log(d.year)
				return(xPositionScale(d.year)) })
			.attr("cy", function(d){
				//console.log(d.value)
				return(yPositionScale(d.value)) })
			.attr("fill", function(d){
				return colorScale(d.Country) });

		// Draw your areas (make sure you can see through them a little!)
		var nested = d3.nest()
									.key(function(d){
										return d.Country })
									.entries(datapoints);
	//	console.log(nested)

		svg.selectAll(".pollution-lines")
			.data(nested)
			.enter().append("path")
			.attr("d", function(d){
				return line(d.values) })
			.attr("stroke", "none")
			.attr("fill", function(d){
				return colorScale(d.key)
			})
			.attr("opacity", 0.5);

		// Add your axes
		var xAxis = d3.axisBottom(xPositionScale)
		svg.append("g")
			.attr("class", "axis x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		var yAxis = d3.axisLeft(yPositionScale);
		svg.append("g")
			.attr("class", "axis y-axis")
			.call(yAxis);
  	}
})();
