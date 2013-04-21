// to see the options selected all the time and 
$(function(){
  var auxFromYear;
  var auxToYear;

  var auxFromMonth;
  var auxToMonth;

  var auxFromDay;
  var auxToDay;

  var auxMeasure;

  $("#fromYear").change(function() {
    auxFromYear = parseInt($("#fromYear option:selected").text());
    $("#saveYears").html("(" + auxFromYear + "-" + auxToYear + ")");
  });
  $("#toYear").change(function() {
    auxToYear = parseInt($("#toYear option:selected").text());
    $("#saveYears").html("(" + auxFromYear + "-" + auxToYear + ")");
  });

  $("#fromMonth").change(function() {
    auxFromMonth = ($("#fromMonth option:selected").text());
    $("#saveMonths").html("(" + auxFromMonth + "-" + auxToMonth + ")");
  });
  $("#toMonth").change(function() {
    auxToMonth = ($("#toMonth option:selected").text());
    $("#saveMonths").html("(" + auxFromMonth + "-" + auxToMonth + ")");
  });

  $("#datepickerFrom").change(function() {
    auxFromDay = ($("#datepickerFrom").val());
    $("#saveDays").html("(" + auxFromDay + "-" + auxToDay + ")");
  });
  $("#datepickerTo").change(function() {
    auxToDay = ($("#datepickerTo").val());
    $("#saveDays").html("(" + auxFromDay + "-" + auxToDay + ")");
  });

  $("#measureSelection").change(function() {
    auxToDay = ($("#measureSelection option:selected").text());
    $("#saveMeasure").html(auxMeasure);
  });
});