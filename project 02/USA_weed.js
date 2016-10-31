(function() {

  Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};

  var margin = { top: 30, left: 30, right: 30, bottom: 30},
  height = 500 - margin.top - margin.bottom,
  width = 960 - margin.left - margin.right;


  var svg = d3.select("#USA")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleLinear().domain([100, 400]).range(["#74c476", "#00441b"])

  queue()
    .defer(d3.json, "USA.json")
    .defer(d3.json, "weed.json")
    .await(ready)

  function ready(error, usa, data) {

    var projection = d3.geoAlbersUsa()
      .translate([width/2, height/2])
      .scale([1000]);

    var path = d3.geoPath()
      .projection(projection);

    for (var j=0; j<usa.features.length; j++){

      var jState = usa.features[j].properties.NAME;

      for (var i=0; i<51; i++){

        if (jState === data.state[i]){
           usa.features[j].properties.HighQ=data.HighQ[i];
           usa.features[j].properties.MedQ=data.MedQ[i];
           usa.features[j].properties.LowQ=data.LowQ[i];
        }
      }
    }


    //console.log(usa)

    svg.selectAll("path")
      .data(usa.features)
      .enter().append("path")
      .attr("d", path)
      .attr("opacity", 0.7)
      .attr("fill", function(d){
        var HighQ = d.properties.HighQ;
        return colorScale(d3.mean(Object.values(HighQ)));
      })
      .on("mouseover", function(){
        d3.select(this)
          .attr("opacity", 0.85)})
      .on("mouseout", function(){
        d3.select(this)
          .attr("opacity", 0.7)})

      d3.select("#HighQ")
        .on('click', function(){
          d3.selectAll('path')
            .transition()
            .duration(1000)
            .attr("fill", function(d){
              var HighQ = d.properties.HighQ;
              return colorScale(d3.mean(Object.values(HighQ)));
            })
        })

      d3.select("#MedQ")
        .on('click', function(){
          d3.selectAll('path')
            .transition()
            .duration(1000)
            .attr("fill", function(d){
              var MedQ = d.properties.MedQ;
              return colorScale(d3.mean(Object.values(MedQ)));
            })
        })

      d3.select("#LowQ")
        .on('click', function(){
          d3.selectAll('path')
            .transition()
            .duration(1000)
            .attr("fill", function(d){
              var LowQ = d.properties.LowQ;
              return colorScale(d3.mean(Object.values(LowQ)));
            })
        })


  }
})();
