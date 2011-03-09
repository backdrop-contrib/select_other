//$Id$
/**
 * @file
 * cck_select_other javascript file 
 */

(function ($) {
  Drupal.behaviors.cckSelectOther = {
    attach: function (context, settings) {

      // Prevent errors
      if (typeof settings.CCKSelectOther != 'object') return;

      $.each(settings.CCKSelectOther, function(n,MyCCKSelectOther){

        // Prevent errors
        if (typeof MyCCKSelectOther.field == 'undefined') return;

        var field_str = new String(MyCCKSelectOther.field);
        field_str = field_str.replace(/_/g, '-');
        var lang = new String(MyCCKSelectOther.lang);
        var delta = new String(MyCCKSelectOther.delta);
        var field_id = '#edit-field-' + field_str + '-' + lang + '-' + delta + '-select-other';
        var ActionBind = (($.browser.msie == true) ? 'click' : 'change');

        $(document).ready( function() {
          $(field_id+'-list').bind(ActionBind,function() {
            // Add parent() to hide input wrapper
            $(field_id+'-text-input').parent().css('display', ($(this).val() == "other") ? 'block' : 'none');
          }).trigger(ActionBind);
        });
      });
    }
  }
})(jQuery);
