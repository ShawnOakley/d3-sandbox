import React, { createRef, useEffect } from "react";
import * as d3 from "d3";
// https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32

export default function PieClass(props)  {
    const ref = createRef();
    const createPie = d3
        .pie()
        .value(d=>d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius)
    const colors = d3.scaleOrdinal(d3.schemeCategory10)
    const format = d3.format(".2f")

    useEffect(() => {
        const svg = d3.select(ref.current)
        const data = createPie(props.data)

        const { width, height, innerRadius, outerRadius } = props;

        svg
            .attr("class", "chart")
            .attr("width", width)
            .attr("height", height);

        // https://stackoverflow.com/questions/17057809/d3-js-what-is-g-in-appendg-d3-js-code
        const group = svg
            .append("g")
            .attr("transform", `translate(${outerRadius} ${outerRadius})`)

        const groupWithEnter = group
            .selectAll("g.arc")
            .data(data)
            .enter()

        const path = groupWithEnter.append("g").attr("class", "arc")

        path
        .append("path")
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(d.index));
  
        path
            .append("text")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text(d => format(d.value));        
    })

    return <svg ref={ref} />;  
}