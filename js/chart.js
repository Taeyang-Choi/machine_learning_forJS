function svLinearChart() {
	svLinearChart.prototype.init = function(options) {
		this.options = options;
		this.select = options.select;
		this.parent = options.parent;
		this.margin = options.margin;

		this.width = (options.width > $(options.parent).width() ? options.width - this.margin.left - this.margin.right : $(options.parent).width()) - this.margin.left - this.margin.right;
		this.height = (this.width + this.margin.left + this.margin.right) * options.ratio - this.margin.top - this.margin.bottom;

		this.xData = options.xData;
		this.yData = options.yData; 
		this.dotData = [];
		for(var i=0; i<xData.length; i++) {
			for(var j=0; j<xData[0].length; j++) {
				this.dotData.push({x:this.xData[i][j], y: this.yData[i][j]}); 
			}
		}

		this.x = d3.scaleLinear().range([0, this.width]);
		this.y = d3.scaleLinear().range([this.height, 0]);

		this.svg = d3.select(options.select)
		    .append("svg")
		        .attr("width", this.width + this.margin.left + this.margin.right)
		        .attr("height", this.height + this.margin.top + this.margin.bottom);
		
		this.g = this.svg.append("g")
		        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
		

		this.W = options.W;
		this.b = options.b;

		this.path = {};
	}

	svLinearChart.prototype.draw = function(options) {
		var g = this.g;
		var height = this.height;
		var margin = this.margin;

		this.x.domain([0, d3.max(this.dotData, function(d) { return d.x; })]);
	    this.y.domain([0, d3.max(this.dotData, function(d) { return d.y + 50; })]);

	    var x = this.x;
		var y = this.y;

		var xAxis = d3.axisBottom()
			.scale(x)
			//.ticks(3)
			//.tickSize(0)
		var yAxis = d3.axisLeft()
			.scale(y)
			//.ticks(3)
			//.tickSize(0)

		// grid 생략

		this.g.append("g")
	        .attr("class", "x axis domain-visible "+(this.options.background == "white" ? "db-white" : ""))
	        //.attr("transform", "translate(0," + (height) + ")")
	        .call(xAxis)
	        .attr("transform", "translate(0, " + (this.height) +  ")");
			//.attr('transform', `translate(0, ${this.height - margin.bottom})`)
			//.attr("transform", "translate(0, 5)");
		
		this.g.append("g")
			.attr("class", "y axis domain-visible "+(this.options.background == "white" ? "db-white" : ""))
			.call(yAxis)
			.selectAll(".y.axis .tick text")
			.attr("transform", "translate(" + this.margin.left + ", 0)");
			//.attr("transform", "translate("+ -5 +", 0)");	

		const W = this.W; const b = this.b
		var linearReg = [];
		this.dotData.forEach(function(d) {
			linearReg.push({x:d.x, y:(d.x * W + b)})
		})

		var line = d3.line()
			.x(function(d) { return x(d.x); })
		    .y(function(d) { return y(d.y); });


	    g.append("path")
	    	.datum(linearReg)
	    	.attr("class", "line")
	    	.attr("d", line);


    	this.g.selectAll()
    	.data(this.dotData)
    	.enter()
    	.append("circle")
    		.attr("class", "dot")
    		.attr("cx", function(d) { 
		 		d.cx = x(d.x);
				return d.cx; 
		 		})
		 	.attr("cy", function(d) {  
		 		d.cy = y(d.y);
		 		return	d.cy;
		 		})
		 	.attr("r", 5)
	}

	svLinearChart.prototype.redraw = function(options) {
		this.W = options.W;
		this.b = options.b;

		var linearReg = [];
		this.dotData.forEach(function(d) {
			linearReg.push({x:d.x, y:(d.x * options.W + options.b)})
		})

		var x = this.x;
		var y = this.y;
		var g = this.g;
		var line = d3.line()
			.x(function(d) { return x(d.x); })
		    .y(function(d) { return y(d.y); });


	    g.selectAll(".line")
			.remove();

	    g.append("path")
	    	.datum(linearReg)
	    	.attr("class", "line")
	    	.attr("d", line);
	}
}


