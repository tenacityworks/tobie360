!function($){
  
  
 // $(document).ready(function() {
  //	var size =  checkSize();
  // 	console.log(size);
  //setInterval(function(){
    //	var size =  checkSize();
 	//console.log(size) }, 
 	//1000);	
  
  
  //  $(window).resize(checkSize);
  //	console.log(checkSize);
  
//});

//Function to the css rule
function checkSize(){
 	var size = $(window).width();
	return size;
   // if ($(".sampleClass").css("float") == "none" ){}
   
   
}

//$( window ).on( "orientationchange", function( event ) {
  //alert( "This device is in " + event.orientation + " mode!" );
//});
  
  var defaults = {
    strength: 70,
    scale: 1,
    animationSpeed: "100ms",
    contain: true,
    wrapContent: false
  };  
  
  $.fn.interactive_bg = function(options){
    return this.each(function(){
      var settings = $.extend({}, defaults, options),
          el = $(this),
          
          h = el.outerHeight(),
          w = el.outerWidth();
          
     
          sh = settings.strength / h;
          sw = settings.strength / w;
          has_touch = 'ontouchstart' in document.documentElement;
          
          
          
      if (settings.contain == true) {
        el.css({
          overflow: "hidden"
        });
      }
      // Insert new container so that the background can be contained when scaled.
      
      if (settings.wrapContent == false) {
        el.prepend("<div class='ibg-bg'></div>")
      } else {
        el.wrapInner("<div class='ibg-bg'></div>")
      }
      
      
      
      // Set background to the newly added container.
      
      if (el.data("ibg-bg") !== undefined) {
        el.find("> .ibg-bg").css({
          background: "url('" + el.data("ibg-bg") + "') no-repeat center center",
          "background-size": "cover",
        });
      }

      if (screen.width<1270){
      el.find("> .ibg-bg").css({
        width: screen.width*1.26,
        height: screen.height*1.26,
        left:-w/11,
        top:-h/8,
      })
}
  
     else {
      el.find("> .ibg-bg").css({
        width: screen.width*1.45,
        height: screen.height*1.45,
        left:-w/11,
        top:-h/8,
      });
}
 
      $( window ).on( "orientationchange", function( event ) {
      el.find("> .ibg-bg").css({
        width: screen.width*1.4,
        height: screen.height*1.4,
        left:-w/9,
        top:-h/9,
      })

});

      
      if(has_touch || screen.width <= 699) {
        // For Mobile
        // Add support for accelerometeron mobile
        window.addEventListener('devicemotion', deviceMotionHandler, false);

          function deviceMotionHandler(eventData) {
             //var accX = Math.round(event.accelerationIncludingGravity.x*60) / 10,
               //  accY = Math.round(event.accelerationIncludingGravity.y*30) / 10;
                // xA = -(accX /40) * settings.strength,
                 //yA = -(accY /40) * settings.strength,
                // newX = -(xA+100),
                // newY = -(yA+100);
                //newX = -(accX),
                //newY = -(accY);

		    accX = Math.round(event.accelerationIncludingGravity.x); // 10;  
		    accY = Math.round(event.accelerationIncludingGravity.y);
		    console.log(Math.round(event.accelerationIncludingGravity.x)) // 10;  
		    console.log(Math.round(event.accelerationIncludingGravity.y)) // 10;  
		    var sum = 0;    movement = 22;
		    newX = -(accX/10) * movement; //smooth_X(accX);  // //
		    newY = -(accY/10) * movement;  //smooth_Y(accY); //// //
		    
	var dataX = new Array();
	for(var j = 0; j<5; j++){
		dataX.push(Math.round(event.accelerationIncludingGravity.x)); 
	}
	var sum = 0;
           for(var i=0;i< dataX.length;i++){
 	   	sum += parseInt( dataX[i+1], 10 ); //dont forget to add the base
	}
	var avgX = -(sum/dataX.length)*100;
	var dataY = new Array();
	for(var j = 0; j<5; j++){
		dataY.push(Math.round(event.accelerationIncludingGravity.y)); 
	}
           for(var i=0;i< dataY.length;i++){
 	   	sum += parseInt( dataY[i+1], 10 ); //dont forget to add the base
	}
	var avgY = -(sum/dataY.length)*100;
 



	


/*  	function read_X () {
  *	    data_X.delete_first_element();
  *	    data_X.push(get_sensor_data_X());
  *	   return average(data_X);
  * 	 }
*/
                 
                 el.find("> .ibg-bg").css({
                    "opacity":"0.8",
  /*     		//"-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
    *    	//"-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
     *     	//"-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
      *      	//"transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")"
*/		
	       "transform": "translate3d(" + newX + "px," + newY + "px,0px)"



                 });    







          }
        
      } else {
        // For Desktop 
        // Animate only scaling when mouse enter
        el.mouseenter(function(e) {
          if (settings.scale != 1) el.addClass("ibg-entering")
          el.find("> .ibg-bg").css({
            "-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
            "-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
            "-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
            "transform": "matrix(" + settings.scale + ",0,0," + settings.scale + ",0,0)",
            "-webkit-transition": "-webkit-transform " + settings.animationSpeed + " linear",
            "-moz-transition": "-moz-transform " + settings.animationSpeed + " linear",
            "-o-transition": "-o-transform " + settings.animationSpeed + " linear",
            "transition": "transform " + settings.animationSpeed + " linear"
          }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){

            // This will signal the mousemove below to execute when the scaling animation stops
            el.removeClass("ibg-entering")
          });
        }).mousemove(function(e){
          // This condition prevents transition from causing the movement of the background to lag
          if (!el.hasClass("ibg-entering") && !el.hasClass("exiting")) {
            var pageX = e.pageX || e.clientX,
                pageY = e.pageY || e.clientY,
                pageX = (pageX - el.offset().left) - (w / 2),
                pageY = (pageY - el.offset().top) - (h / 2),
                newX = ((sw * pageX)) * - 2,
                newY = ((sh * pageY)) * - 2;
            // Use matrix to move the background from its origin
            // Also, disable transition to prevent lag
            el.find("> .ibg-bg").css({
              "-webkit-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
              "-moz-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
              "-o-transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
              "transform": "matrix(" + settings.scale + ",0,0," + settings.scale + "," + newX + "," + newY + ")",
              "-webkit-transition": "none",
              "-moz-transition": "none",
              "-o-transition": "none",
              "transition": "none"
            });
          }
        }).mouseleave(function(e) {
          if (settings.scale != 1) el.addClass("ibg-exiting")
          // Same condition applies as mouseenter. Rescale the background back to its original scale
          el.addClass("ibg-exiting").find("> .ibg-bg").css({
            "-webkit-transform": "matrix(1,0,0,1,0,0)",
            "-moz-transform": "matrix(1,0,0,1,0,0)",
            "-o-transform": "matrix(1,0,0,1,0,0)",
            "transform": "matrix(1,0,0,1,0,0)",
            "-webkit-transition": "-webkit-transform " + settings.animationSpeed + " linear",
            "-moz-transition": "-moz-transform " + settings.animationSpeed + " linear",
            "-o-transition": "-o-transform " + settings.animationSpeed + " linear",
            "transition": "transform " + settings.animationSpeed + " linear"
          }).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            el.removeClass("ibg-exiting")
          });
        });
      }
    });
    
  }
  
  
}(window.jQuery);