function shortchart() {
	var shortchartVars = {};
	var margin = {top: 10, right: 60, bottom: 45, left: 90},
	width = getChartWidth(),
	Chartwidth = width - margin.left - margin.right,
	height = getChartHeight(),
	Chartheight = height - margin.top - margin.bottom;	
	shortchartVars.Chartheight = Chartheight;

    var svg = d3.select("#chartSmall").append("svg")
        .attr("width", width)
        .attr("height", height)

	var x = d3.scaleLinear().range([0, Chartwidth]);
	shortchartVars.x = x;
	var y = d3.scaleBand().range([Chartheight, 0]);
	shortchartVars.y = y;

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	shortchartVars.g = g;

	var data = [
		{
			"area":"Low Poverty Neighborhoods",
			"capFlowRate":89754,
			"tripleChart1":99,
			"tripleChart2":2606,
			"loanChart":111577,
			"type":"poverty"
		},
		{
			"area":"High Poverty Neighborhoods",
			"capFlowRate":58328,
			"tripleChart1":531,
			"tripleChart2":4596,
			"loanChart":59822,
			"type":"poverty"
		},
		{
			"area":"",
			"capFlowRate":0,
			"tripleChart1":0,
			"tripleChart2":0,
			"loanChart":0,
			"type":"spacer"
		},
		{
			"area":"Less than 50% African American",
			"capFlowRate":133601,
			"tripleChart1":163,
			"tripleChart2":3022,
			"loanChart":160438,
			"type":"race"
		},
		{
			"area":"50% - 85% African American",
			"capFlowRate":56412,
			"tripleChart1":280,
			"tripleChart2":5583,
			"loanChart":0,
			"type":"race"
		},
		{
			"area":"More than 85% African American",
			"capFlowRate":33987,
			"tripleChart1":368,
			"tripleChart2":2372,
			"loanChart":68133,
			"type":"race"
		}

	] 
	shortchartVars.data = data;

	x.domain([0, d3.max(data, function(d) { return d.capFlowRate; })]).nice();
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
	    .attr("width", function(d) { return x(d.capFlowRate); })

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
	    		return x(d.capFlowRate); 
	    	})

	   	g.select("g.x.axis").transition()
	   		.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d3.format("$,.2r")(d) }).tickSizeInner([-Chartheight]));

	}

	return shortchartVars;
}