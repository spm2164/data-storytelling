(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	padding = {top: 60, right: 60, bottom: 60, left: 60},
	height = 500 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 5");

	var svg = d3.select("#chart-5")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scalePoint().range([0 + padding.right, width - padding.left]).domain(["cat", "dog", "mouse"]);
	var y = d3.scalePoint().range([height - padding.bottom, 0 + padding.top]).domain(["small", "medium", "large"]);
	var circleScale = d3.scaleSqrt().range([10, 50]).domain([2, 50]);

	// Tip: you're using different scales this time.
	// Once you're done, you'll notice it doesn't quite look right, the points
	// are smushed up against the axes. Maybe read the documentation to change it?
	// https://github.com/d3/d3-scale#point-scales

	d3.queue()
		.defer(d3.csv, "animal-sizes.csv", function(d){
			d.amount = +d.amount;
			return d;
		})
		.await(ready);

	function ready(error, datapoints) {
		// Add your circles

		svg.selectAll("circle")
			.data(datapoints)
			.enter().append("circle")
			.attr("r", function(d){
				return circleScale(d.amount) })
			.attr("cx", function(d){
				console.log(x(d.breed))
				return x(d.breed) })
			.attr("cy", function(d){
				//console.log(d.Value)
				return y(d.size) });


		// You might need to adjust transform/translate of your axes
		// along with the margins up top to put your axes in the right place!

		var xAxis = d3.axisBottom(x)
		svg.append("g")
			.attr("class", "axis x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		var yAxis = d3.axisLeft(y);
		svg.append("g")
			.attr("class", "axis y-axis")
			.call(yAxis);

	}
})();
