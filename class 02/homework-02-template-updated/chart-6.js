// Sean Moriarty
// Sept 21, 2016
// makes a chart, or something
(function() {
	// Insert your data here
	var data = [];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 6");

	var svg = d3.select("#chart-6")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.top + "," + margin.left + ")");

	// Create any scales you might need

	// Create and style your elements

})();
