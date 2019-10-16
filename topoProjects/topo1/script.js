// https://medium.com/@aendrew/creating-topojson-using-d3-v4-10838d1a9538
// https://bl.ocks.org/piwodlaiwo/7d65515de5d1a8bf4b8699d61f5a09b7
// http://bl.ocks.org/harlantwood/6900108
// https://bost.ocks.org/mike/map/
// http://bl.ocks.org/jczaplew/4444770
// resources

var svg = d3.select("body")
            .append("svg")
            .attr("width", window.innerWidth+"px")
            .attr("height", window.innerHeight+"px")            

var projection = d3.geoMercator().scale(window.innerWidth/8).translate([window.innerWidth / 2, window.innerHeight / 2]);
var mapData
var draw = (mapData) => {
    var path = d3.geoPath().projection(projection);
    var url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json";
    if (!mapData) {
        d3.json(url).then( data => {
            mapData = data
            svg.selectAll("path")
            .data(topojson.feature(data, data.objects.countries).features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke:hover", "red")
        })
    } else {
        svg.selectAll("path")
        .data(topojson.feature(mapData, mapData.objects.countries).features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke:hover", "red")
    }   

}

var resize = () => {
    svg.selectAll("path").remove();
    projection.scale(window.innerWidth/8).translate([window.innerWidth / 2, window.innerHeight / 2]);
    draw()
  }

draw()

window.onresize = resize;