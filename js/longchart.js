function longchart() {

	var margin = {top: 0, right: 20, bottom: 30, left: 100},
	width = getChartWidth(),
	Chartwidth = width - margin.left - margin.right,
	height = getChartHeight(),
	Chartheight = height - margin.top - margin.bottom;	

    var svg = d3.select("#chartLong").append("svg")
        .attr("width", width)
        .attr("height", height)

	var x = d3.scaleLinear().range([0, Chartwidth]);
	var y = d3.scaleBand().range([Chartheight, 0]);

	var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var data = [
		{"area":"Columbus","value":3309.842908,"pop":837038},{"area":"Detroit","value":3663.021255,"pop":683443},{"area":"Cleveland","value":3934.575456,"pop":389165},{"area":"Wichita","value":5217.997786,"pop":388033},{"area":"Philadelphia","value":5362.26441,"pop":1559938},{"area":"El Paso","value":5887.778977,"pop":678058},{"area":"Jacksonville","value":5999.287381,"pop":856616},{"area":"Virginia Beach","value":6215.630602,"pop":449733},{"area":"Memphis","value":6611.703326,"pop":655857},{"area":"Fresno","value":6825.08052,"pop":513807},{"area":"Mesa","value":6897.605709,"pop":470456},{"area":"Nashville","value":7500.8038,"pop":643771},{"area":"Phoenix","value":7846.391614,"pop":1555324},{"area":"Indianapolis","value":8016.868832,"pop":846674},{"area":"Albuquerque","value":8214.884282,"pop":556859},{"area":"Louisville","value":8318.472941,"pop":611573},{"area":"San Antonio","value":9221.799675,"pop":1439358},{"area":"Tucson","value":9623.887133,"pop":527586},{"area":"Milwaukee","value":9630.73736,"pop":598672},{"area":"San Jose","value":9793.187666,"pop":1009363},{"area":"Charlotte","value":10207.32844,"pop":808834},{"area":"Oakland","value":10450.7205,"pop":412040},{"area":"Los Angeles","value":10497.70946,"pop":3918872},{"area":"Oklahoma City","value":10542.94355,"pop":620015},{"area":"Kansas City","value":10666.87962,"pop":471767},{"area":"Long Beach","value":10811.87222,"pop":469793},{"area":"Arlington","value":11219.24872,"pop":383899},{"area":"Baltimore","value":11220.40985,"pop":621000},{"area":"Omaha","value":11562.14187,"pop":443072},{"area":"Fort Worth","value":12313.08534,"pop":815930},{"area":"Portland","value":12755.0695,"pop":620589},{"area":"San Diego","value":12755.20463,"pop":1374812},{"area":"Tulsa","value":13227.15833,"pop":399906},{"area":"New York","value":13265.82605,"pop":8461961},{"area":"Boston","value":13456.27898,"pop":658279},{"area":"Raleigh","value":14108.68848,"pop":441326},{"area":"Sacramento","value":14828.99827,"pop":484530},{"area":"Minneapolis","value":15651.62768,"pop":404670},{"area":"Houston","value":17367.32562,"pop":2240582},{"area":"Colorado Springs","value":18408.72894,"pop":448759},{"area":"Dallas","value":19073.39439,"pop":1278433},{"area":"Atlanta","value":19603.27837,"pop":456378},{"area":"Denver","value":19750.59389,"pop":663303},{"area":"Chicago","value":20938.96408,"pop":2714017},{"area":"Seattle","value":23861.47684,"pop":668849},{"area":"San Francisco","value":26467.04563,"pop":850282},{"area":"Miami","value":27042.51725,"pop":432622},{"area":"Austin","value":29471.93158,"pop":907779},{"area":"Las Vegas","value":30375.69999,"pop":613295},{"area":"Washington, DC","value":31085.99389,"pop":659009}
	] 

	var barHeight = 12;
	var barMax = Math.floor(Chartheight / barHeight)

	x.domain([0, d3.max(data, function(d) { return d.value; })]);
	y.domain(data
		.sort(function(a, b) { return b.pop - a.pop; })
		.filter(function(d,i) {return ((i < barMax) || (d.area === "Baltimore") || (d.area === "Washington, DC") || (d.area === "Los Angeles") || (d.area === "San Antonio"))  })
		.sort(function(a, b) { return a.value - b.value; })
		.map(function(d) { return d.area; })).padding(0.1);

	g.append("g")
	    .attr("class", "x axis")
	   	.attr("transform", "translate(0," + Chartheight + ")")
	  	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return formatNum(d) }).tickSizeInner([-Chartheight]));

	g.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(y));

	g.selectAll(".bar")
	    .data(data
	    	.sort(function(a, b) { return b.pop - a.pop; })
			.filter(function(d,i) {return ((i < barMax) || (d.area === "Baltimore") || (d.area === "Washington, DC") || (d.area === "Los Angeles") || (d.area === "San Antonio")) })
			.sort(function(a, b) { return a.value - b.value; })
	    )
	  	.enter().append("rect")
	    .attr("class", function(d){
	    	if (d.area === "Baltimore") {
	    		return "bar special"
	    	}
	    	return "bar"
	    })
	    .attr("x", 0)
	    .attr("height", y.bandwidth())
	    .attr("y", function(d) { return y(d.area); })
	    .attr("width", function(d) { return x(d.value); })
	
    window.addEventListener("resize", redraw);

	function getChartWidth() {
		// var chartDiv = document.getElementById
		var chartDiv = $("#graphic-container");		
		var w = chartDiv.innerWidth()
		return w;
	}

	function getChartHeight() {
		var chartDiv = document.getElementById("graphic-container");
		var chartSubtractor = $("#chartLong .title")[0].clientHeight;
		var h = chartDiv.clientHeight - chartSubtractor;
		return h;
	}

	function redraw(){
		// get new width
		width = getChartWidth();
		Chartwidth = width - margin.left - margin.right;
		height = getChartHeight(),
		Chartheight = height - margin.top - margin.bottom;

		svg.attr("width", width).attr("height",height)

		// set new x range
		x.range([0, Chartwidth]);

		barMax = Math.floor(Chartheight / barHeight);

		y.range([Chartheight, 0]);

		y.domain(data
			.sort(function(a, b) { return b.pop - a.pop; })
			.filter(function(d,i) {return ((i < barMax) || (d.area === "Baltimore") || (d.area === "Washington, DC") || (d.area === "Los Angeles") || (d.area === "San Antonio")) })
			.sort(function(a, b) { return a.value - b.value; })
			.map(function(d) { return d.area; })).padding(0.1);		

		// transition bars

		var selection = g.selectAll(".bar")
		    .data(data
		    	.sort(function(a, b) { return b.pop - a.pop; })
				.filter(function(d,i) {return ((i < barMax) || (d.area === "Baltimore") || (d.area === "Washington, DC") || (d.area === "Los Angeles") || (d.area === "San Antonio")) })
				.sort(function(a, b) { return a.value - b.value; })
		    )	    

	    selection.enter().append("rect")
	    	.attr("class", function(d){
		    	if (d.area === "Baltimore") {
		    		return "bar special"
		    	}
		    	return "bar"
		    })
		    .attr("x", 0)
		    .attr("height", y.bandwidth())
		    .attr("y", function(d) { return y(d.area); })
		    .attr("width", function(d) { return x(d.value); })

		selection.transition()
			.attr("class", function(d){
		    	if (d.area === "Baltimore") {
		    		return "bar special"
		    	}
		    	return "bar"
		    })
	    	.attr("width", function(d) { 
	    		return x(d.value); 
	    	})
	    	.attr("height", y.bandwidth())
		    .attr("y", function(d) { return y(d.area); })

		selection.exit().remove();

	    g.selectAll(".bar").attr("width", function(d) { 
	    		return x(d.value); 
	    	})

	   	g.select("g.x.axis").transition()
	   		.attr("transform", "translate(0," + Chartheight + ")")
	   		.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return formatNum(d) }).tickSizeInner([-Chartheight]));

		g.select("g.y.axis").transition()
	    	.call(d3.axisLeft(y));

	}
}

function formatNum(d) {
	if (d>=10000) {
		return d3.format("$,.2s")(d)
	} else {
		return d3.format("$,.1s")(d)
	}
}