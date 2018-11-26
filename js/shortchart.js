function shortchart() {

	var margin = {top: 20, right: 60, bottom: 30, left: 90},
	width = getChartWidth(),
	Chartwidth = width - margin.left - margin.right,
	height = getChartHeight(),
	Chartheight = height - margin.top - margin.bottom;	

    var svg = d3.select("#chartSmall").append("svg")
        .attr("width", width)
        .attr("height", height)

	var x = d3.scaleLinear().range([0, Chartwidth]);

	var y = d3.scaleBand().range([Chartheight, 0]);

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var data = [
		{"area":"Low Poverty Neighborhoods","value":89754,"type":"poverty"},
		{"area":"High Poverty Neighborhoods","value":58328,"type":"poverty"},
		{"area":"","value":0,"type":"spacer"},
		{"area":"Less than 50% African American","value":133601,"type":"race"},		
		{"area":"50% - 85% African American","value":56412,"type":"race"},
		{"area":"More than 85% African American","value":33987,"type":"race"}
	] 

	x.domain([0, d3.max(data, function(d) { return d.value; })]).nice();
	y.domain(data.map(function(d) { return d.area; })).padding(0.2);

	g.append("g")
	    .attr("class", "x axis")
	   	.attr("transform", "translate(0," + Chartheight + ")")
	  	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d3.format("$,.2r")(d) }).tickSizeInner([-Chartheight]));

	g.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(y))
	        .selectAll(".tick text")
	    	.call(wrap, (margin.left-5));

	g.selectAll(".bar")
	    .data(data)
	  .enter().append("rect")
	    .attr("class", function(d){
	    	return "bar " + d.type;
	    })
	    .attr("x", 0)
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.area); })
	    .attr("width", function(d) { return x(d.value); })

    window.addEventListener("resize", redraw);

	function getChartWidth() {
		var chartDiv = $("#graphic-container");	
		var w = chartDiv.innerWidth();
		return w;
	}

	function getChartHeight() {
		var chartDiv = document.getElementById("graphic-container");		
		var h = chartDiv.clientHeight;		
		return h;
	}

	function redraw(){
		// get new width
		width = getChartWidth();
		Chartwidth = width - margin.left - margin.right;

		svg.attr("width", width)

		// set new x range
		x.range([0, Chartwidth]);

		// transition bars
		g.selectAll(".bar").transition()
	    	.attr("width", function(d) { 
	    		return x(d.value); 
	    	})

	   	g.select("g.x.axis").transition()
	   		.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d3.format("$,.2r")(d) }).tickSizeInner([-Chartheight]));

	}
}
