import * as d3 from 'd3'
import { mapState } from 'vuex'

const d3Util = {
    init: function(elSelector ,svgWidth, svgHeight){
        var svg = d3.select(elSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight)
    },

    drawPieChart: function(elSelector ,svgWidth, svgHeight, outerRadius, innerRadius, rawData){
        d3.select("svg").remove();
        
        innerRadius = outerRadius / 5
        var svg = d3.select(elSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight)
        var data = d3.pie().value(d => d.cases)(rawData)
        var segments = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).padAngle(0.03).padRadius(60)

        var sections = svg.append('g').attr("transform", "translate(" + outerRadius + "," + outerRadius +")")
                                        .selectAll("path").data(data)

        sections.enter().append("path").attr('d', segments).attr("fill", (d,i) => {return PIE_LIGHT_COLORS[i]})
        .on("mouseover", function(e){
            d3.select(this).style('opacity','0.5')
            //d3.selectAll("text").style('opacity', '1')
        })
        .on("mouseout", function(e){
            d3.select(this).style('opacity','1')
            //d3.selectAll("text").style('opacity', '0')
        })

        var content = d3.select("g").selectAll("text").data(data)

        var cnt = 10
        content.enter().append("text").each(function(d){
            cnt = cnt * -1
            var center = segments.centroid(d)
            //console.log(center)
            d3.select(this).attr("x", center[0]).attr("y", center[1] + cnt)
                .text(d.data.continent)
        })
                
    },

    drawLineChart: function(elSelector, svgWidth, svgHeight, tempData){
        console.log("chart data: ")

        var parseTime = d3.timeParse("%Y-%m-%d")
        
        tempData.forEach((d) => {
            var split = d.Date.split("T")
            d.Date = parseTime(split[0])
        })
        console.log(tempData)

        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left:50
        }

        var width = svgWidth - margin.left - margin.right
        var height = svgHeight - margin.top - margin.bottom

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        
        var valueLine = d3.line().x(d => x(d.Date)).y(d => y(d.Confirmed))

        d3.select("svg").remove();
        var svg = d3.select(elSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight)
                    .append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

        x.domain(d3.extent(tempData, function(d){ return d.Date}))
        y.domain([0, d3.max(tempData, function(d){ return d.Confirmed })])

        svg.append("path").data([tempData])
            .attr("class", "graphLine").attr("d", valueLine).style('stroke','white')

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .style('stroke','white');

        svg.append("g")
            .call(d3.axisLeft(y))
            .style('stroke','white');


    }
}

const PIE_LIGHT_COLORS = ["#FF6E40", "#C5CAE9", "#FFC400", "#A5D6A7", "#00E676", "#E6EE9C", "#00BFA5", "#A1887F", "#651FFF"]

export default d3Util