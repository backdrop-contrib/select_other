//$Id$

/**
 *  cck_select_other javascript file 
 */

(function ($) {
  Drupal.behaviors.cckSelectOther = {
    attach: function (context, settings) {

      //document.write(Drupal.settings.CCKSelectOther.field.length);
      var field_str = new String(settings.CCKSelectOther.field);
      var lang = new String(settings.CCKSelectOther.lang);
      var delta = new String(settings.CCKSelectOther.delta);
      var field = field_str.replace(/_/g, '-');

      var selectId = '#edit-field-' + field + '-' + lang + '-' + delta + '-select-other-list';
      var inputId = '#edit-field-' + field + '-' + lang + '-' + delta + '-select-other-text-input';
      var value = $(selectId + ' option:selected').val();

      $(document).ready( function() {
        value = $(selectId + ' option:selected').val();
        $(inputId).css('display', (value == "other") ? 'block' : 'none');

      });

      if ($.browser.msie == true) {
        $(selectId).click( function() {
          value = $(selectId + ' option:selected').val();
          $(inputId).css('display', (value == "other") ? 'block' : 'none');
        });
      }
      else {
        $(selectId).change( function() {
          value = $(selectId + ' option:selected').val();
          $(inputId).css('display', (value == "other") ? 'block' : 'none');
        });
      }
    }
  }
})(jQuery);
