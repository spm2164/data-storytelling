(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 4");

	var svg = d3.select("#chart-4")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var xPositionScale = d3.scaleLinear().range([0, width]);
	var yPositionScale = d3.scaleLinear().range([height, 0]);

	// Do you need a d3.line function for this? Maybe something similar?
	var line = d3.line()
							.x(function(d){return xPositionScale(d.year)})
							.y(function(d){return yPositionScale(d.value)})
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

		var nested = d3.nest()
									.key(function(d){
										return d.Country })
									.entries(datapoints);
		console.log(nested)

		var node = svg.selectAll("g")
									.data(datapoints)
									.enter()
									.append("g")
		// Draw your dots
		// When coloring them, an if statement might come in handy!
		node.append("circle")
			//.data(datapoints)
			//.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d){
				if (d.Country === "France" && d.year === 2014){
					return 5}
				else {
					return 2
				}})
			.attr("cx", function(d){
				//console.log(d.year)
				return(xPositionScale(d.year)) })
			.attr("cy", function(d){
				//console.log(d.value)
				return(yPositionScale(d.value)) })
			.attr("fill", function(d){
				if (d.Country === "France"){
						return "blue"; }
				else { return "gray" }});

		node.append("text")
				.attr("x", function(d){
					return(xPositionScale(d.year)-20) })
				.attr("y", function(d){
					return(yPositionScale(d.value)-7) })
				.attr("fill", "blue")
				.text(function(d){
					if (d.Country === "France" && d.year === 2014)
						return d.Country})

		// Draw your lines
		// When coloring them, an if statement might come in handy!
		svg.selectAll(".pollution-lines")
			.data(nested)
			.enter().append("path")
			.attr("d", function(d){
				return line(d.values) })
			.attr("fill", "none")
			.attr("stroke", function(d){
				if (d.key === "France"){
						return "blue"; }
				else { return "gray" }});
			//.attr("opacity", 0.5);

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
