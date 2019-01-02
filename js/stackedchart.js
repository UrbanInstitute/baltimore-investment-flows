function stackedchart() {
	var stackedchartVars = {};
	var margin = {top: 10, right: 60, bottom: 50, left: 100},
	width = getChartWidth(),
	Chartwidth = width - margin.left - margin.right,
	height = getChartHeight(),
	Chartheight = height - margin.top - margin.bottom;	
	stackedchartVars.Chartheight = Chartheight;

    var svg = d3.select("#chartStacked").append("svg")
        .attr("width", width)
        .attr("height", height)

	var x = d3.scaleLinear().range([0, Chartwidth]);
	stackedchartVars.x = x;
	var y = d3.scaleBand().range([Chartheight, 0]);
	stackedchartVars.y = y;

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	stackedchartVars.g = g;



	var data = [
		{
			"area":"All neighborhoods",			
			"investmentShareChart":{
				"mainstream":16800000000,
				"mission": 942000000,
				"public":993000000,
			},
			"type":"all"
		},
		{
			"area":"",			
			"investmentShareChart":{
				"mainstream":0,
				"mission":0,
				"public":0
			},
			"type":"spacer"
		},
		{
			"area":"Low-poverty neighborhoods",			
			"investmentShareChart":{
				"mainstream":12300000000,
				"mission":457000000,
				"public":457000000
			},
			"type":"poverty"
		},
		{
			"area":"High-poverty neighborhoods",			
			"investmentShareChart":{
				"mainstream":4520000000,
				"mission":485000000,
				"public":537000000
			},
			"type":"poverty"
		},
		{
			"area":" ",			
			"investmentShareChart":{
				"mainstream":0,
				"mission":0,
				"public":0
			},
			"type":"spacer"
		},
		{
			"area":"Less than 50% African American",			
			"investmentShareChart":{
				"mainstream":11800000000,
				"mission":254000000,
				"public":322000000
			},
			"type":"race"
		},
		{
			"area":"50%–85% African American",			
			"investmentShareChart":{
				"mainstream":2540000000,
				"mission":356000000,
				"public":358000000
			},
			"type":"race"
		},
		{
			"area":"More than 85% African American",			
			"investmentShareChart":{
				"mainstream":2480000000,
				"mission":332000000,
				"public":314000000
			},
			"type":"race"
		}

	];

	for (var i = 0; i < data.length; i++) {
		data[i].investmentShareChart.total = data[i].investmentShareChart.mainstream + data[i].investmentShareChart.mission + data[i].investmentShareChart.public;
	}

	// make the null value total 1 so as to avoid errors. 
	data[1].investmentShareChart.total = 1;
	data[4].investmentShareChart.total = 1;

	stackedchartVars.data = data;

	x.domain([0, 1]).nice();
	y.domain(data.map(function(d) { return d.area; })).padding(0.2);

	g.append("g")
	    .attr("class", "x axis")
	   	.attr("transform", "translate(0," + Chartheight + ")")
	  	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d3.format(",.0%")(d) }).tickSizeInner([-Chartheight]));

	g.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(y))
	        .selectAll(".tick text")
	    	.call(wrap, (margin.left-5));

	g.selectAll(".bar.mainstream")
	    .data(data)
	  .enter().append("rect")
	    .attr("class", function(d){
	    	return "bar mainstream";
	    })
	    .attr("x", 0)
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.area); })
	    .attr("width", function(d) {return x(d.investmentShareChart.mainstream / d.investmentShareChart.total); })

	g.selectAll(".bar.mission")
	    .data(data)
	  .enter().append("rect")
	    .attr("class", function(d){
	    	return "bar mission";
	    })
	    .attr("x", function(d){ return x(d.investmentShareChart.mainstream / d.investmentShareChart.total)})
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.area); })
	    .attr("width", function(d) {return x(d.investmentShareChart.mission / d.investmentShareChart.total); })

	g.selectAll(".bar.public")
	    .data(data)
	  .enter().append("rect")
	    .attr("class", function(d){
	    	return "bar public";
	    })
	    .attr("x", function(d){ return x((d.investmentShareChart.mainstream+d.investmentShareChart.mission) / d.investmentShareChart.total)})
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.area); })
	    .attr("width", function(d) {return x(d.investmentShareChart.public / d.investmentShareChart.total); })

    window.addEventListener("resize", redraw);

	function getChartWidth() {
		var chartDiv = $("#graphic-container");	
		var w = chartDiv.innerWidth();
		return w;
	}

	function getChartHeight() {
		var chartDiv = document.getElementById("graphic-container");		
		var chartSubtractor = $("#chartStacked .title")[0].clientHeight + $("#chartStacked .inline-legend")[0].clientHeight;
		var h = chartDiv.clientHeight - chartSubtractor;
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
		g.selectAll(".bar.mainstream").transition()
	    	.attr("width", function(d) {return x(d.investmentShareChart.mainstream / d.investmentShareChart.total); })

	    g.selectAll(".bar.mission").transition()
	    	.attr("x", function(d){ return x(d.investmentShareChart.mainstream / d.investmentShareChart.total)})
	    	.attr("width", function(d) {return x(d.investmentShareChart.mission / d.investmentShareChart.total); })

	    g.selectAll(".bar.public").transition()
		    .attr("x", function(d){ return x((d.investmentShareChart.mainstream+d.investmentShareChart.mission) / d.investmentShareChart.total)})
		    .attr("width", function(d) {return x(d.investmentShareChart.public / d.investmentShareChart.total); })

	   	g.select("g.x.axis").transition()
		  	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return d3.format(",.0%")(d) }).tickSizeInner([-Chartheight]));

	}

	return stackedchartVars;
}