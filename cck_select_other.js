/**
 * @file
 * CCK Select Other Javascript Behaviors
 */

(function ($) {
  Drupal.behaviors.cckSelectOther = {
    /**
     * Bind to each cck select other field widget delta select element.
     */
    attach: function (context, settings) {
      // Prevent errors
      if (typeof settings.CCKSelectOther != 'object') return;

      var ActionBind = (($.browser.msie == true) ? 'click' : 'change');
      var input_element = '';

      for (n in settings.CCKSelectOther) {
        // Bind to each field list element. This could probably be more
        // optimized instead of binding for each?
        if (typeof settings.CCKSelectOther[n].list_element != 'string') continue;
        if (typeof settings.CCKSelectOther[n].input_element != 'string') continue;

        $('#' + settings.CCKSelectOther[n].list_element).bind(ActionBind, {element: settings.CCKSelectOther[n].input_element},  this.toggle).trigger(ActionBind);
      }
    },
    /**
     * Look through selected options of select list, and toggle the display
     * based on whether or not other is selected.
     */
    toggle: function (e) {
      var input_element = e.data.element;
      var select_other = 'none';

      $(this).children(':selected').each(function() {
          selected_other = ($(this).val() == 'other') ? 'block' : 'none';
      });

      $('#' + input_element).parent().css('display', selected_other);
    }
  }
})(jQuery);
