//$Id$

/**
 *  cck_select_other javascript file 
 */

var cckSelectOther = {};

Drupal.behaviors.cckSelectOther = function (context) {

//  $.browser.msie == true ? $(this).click(Drupal.ConditionalFields.fieldChange) : $(this).change(Drupal.ConditionalFields.fieldChange); 

  $.browser.msie == true ? $(this).click(cckSelectOther.switch) : $(this).change(cckSelectOther.switch);

//  document.write(Drupal.settings.CCKSelectOther.field.length);
  var field_str = new String(Drupal.settings.CCKSelectOther.field);
  var fields = new Array();
  fields = field_str.split(',');

  // i is our index
  for (i in fields) {
    var selectId = 'edit-field-'+fields[i]+'-select-other-list';
    var inputId = 'edit-field-'+fields[i]+'-select-other-text-input-wrapper';
    var value = $('#'+selectId+' option:selected').val();

    if (value == "other") {
      document.getElementById(inputId).style.display = 'block';
    }
    else {
      document.getElementById(inputId).style.display = 'none';
    }
  }

}

cckSelectOther.switch = function () {
  var field_str = new String(Drupal.settings.CCKSelectOther.field);
  var fields = new Array();
  fields = field_str.split(',');

  for (i in fields) {
    var selectId = 'edit-field-'+fields[i]+'-select-other-list';
    var inputId = 'edit-field-'+fields[i]+'-select-other-text-input-wrapper';
    var value = $('#'+selectId+' option:selected').val();

    if (value == "other") {
      document.getElementById(inputId).style.display = 'block';
    }
    else {
      document.getElementById(inputId).style.display = 'none';
    }
  }
}
