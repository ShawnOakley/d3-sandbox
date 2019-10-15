// 3 Types of scales
// Quantitative - for continuous input domains
// Ordinal - for discrete input domains
// Time scales - for time domains

var barData = [20, 30, 105, 15, 15];

var height = 400,
    width  = 600,
    barWidth  = 50,
    barOffset = 5;

var yScale = d3.scaleLinear()
                .domain([0, d3.max(barData)])
                .range([0, height])

var xScale = d3.scaleBand()
                .domain(d3.range(0, barData.length))
                .range([0, width])

d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(barData)
    .enter().append('rect')
        .style('fill', '#C61C6F')
        .attr('width', function(d) {
            return xScale.bandwidth();
        })
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function (d, i) {
            return i * barWidth + barOffset
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })