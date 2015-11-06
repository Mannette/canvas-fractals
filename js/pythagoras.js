// set constants
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var base_dim = Math.min(canvas.width / 6, canvas.height / 4);

var ratio = 0.5 * Math.sqrt(2);

var max_order = 9;
var order_colors = Gradient("#D4E576", "#126845", max_order + 2);
var min_order = 0;
var desired_order = 7;

//stuff for asymentric stuff.
var max_percentage = 0.8;
var l_percentage = 0.5;
var r_percentage = 0.5;

var scales = [];


function Pythagoras(standalone){

	var i;

	// initialize the tree.
	context.strokeStyle = 'black';
	context.fillStyle = 'black';
	context.lineCap = 'round';



	//initialize the different scales
	for(i = min_order; i <= max_order; i++){
		scales[i] = Math.pow(ratio, i);
	}


	// actually initialize the canvas
	Pythagoras.prototype.calcVariables();
	Pythagoras.prototype.draw();
	if(!standalone)
		canvas.blur();
}

	Pythagoras.prototype.update = function(pos){
		clearCanvas();
		this.updateOrder(pos);
		this.updateHorizontalPos(pos);
		this.calcVariables();
		this.draw();
	};

	Pythagoras.prototype.updateOrder = function(pos){
		var min_y = canvas.height * 0.1,
			max_y = canvas.height - (2 * min_y),
			y = Math.min(max_y, Math.max(0, - (pos.y - (canvas.height - min_y)) ));
	  desired_order = max_order * (y/max_y);
	};

	Pythagoras.prototype.updateHorizontalPos = function(pos){
		var x = Math.min(1, Math.abs(pos.x - (canvas.width / 2)) / ((canvas.width / 2) - (canvas.width * 0.2)));
		x = ((max_percentage - 0.5) * x) + 0.5;
		if(pos.x < (canvas.width / 2)){ // we're on the right side.
			l_percentage = 1-x;
			r_percentage = x;
		}else{ //we're on the left.
			l_percentage = x;
			r_percentage = 1-x;
		}
	};

	Pythagoras.prototype.draw = function(){

		// draw the trunk of the tree.
		context.save();

			context.translate((canvas.width / 2)-(base_dim/2), canvas.height);

			//actually draw the trunk.
			context.fillStyle = order_colors[0];
			this.drawBranch(base_dim,base_dim);

			//now draw the branches.
			context.save();
				context.translate(0,-base_dim);
				this.drawBranches(1);
			context.restore();

		context.restore();
	};

	Pythagoras.prototype.calcVariables = function(){

		var whole = Math.floor(desired_order);
		var	frac = desired_order - whole,
			lx = l_percentage*base_dim,
			rx = r_percentage*base_dim,
			temp=0, i;

		// calculate the final height first.
		this.height = base_dim*(Math.min(r_percentage, l_percentage));

		//calulate all the base variables.

		//now calculate the angles for either side.
		this.langle = Math.atan(this.height/lx);
		this.rangle = Math.atan(this.height/rx);

		//calculate the lengths of each side.
		temp = this.height*this.height;
		this.lwidth = Math.sqrt((lx*lx)+(temp));
		this.rwidth = Math.sqrt((rx*rx)+(temp));

		//calculate the scales for each side.
		temp = base_dim*ratio;
		this.rscale = this.rwidth/(temp);
		this.lscale = this.lwidth/(temp);

		//now calculate all of the inbetween values (base up to desired order);
		this.lwidths = [this.lwidth];
		this.rwidths = [this.rwidth];
		this.rx_trans = [base_dim*l_percentage];
		this.ry_trans = [-this.height];
		for(i=1; i<=max_order+1; i++){
			temp = scales[i-1];
			this.lwidths[i] = this.lwidth*temp;
			this.rwidths[i] = this.rwidth*temp;
			this.rx_trans[i] = lx*temp;
			this.ry_trans[i] = -this.height*temp;
		}

		// calculate the angles and lengths on the last partial iteration.

		this.final_height = this.height*frac*scales[whole];

		temp = lx*scales[whole];
		this.final_langle = Math.atan(this.final_height/temp);
		this.final_lwidth = Math.sqrt((temp*temp)+(this.final_height*this.final_height));
		this.final_lheight = this.final_lwidth*frac;

		temp = rx*scales[whole];
		this.final_rangle = Math.atan(this.final_height/temp);
		this.final_rwidth = Math.sqrt((temp*temp)+(this.final_height*this.final_height));
		this.final_rheight = this.final_rwidth*frac;

	};

	Pythagoras.prototype.drawBranch = function(width, height){
		context.fillRect(0,-height,width,height);
	};

	Pythagoras.prototype.drawBranches = function(current_order){
		var next_order = current_order+1;

		//set the color to the current level.
		context.fillStyle = order_colors[current_order];

		//draw the left branch
		context.save();
			if(current_order > desired_order){
				//draw the special end.
				context.rotate(-this.final_langle);
				this.drawBranch(this.final_lwidth,this.final_lheight);
			}else{
				context.rotate(-this.langle);
				this.drawBranch(this.lwidths[current_order],this.lwidths[current_order]);
				context.save();
					context.translate(0,-this.lwidths[current_order]);
					context.scale(this.lscale,this.lscale);
					this.drawBranches(next_order);
				context.restore();
			}
		context.restore();



		//draw the right branch
		context.save();

			if(current_order > desired_order){
				//draw the special end.
				context.translate(this.rx_trans[current_order],-this.final_height);
				context.rotate(this.final_rangle);
				this.drawBranch(this.final_rwidth,this.final_rheight);

			}else{

				//draw the current branch
				context.translate(this.rx_trans[current_order],this.ry_trans[current_order]);
				context.rotate(this.rangle);
				this.drawBranch(this.rwidths[current_order],this.rwidths[current_order]);

				//draw the next one.
				context.save();
					context.translate(0,-this.rwidths[current_order]);
					context.scale(this.rscale,this.rscale);
					this.drawBranches(next_order);
				context.restore();
			}
		context.restore();
	};
