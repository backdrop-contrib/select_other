//$Id$

/**
 *  cck_select_other javascript file 
 */

var cckSelectOther = {};

Drupal.behaviors.cckSelectOther = function (context) {

//  $.browser.msie == true ? $(this).click(Drupal.ConditionalFields.fieldChange) : $(this).change(Drupal.ConditionalFields.fieldChange); 

  $.browser.msie == true ? $(this).click(cckSelectOther.blah) : $(this).change(cckSelectOther.blah);

  var selectId = 'edit-field-'+Drupal.settings.CCKSelectOther.field+'-select-other-list';
  var inputId = 'edit-field-'+Drupal.settings.CCKSelectOther.field+'-select-other-text-input-wrapper';
  var value = $('#'+selectId+' option:selected').val();

  if (value == "other") {
    document.getElementById(inputId).style.display = 'block';
  }
  else {
    document.getElementById(inputId).style.display = 'none';
  }

}

cckSelectOther.blah = function () {
  var selectId = 'edit-field-'+Drupal.settings.CCKSelectOther.field+'-select-other-list';
  var inputId = 'edit-field-'+Drupal.settings.CCKSelectOther.field+'-select-other-text-input-wrapper';
  var value = $('#'+selectId+' option:selected').val();

  if (value == "other") {
    document.getElementById(inputId).style.display = 'block';
  }
  else {
    document.getElementById(inputId).style.display = 'none';
  }
}
