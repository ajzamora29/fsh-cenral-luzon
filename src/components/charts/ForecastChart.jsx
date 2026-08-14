// src/components/charts/ForecastChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { COLORS } from "../../utils/colors";

export default function ForecastChart({ data, historicalData, title }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!data || data.length === 0) {
      d3.select(ref.current).selectAll("*").remove();
      d3.select(ref.current)
        .append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .style("font-family", "Sarabun, sans-serif")
        .style("font-size", "14px")
        .style("fill", COLORS.sub)
        .text("No forecast data available");
      return;
    }

    // Increased bottom margin for legend
    const margin = { top: 30, right: 30, bottom: 80, left: 70 };
    const width = ref.current.clientWidth || 700;
    const height = 420; // Slightly taller
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // ==== 1. GET CURRENT YEAR AND CALCULATE WINDOW ====
    const today = new Date();
    const currentYear = today.getFullYear();
    
    let forecastYear = currentYear;
    const availableYears = data.map(d => new Date(d.Forecast_Date).getFullYear());
    const uniqueYears = [...new Set(availableYears)].sort();
    if (uniqueYears.length > 0) {
      forecastYear = uniqueYears[uniqueYears.length - 1];
    }
    
    const startYear = forecastYear - 5;

    // ==== 2. FILTER DATA ====
    const historicalDataFormatted = (historicalData || [])
      .filter(d => {
        const date = new Date(d.Date);
        return date.getFullYear() >= startYear && date.getFullYear() < forecastYear;
      })
      .map(d => ({
        date: new Date(d.Date),
        price: d['Final Price'],
        isForecast: false
      }));

    historicalDataFormatted.sort((a, b) => a.date - b.date);

    const forecastData = data
      .filter(d => {
        const date = new Date(d.Forecast_Date);
        return date.getFullYear() === forecastYear;
      })
      .map(d => ({
        date: new Date(d.Forecast_Date),
        price: d.Forecasted_Price,
        isForecast: true
      }));

    forecastData.sort((a, b) => a.date - b.date);

    // ==== 3. BRIDGE POINT ====
    const lastHistorical = historicalDataFormatted.length > 0 
      ? historicalDataFormatted[historicalDataFormatted.length - 1] 
      : null;
    
    const firstForecast = forecastData.length > 0 ? forecastData[0] : null;

    let bridgeData = [];
    if (lastHistorical && firstForecast) {
      bridgeData = [{
        date: new Date(firstForecast.date),
        price: lastHistorical.price,
        isForecast: true,
        isBridge: true
      }];
    }

    let allData = [...historicalDataFormatted];
    if (bridgeData.length > 0 && firstForecast) {
      const bridgePrice = bridgeData[0].price;
      const firstForecastPrice = firstForecast.price;
      if (Math.abs(bridgePrice - firstForecastPrice) > 0.01) {
        allData.push(bridgeData[0]);
      }
    }
    allData = [...allData, ...forecastData];

    if (allData.length === 0) {
      svg.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight / 2)
        .attr("text-anchor", "middle")
        .style("font-family", "Sarabun, sans-serif")
        .style("font-size", "14px")
        .style("fill", COLORS.sub)
        .text(`No data available for ${startYear}-${forecastYear}`);
      return;
    }

    // ==== 4. SCALES ====
    const allPrices = allData.map(d => d.price);
    const yMin = Math.max(0, Math.min(...allPrices) * 0.85);
    const yMax = Math.max(...allPrices) * 1.15;

    const xScale = d3.scaleTime()
      .domain(d3.extent(allData, d => d.date))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([innerHeight, 0]);

    // ==== 5. GRID LINES ====
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("")
      )
      .style("stroke", "#EEF2F7")
      .style("stroke-dasharray", "4,4");

    // ==== 6. CONFIDENCE INTERVAL ====
    const historicalPrices = historicalDataFormatted.map(d => d.price);
    const meanHistorical = historicalPrices.reduce((a, b) => a + b, 0) / historicalPrices.length;
    const stdDev = Math.sqrt(
      historicalPrices.reduce((a, b) => a + Math.pow(b - meanHistorical, 2), 0) / historicalPrices.length
    );
    const confidenceInterval = stdDev * 1.96;

    const confidenceData = forecastData.map(d => ({
      date: d.date,
      upper: d.price + confidenceInterval,
      lower: Math.max(0, d.price - confidenceInterval)
    }));

    if (confidenceData.length > 0) {
      const area = d3.area()
        .x(d => xScale(d.date))
        .y0(d => yScale(d.lower))
        .y1(d => yScale(d.upper))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(confidenceData)
        .attr("d", area)
        .attr("fill", COLORS.accent)
        .attr("fill-opacity", 0.15)
        .attr("stroke", "none");
    }

    // ==== 7. HISTORICAL LINE ====
    if (historicalDataFormatted.length > 0) {
      const lineGen = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.price))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(historicalDataFormatted)
        .attr("d", lineGen)
        .attr("fill", "none")
        .attr("stroke", COLORS.accentDeep)
        .attr("stroke-width", 2.5)
        .attr("stroke-linecap", "round");

      svg.selectAll("circle.historical")
        .data(historicalDataFormatted)
        .enter()
        .append("circle")
        .attr("class", "historical")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.price))
        .attr("r", 4)
        .attr("fill", COLORS.accentDeep)
        .append("title")
        .text(d => `${d.date.toLocaleDateString()}: ₱${d.price.toFixed(2)}`);
    }

    // ==== 8. FORECAST LINE ====
    if (forecastData.length > 0) {
      const forecastLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.price))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(forecastData)
        .attr("d", forecastLine)
        .attr("fill", "none")
        .attr("stroke", COLORS.accent)
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", "8,4")
        .attr("stroke-linecap", "round");

      svg.selectAll("circle.forecast")
        .data(forecastData)
        .enter()
        .append("circle")
        .attr("class", "forecast")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.price))
        .attr("r", 5)
        .attr("fill", COLORS.accent)
        .attr("stroke", COLORS.white)
        .attr("stroke-width", 1.5)
        .append("title")
        .text(d => `${d.date.toLocaleDateString()}: ₱${d.price.toFixed(2)} (forecast)`);
    }

    // ==== 9. BRIDGE CONNECTION ====
    if (lastHistorical && firstForecast && bridgeData.length > 0) {
      const bridgePoints = [
        { date: lastHistorical.date, price: lastHistorical.price },
        { date: firstForecast.date, price: lastHistorical.price }
      ];

      const bridgeLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.price))
        .curve(d3.curveLinear);

      svg.append("path")
        .datum(bridgePoints)
        .attr("d", bridgeLine)
        .attr("fill", "none")
        .attr("stroke", COLORS.accentDeep)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4,4")
        .attr("stroke-opacity", 0.6);
    }

    // ==== 10. X-AXIS ====
    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeYear.every(1))
      .tickFormat(d3.timeFormat("%Y"));

    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("color", COLORS.accentDeep);

    // Year separator lines
    const years = [];
    for (let y = startYear; y <= forecastYear; y++) {
      years.push(new Date(y, 0, 1));
    }
    
    years.forEach(yearDate => {
      const xPos = xScale(yearDate);
      if (xPos > 0 && xPos < innerWidth) {
        svg.append("line")
          .attr("x1", xPos)
          .attr("y1", 0)
          .attr("x2", xPos)
          .attr("y2", innerHeight)
          .attr("stroke", "#E8EEF4")
          .attr("stroke-dasharray", "3,3")
          .attr("stroke-width", 1);
      }
    });

    // ==== 11. Y-AXIS ====
    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat(d => `₱${d.toFixed(0)}`);

    svg.append("g")
      .call(yAxis)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "12px")
      .style("color", COLORS.sub);

    // ==== 12. LEGEND - MOVED TO BOTTOM, OUTSIDE CHART AREA ====
    // Position legend at the bottom, centered
    const legendY = innerHeight + 40;
    const legendX = innerWidth / 2 - 160;

    const legend = svg.append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    // Historical
    const legendItem1 = legend.append("g")
      .attr("transform", "translate(0, 0)");
    
    legendItem1.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 25)
      .attr("y2", 0)
      .attr("stroke", COLORS.accentDeep)
      .attr("stroke-width", 2.5);

    legendItem1.append("text")
      .attr("x", 32)
      .attr("y", 4)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "11px")
      .style("fill", COLORS.ink)
      .text("Historical");

    // Forecast
    const legendItem2 = legend.append("g")
      .attr("transform", "translate(130, 0)");
    
    legendItem2.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 25)
      .attr("y2", 0)
      .attr("stroke", COLORS.accent)
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "8,4");

    legendItem2.append("text")
      .attr("x", 32)
      .attr("y", 4)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "11px")
      .style("fill", COLORS.ink)
      .text(`Forecast (${forecastYear})`);

    // Confidence Interval
    const legendItem3 = legend.append("g")
      .attr("transform", "translate(0, 20)");
    
    legendItem3.append("rect")
      .attr("x", 0)
      .attr("y", -3)
      .attr("width", 25)
      .attr("height", 8)
      .attr("fill", COLORS.accent)
      .attr("fill-opacity", 0.15);

    legendItem3.append("text")
      .attr("x", 32)
      .attr("y", 4)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "11px")
      .style("fill", COLORS.ink)
      .text("95% Confidence Interval");

    // Bridge Line
    const legendItem4 = legend.append("g")
      .attr("transform", "translate(200, 20)");
    
    legendItem4.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 25)
      .attr("y2", 0)
      .attr("stroke", COLORS.accentDeep)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,4")
      .attr("stroke-opacity", 0.6);

    legendItem4.append("text")
      .attr("x", 32)
      .attr("y", 4)
      .style("font-family", "Sarabun, sans-serif")
      .style("font-size", "11px")
      .style("fill", COLORS.ink)
      .text("Transition Bridge");

    // Add a subtle background for the legend
    const legendBg = legend.append("rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 370)
      .attr("height", 45)
      .attr("fill", "#F8FAFC")
      .attr("rx", 8)
      .attr("opacity", 0.8);

    // Move legend items to front
    legendItem1.raise();
    legendItem2.raise();
    legendItem3.raise();
    legendItem4.raise();

  }, [data, historicalData]);

  return (
    <div 
      ref={ref} 
      style={{ 
        width: "100%", 
        height: 420, 
        background: COLORS.white, 
        borderRadius: 10,
        padding: "10px 0"
      }} 
    />
  );
}