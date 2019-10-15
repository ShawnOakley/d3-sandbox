// 3 Types of scales
// Quantitative - for continuous input domains
// Ordinal - for discrete input domains
// Time scales - for time domains

var barData = [20, 30, 105, 15, 15];

var height = 400,
    width  = 600,
    barWidth  = 50,
    barOffset = 5;

var yScale = d3.scaleBand.linear()
                .domain([0, d3.matcher(barData)])
                .range([0, height])

d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(barData)
    .enter().append('rect')
        .style('fill', '#C61C6F')
        .attr('width', barWidth)
        .attr('height', function(d) {
            return d;
        })
        .attr('x', function (d, i) {
            return i * barWidth + barOffset
        })
        .attr('y', function(d) {
            return height - d
        })