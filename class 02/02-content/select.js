(function () {

	var datapoints = [
		{ age: 17, name: "Mylo", ducks: 200 },
		{ age: 25, name: "Harper", ducks: 125 },
		{ age: 70, name: "Stretchy", ducks: 7 },
		{ age: 33, name: "Julia", ducks: 33 }
	];

	console.log("This is the console");

	var lengthScale = d3.scaleLinear()
											.domain([0, 250])
											.range([0, 437]);

	var colorScale = d3.scaleLinear()
											.domain([16,85])
											.range(['lightblue', 'red']);

	var svg = d3.select("svg");

	var xScale = d3.scalePoint()
									.domain(["Mylo", "Harper", "Stretchy", "Julia"])
									.range([100, 300]);

	svg.selectAll("circle")
		.data(datapoints)
		.enter()
		.append("circle")
		.attr("cy", 40)
		.attr("cx", function(d){
			return xScale(d.name)})
		.attr("fill", "pink")
		.attr("r", function(d){
			return d.ducks/5;})
		.attr("stroke", "black")
		// .attr("stroke-width", function(d){
		// 	return d.age/10;
		// })

	d3.selectAll("rect")
		.data(datapoints)
		.attr("width", function(d){
			return lengthScale(d.ducks);})
		.attr("fill", function(d){
			return colorScale(d.age);})


})();
