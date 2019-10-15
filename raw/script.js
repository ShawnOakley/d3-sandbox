// 3 Types of scales
// Quantitative - for continuous input domains
// Ordinal - for discrete input domains
// Time scales - for time domains

var barData = [];

for (var i = 0; i < 100; i++) {
    barData.push(Math.round(Math.random()*30))
}

var height = 400,
    width  = 600,
    barWidth  = 50,
    barOffset = 5;

var colors = d3.scaleLinear()
                .domain([0, barData.length*.33, barData.length*.66, barData.length])
                .range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])

var yScale = d3.scaleLinear()
                .domain([0, d3.max(barData)])
                .range([0, height])

var xScale = d3.scaleBand()
                .domain(d3.range(0, barData.length))
                .range([0, width])

var tooltip = d3.select('body').append('div')
                    .style('position', 'absolute')
                    .style('padding', '0 10px')
                    .style('background', 'white')
                    .style('opacity', 0)

var tempColor;

var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(barData)
    .enter().append('rect')
        .style('fill', '#C61C6F')
        .attr('width', function(d) {
            return xScale.bandwidth();
        })
        .attr('x', function (d, i) {
            return xScale(i)
        })
        .attr('height', function(d) {
            return 0;
        })        
        .attr('y', function(d) {
            return height;
        })
        .style('fill', function(d, i) {
            return colors(i)
        })
        .on('mouseover', function(d){

            tooltip.transition()
                .style('opacity', .9)
            
            tooltip.html(d)
                .style('left', (d3.event.pageX-35)+'px')
                .style('top', (d3.event.pageY -30)+'px')

            tempColor = this.style.fill;
            d3.select(this)
                .style('opacity', .5)
                .style('fill', 'yellow')
        })
        .on('mouseout', function(d){
            d3.select(this)
                .style('opacity', 1)
                .style('fill', tempColor)
        })

myChart.transition()
        .attr('height', function(d) {
            return yScale(d);
        })        
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .delay(function(d,i) {
            return 20*i
        })
        .duration(1000)
        .ease('elastic')