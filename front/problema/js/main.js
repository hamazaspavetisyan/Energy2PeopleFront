
window.addBindings = function(){
    $( "#choice" ).buttonset();
    /*$("#getInfoButton").click(function() {
          
          getInformation('http://localhost:8080/kmlbi/biservlet?q=' + $("#measureSelect").val() + '&fYear=' + $("#fromYear option:selected").text() + '&tYear=' + $("#toYear option:selected").text() + '&fMonth=' + $("#fromMonth option:selected").val() + '&tMonth=' + $("#toMonth option:selected").val() +'&fDay=' + $("#datepickerFrom").val() + '&tDay=' + $("#datepickerTo").val() + '&aggr=' + $("#choice :radio:checked").val());

          console.log($("#measureSelect").val());
          console.log($("#fromYear option:selected").val());
          console.log($("#toYear option:selected").val());
          console.log($("#datepickerFrom").val());
          console.log($("#datepickerTo").val());
          console.log($("#choice :radio:checked").val());
    });*/
    
    // Llamada AJAX para mostrar los graficos
    $("#getInfoButton").click(function() {
    	apagar();
		var request = {
		  "yearBegin"   : $("#fromYear option:selected").val(),
		  "yearEnd"     : $("#toYear option:selected").val()
		};
		
		if (checkYears(request.yearBegin, request.yearEnd)) {
			$.ajax({
			  type: "POST",
			  url: "ajaxServer",
			  data: request,
			  dataType: 'json'
			}).done(function(data) {
				if (!data['error']) {
					showResults(data, request);
				}
			}).always(function() {
				encender();	
			});
		} else {
			encender();
			alert("Años invalidos");
		}
	}); 
    

    var i;
    for(i = 0; i < 30; i++)
    {  var option = "<option value='"+ (1983+i) +"'>"+ (1983+i) +"</option>"
      $(option).appendTo("#fromYear");
      $(option).appendTo("#toYear");
    }

    $( "#datepickerFrom" ).datepicker();
    $( "#datepickerTo" ).datepicker();

    $(function() {
        $( "#accordion" ).accordion();
      });

    $("<option value='1'> January </option>").appendTo("#fromMonth");
    $("<option value='2'> February </option>").appendTo("#fromMonth");
    $("<option value='3'> March </option>").appendTo("#fromMonth");
    $("<option value='4'> April </option>").appendTo("#fromMonth");
    $("<option value='5'> May </option>").appendTo("#fromMonth");
    $("<option value='6'> June </option>").appendTo("#fromMonth");
    $("<option value='7'> July </option>").appendTo("#fromMonth");
    $("<option value='8'> August </option>").appendTo("#fromMonth");
    $("<option value='9'> September </option>").appendTo("#fromMonth");
    $("<option value='10'> October </option>").appendTo("#fromMonth");
    $("<option value='11'> November </option>").appendTo("#fromMonth");
    $("<option value='12'> December </option>").appendTo("#fromMonth");

    $("<option value='1'> January </option>").appendTo("#toMonth");
    $("<option value='2'> February </option>").appendTo("#toMonth");
    $("<option value='3'> March </option>").appendTo("#toMonth");
    $("<option value='4'> April </option>").appendTo("#toMonth");
    $("<option value='5'> May </option>").appendTo("#toMonth");
    $("<option value='6'> June </option>").appendTo("#toMonth");
    $("<option value='7'> July </option>").appendTo("#toMonth");
    $("<option value='8'> August </option>").appendTo("#toMonth");
    $("<option value='9'> September </option>").appendTo("#toMonth");
    $("<option value='10'> October </option>").appendTo("#toMonth");
    $("<option value='11'> November </option>").appendTo("#toMonth");
    $("<option value='12'> December </option>").appendTo("#toMonth");

}

window.tabs = function (){
    $('.tab').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        $('.contenido').css('display', 'none');
        $('#'+id).css('display', 'block');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        
    });

}

var ge;
var currentKmlObject = null;

 function finished(kmlObject) {
    if (!kmlObject) {
      setTimeout(function() {
        alert('Bad or null KML.');
      }, 0);
      return;
    }else{
      console.log("LLEGO BIEN");
      currentKmlObject = kmlObject;
      ge.getFeatures().appendChild(kmlObject);
    }
  }



window.init = function() {
   addBindings();
   tabs();
   google.earth.createInstance('map3d', initCallback, failureCallback);
}


window.getInformation = function (url){
  if (currentKmlObject) {
    ge.getFeatures().removeChild(currentKmlObject);
    currentKmlObject = null;
    }
  google.earth.fetchKml(ge, url, finished);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
}

function failureCallback(errorCode) {
}


var chartData = []; // para graficos

// Muestra los resultados de un JSON devuelto tras la llamada AJAX
function showResults(response, request) {
	var chartData = [];
	var y = request.yearBegin;
	
	for (var i=0; i<response.max.length; i++) {
		chartData.push({
			year: y,
			max: response.max[i],
			min: response.min[i],
			avg: response.avg[i]
		});	
		y++;
	}
	
	chart.dataProvider = chartData;
	chart.validateData();
}


// Comprueba si los años son validos
function checkYears(yearBegin, yearEnd) {
	year_now = (new Date).getFullYear();
	return ($.isNumeric(yearBegin) && $.isNumeric(yearEnd) &&
		yearBegin >= 1983 && yearEnd <= year_now &&
		yearEnd >= yearBegin);
}


// Loading
function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

// Lightsoff
function lightsoff() {
	$("#lightsoff").click( 
	 function() {
	 	$('#Playerholder, #Player, embed, object')
		.css({ 'visibility' : 'visible' });
	 	$('#loading').css('display', 'block');
		$('body')
		.append('<div id="lightsoff-background"></div>');

		var page_size = getPageSize();
		
		$('#lightsoff-background')
		.css({
			backgroundColor:	"#000",
			opacity:			0.9,
			width:				page_size[2],
			height:				page_size[1]
		}).show();

		$('#lightsoff-background').click(function() {
			$('#lightsoff-background')
			.fadeOut(function() { 
				$('#lightsoff-background').remove(); 
			});
			$('#loading').css('display', 'none');
			return false;
		});
		return false;
	 });
}


// Efecto apagar
function apagar() {
	$('#Playerholder, #Player, embed, object')
	.css({ 'visibility' : 'visible' });
 	$('#loading').css('display', 'block');
	$('body')
	.append('<div id="lightsoff-background"></div>');

	var page_size = getPageSize();
	
	$('#lightsoff-background')
	.css({
		backgroundColor:	"#000",
		opacity:			0.9,
		width:				page_size[2],
		height:				page_size[1]
	}).show();
}

// Efecto encender
function encender() {
	$('#lightsoff-background')
	.fadeOut(function() { 
		$('#lightsoff-background').remove(); 
	});
	$('#loading').css('display', 'none');
	return false;
}

jQuery(document).ready(function() {
	lightsoff();
});


$(document).ready(function(){
    init();
	$("#measureSelect").change(function() {
      console.log($("#measureSelect").val());
});});