import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BudgetChart = ({ budget, expenses }) => {
    const ref = useRef();

    console.log("budget chart", budget)
    useEffect(() => {
        const data = [
            { label: 'Budget', value: budget },
            { label: 'Expenses', value: expenses.toFixed(2) },
        ];

        const width = 300;
        const height = 200;
        const svg = d3.select(ref.current)
            .html('')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, width])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.2])
            .range([height - 20, 0]);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.label))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', d => height - 20 - y(d.value))
            .attr('fill', d => d.label === 'Budget' ? '#3182CE' : '#E53E3E');

        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(d => d.value)
            .attr('x', d => x(d.label) + x.bandwidth() / 2)
            .attr('y', d => y(d.value) - 5)
            .attr('text-anchor', 'middle');
    }, [budget, expenses]);

    return <div ref={ref}></div>;
};

export default BudgetChart;
