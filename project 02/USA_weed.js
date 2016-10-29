(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#USA")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  queue()
    .defer(d3.json, "USA.json")
    .defer(d3.csv, "marijuana-street-price-clean.csv")
    .await(ready)

  function ready(error, usa, data) {

    var projection = d3.geoAlbersUsa()
      .translate([width/2, height/2])
      .scale([1000]);

    var path = d3.geoPath()
      .projection(projection);

    for (var j=0; j<usa.features.length; j++){

      var jState = usa.features[j].properties.NAME;
      //console.log(jState)
      for (var i=0; i<data.length; i++){
        var State = data[i].State;
        var dDate = data[i].date;
        var PriceH = data[i].HighQ;
        var PriceM = data[i].MedQ;
        var PriceL = data[i].LowQ;
        var dataPoint = [State, dDate, PriceH, PriceM, PriceL]
        //console.log(dataPoint);
        // if (jState === dataPoint.State){
        //   console.log("match");
        //   usa.features[j].properties.prices.push(dataPoint);
        //  }
        // else{
        //   console.log("no match")
        // }
        //console.log(i, dataPoint)

      }
    }


    console.log(usa)

    svg.selectAll("path")
      .data(usa.features)
      .enter().append("path")
      .attr("d", path)
      .attr("opacity", 0.75)
      .attr("fill", "red")
      .on("mouseover", function(){
        d3.select(this)
          .attr("fill", "blue")})
      .on("mouseout", function(){
        d3.select(this)
          .attr("fill", "red")})


  }
})();
