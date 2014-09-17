// Test controller for the particle system.
var controller = {
	canvas : null,
	context : null,

	init : function(){
		this.canvas = document.getElementById( "canvas" );
		this.context = this.canvas.getContext( "2d" );
		this.context.globalCompositeOperation = "lighter"; //"source-over", "lighter", "darker", "xor"  are good

		this.pe = new cParticleSystem();
		this.pe.init();

		this.main();
	},

	resize : function() {
		this.canvas.width = window.innerWidth;
    	this.canvas.height = window.innerHeight;
	},

	main : function(){
		this.update();
		this.draw();
		setTimeout( function(){ controller.main(); }, 100 );
	},

	update : function(){	
		this.pe.update( 1 );
	},

	draw : function(){
		this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.pe.render( this.context );
	}
};

$( window ).load(function() {
	$( "#canvas" ).mousemove( function(e) {
		var pe = controller.pe;
		controller.doSin = false;
		pe.position.x = e.pageX - $( this ).offset().left;
		pe.position.y = e.pageY - $( this ).offset().top;
	});

	controller.init();
	$( window ).resize(controller.resize);
	controller.resize();
});