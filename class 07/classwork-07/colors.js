(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 800 - margin.top - margin.bottom,
    width = 616 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#graphic")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.queue()
    .defer(d3.csv, "colors.csv")
    .await(ready)

  // for inspiration:
  // hue, 0-360
  var angleScaleHue = d3.scaleLinear().domain([0, 360]).range([0, Math.PI * 2]);
  // lightness, 0-100
  var radiusScaleLightness = d3.scaleLinear().domain([0, 100]).range([0, 200]);

  function ready(error, datapoints) {

    // var colCount = 6;
    // var rowSpacing = 22;
    // var xPositionScale = d3.scaleLinear().domain([0, colCount]).range([0, width])

    svg.selectAll(".colordot")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "colordot")
      .attr("r", 0)
      .attr("fill", function(d){
        return d.color;
      })
      // .attr("cx", 0)
      // .attr("cy", 0)

    d3.select("#slide-1")
      .on("slidein", function(){
        console.log("slid in 1")
    })

    d3.select("#slide-1")
      .on("slideout", function(){
          svg.selectAll(".colordot")
            .filter(function(d){
              return d.name_chinese != "";
            })
            .transition().duration(500)
            .attr("r", 4)
            .attr("cy", function(d){
              var a=angleScaleHue(d.Hue);
              var r=radiusScaleLightness(d.Lightness);
              return r*Math.cos(a) + height/2;
            })
            .attr("cx", function(d){
              var a=angleScaleHue(d.Hue);
              var r=radiusScaleLightness(d.Lightness);
              return r*Math.sin(a) + width/2;
            })
      })

    // d3.select("#slide-2")
    //
    // })

    d3.select("#slide-2")
    .on("slideout", function(){
        svg.selectAll(".colordot")
          .filter(function(d){
            return d.name_chinese != "";
          })
          .transition().duration(500)
          .attr("r", 4)
          .attr("cy", function(d){
            var a=angleScaleHue(d.Hue);
            var r=radiusScaleLightness(d.Saturation);
            return r*Math.cos(a) + height/2;
          })
          .attr("cx", function(d){
            var a=angleScaleHue(d.Hue);
            var r=radiusScaleLightness(d.Saturation);
            return r*Math.sin(a) + width/2;
          })
      })

    d3.select("#slide-3")
      .on("slidein", function(){
        console.log("slid in 3")
    })

    d3.select("#slide-3")
      .on("slideout", function(){
        console.log("slid out 3")
      })

    d3.select("#slide-4")
      .on("slidein", function(){
        console.log("slid in 4")
    })

    d3.select("#slide-4")
      .on("slideout", function(){
        console.log("slid out 4")
      })
  }
})();
