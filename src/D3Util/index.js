import * as d3 from 'd3'

const d3Util = {
    init: function(elSelector ,svgWidth, svgHeight){
        var svg = d3.select(elSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight)
    },

    drawPieChart: function(elSelector ,svgWidth, svgHeight, outerRadius, innerRadius, rawData){
        var svg = d3.select(elSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight)
        var data = d3.pie().value(d => d.cases)(rawData)
        var segments = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).padAngle(0.03).padRadius(60)

        var sections = svg.append('g').attr("transform", "translate(150,150)")
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

        content.enter().append("text").each(function(d){
            var center = segments.centroid(d)
            d3.select(this).attr("x", center[0]).attr("y", center[1])
                .text(d.data.continent)
        })
                
    }
}

const PIE_LIGHT_COLORS = ["#FF6E40", "#C5CAE9", "#FFC400", "#A5D6A7", "#00E676", "#E6EE9C", "#00BFA5", "#A1887F", "#651FFF"]

export default d3Util