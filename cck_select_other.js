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
        var field_wrapper = '#field-' + field_str + '-' + lang + '-' + delta + '-wrapper';
        var ActionBind = (($.browser.msie == true) ? 'click' : 'change');

        $(document).ready( function() {
          // We need to go up further up the element chain to work around 'add another item'
          $(field_wrapper).find('select').bind(ActionBind,function() {
            // Add parent() to hide input wrapper
            $(this).parents(field_wrapper).find('input').parent().css('display', ($(this).val() == "other") ? 'block' : 'none');
          }).trigger(ActionBind);
        });
      });
    }
  }
})(jQuery);
