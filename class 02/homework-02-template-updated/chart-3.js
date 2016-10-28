// Sean Moriarty
// Sept 21, 2016
// displays a scatterplot of weight over ages, and then sized by times arrested
(function() {
	var data = [
		{"name":"Susu","animal":"dog","favorite_food":"cats","age":4,"lbs":40,"times_arrested":3},
		{"name":"Puddin","animal":"dog","favorite_food":"pizza","age":10,"lbs":50,"times_arrested":2},
		{"name":"Max","animal":"dog","favorite_food":"cats","age":3,"lbs":7,"times_arrested":20},
		{"name":"Benny","animal":"cat","favorite_food":"cat food","age":1,"lbs":3,"times_arrested":0},
		{"name":"Mylo","animal":"cat","favorite_food":"cat food","age":10,"lbs":9,"times_arrested":1},
		{"name":"Mavis","animal":"cat","favorite_food":"pizza","age":13,"lbs":12,"times_arrested":1},
		{"name":"Libby","animal":"dog","favorite_food":"cat food","age":4,"lbs":10,"times_arrested":12}
	];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 3");

	var svg = d3.select("#chart-3")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.top + "," + margin.left + ")");

	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);
	var circleScale = d3.scaleLinear().range([1, 20]);

	x.domain([0, d3.max(data, function(d) { return d.age; })]);
	y.domain([0, d3.max(data, function(d) { return d.lbs; })]);
	circleScale.domain([0, d3.max(data, function(d) { return d.times_arrested; })]);

	var xAxis = d3.axisBottom()
			.scale(x)

	var yAxis = d3.axisLeft()
			.scale(y)
			.ticks(10);

	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Age");

	svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", function(d){
			return circleScale(d.times_arrested)})
    .attr("cx", function(d){
      return x(d.age)})
    .attr("cy", function(d){
      return y(d.lbs)})
})();
