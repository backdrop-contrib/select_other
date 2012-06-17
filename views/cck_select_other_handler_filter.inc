<?php
/**
 * @file
 */


/**
 * Extends Views in operator filter.
 */
class cck_select_other_handler_filter extends views_handler_filter_in_operator {

  /**
   * Init
   */
  function init(&$view, &$options) {
    parent::init($view, $options);

    $this->instance = field_info_instance($this->definition['entity_type'], $this->definition['field_name'], $this->definition['bundle']);
  }

  /**
   * Exposed form
   */
  function exposed_form(&$form, &$form_state) {
    parent::exposed_form($form, $form_state);

    $identifier = $this->options['expose']['identifier'];
    $form[$identifier]['#parents'] = array('options', $identifier);
    $form[$identifier]['select_other_list']['#parents'] = array('options', $identifier, 'select_other_list');
    $form[$identifier]['select_other_text_input']['#parents'] = array('options', $identifier, 'select_other_text_input');

  }

  function exposed_submit($form, &$form_state) {
    $identifier = $this->options['expose']['identifier'];
    $values = $form_state['values']['options'][$identifier];
    $form_state['values'][$identifier] = array();

    foreach ($values['select_other_list'] as $key => $value) {
      if ($value && $key == $value) {
        if ($value <> 'other') {
          $form_state['values'][$identifier][] = $value;
        }
        else {
          // Set the other value instead of 'other'
          $form_state['values'][$identifier][] = $values['select_other_text_input'];
        }
      }
    }

  }

  /**
   * Value form
   */
  function value_form(&$form, &$form_state) {
    parent::value_form($form, $form_state);

    $otherdef = '';
    $default = array();
    foreach ($this->value as $value) {
      if (isset($this->value_options[$value])) {
        $default[$value] = $value;
      }
      else {
        $default['other'] = 'other';
        $otherdef = $value;
      }
    }

    $options = $form['value']['#options'];
    $form['value'] = array(
      '#type' => 'container',
      '#tree' => TRUE,
      '#parents' => array('options', 'value'),
      'select_other_list' => array(
        // @note I am using checkboxes instead of select in the filter.
        '#type' => 'checkboxes',
        '#options' => $options,
        '#default_value' => $default,
        '#parents' => array('options', 'value', 'select_other_list'),
      ),
      'select_other_text_input' => array(
        '#type' => 'textfield',
        '#title' => t('Other'),
        '#title_display' => 'invisible',
        '#attributes' => array(
          'class' => array('form-text select_other_text_input'),
        ),
        '#default_value' => $otherdef,
        '#parents' => array('options', 'value', 'select_other_text_input'),
        '#size' => 10,
      ),
    );
  }

  function value_submit($form, &$form_state) {
    // Capture the values into a separate array and reset the value array.
    $values = $form_state['values']['options']['value'];
    $form_state['values']['options']['value'] = array();

    foreach ($values['select_other_list'] as $key => $value) {
      if ($value && $key == $value) {
        if ($value <> 'other') {
          $form_state['values']['options']['value'][] = $value;
        }
        else {
          // Set the other value instead of 'other'
          $form_state['values']['options']['value'][] = $values['select_other_text_input'];
        }
      }
    }
  }

  function get_value_options() {
    $this->value_options = cck_select_other_options($this->instance);

    // Get rid of - Select a value -
    unset($this->value_options['']);
  }
  
  function accept_exposed_input($input) {
    $ret = parent::accept_exposed_input($input);
    return $ret;
  }

  function query() {
    if (isset($this->value['select_other_list'])) {
      // @todo value_form standard probably needs to be changed to the
      // standard in_operator way that exposed_form conforms to.
      if ($this->value['select_other_list'] <> 'other') {
        // Remove the select other text input values or the list value from the values.
        unset($this->value['select_other_text_input']);
      }
      else if (!empty($this->value['select_other_text_input'])) {
        unset($this->value['select_other_list']);
      }
      else {
        // Invalid, don't filter.
        return;
      }
    }

    parent::query();
  }

  function admin_summary() {
    if (!empty($this->options['exposed'])) {
      return t('exposed');
    }

    $info = $this->operators();

    $this->get_value_options();

    if (!is_array($this->value)) {
      return;
    }

    $operator = check_plain($info[$this->operator]['short']);
    $values = '';

    $count = count($this->value);
    $i = 1;
    foreach ($this->value as $value) {
      if (isset($this->value_options[$value])) {
        $values .= check_plain($this->value_options[$value]);
      }
      else {
        $values .= t('%value', array('%value' => $value));
      }
      if ($i < $count) {
        $values .= ', ';
      }
      $i++;
    }

    return $operator . (($values !== '') ? ' (' . $values . ')' : '');
  }
}
