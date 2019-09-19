export const SCH_FORM: any = {
    'type': 'form',
    'tags': [],
    'owner': '5b3e3b5c760bdadd58da823a',
    'components': [{
      'clearOnHide': false,
      'label': 'Columns',
      'input': false,
      'tableView': false,
      'key': 'columns',
      'type': 'columns',
      'hideLabel': true,
      'tags': [],
      'conditional': {'show': '', 'when': null, 'eq': ''},
      'properties': {},
      'customClass': '\'componentDefaults\': {\'label\': {\'width\': 7, \'textAlign\': \'right\'},\'control\': {\'width\': 4}}',
      'columns': [{
        'components': [{
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'text',
          'inputMask': '',
          'label': 'EmployeeID',
          'key': 'employeeId',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'multiple': false,
          'defaultValue': '',
          'protected': false,
          'unique': true,
          'persistent': true,
          'hidden': true,
          'clearOnHide': true,
          'spellcheck': true,
          'validate': {
            'required': true,
            'minLength': '',
            'maxLength': '',
            'pattern': '',
            'custom': '',
            'customPrivate': false
          },
          'conditional': {'show': 'false', 'when': null, 'eq': ''},
          'type': 'textfield',
          'labelPosition': 'left-right',
          'inputFormat': 'plain',
          'tags': [],
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'isNew': false,
          'allowMultipleMasks': true,
          'inputMasks': [{'mask': '', 'label': ''}]
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'text',
          'inputMask': '',
          'label': 'EmployeeCode',
          'key': 'employeeCode',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'multiple': false,
          'defaultValue': '',
          'protected': false,
          'unique': true,
          'persistent': true,
          'hidden': true,
          'clearOnHide': true,
          'spellcheck': true,
          'validate': {
            'required': true,
            'minLength': '',
            'maxLength': '',
            'pattern': '',
            'custom': '',
            'customPrivate': false
          },
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'type': 'textfield',
          'labelPosition': 'left-right',
          'inputFormat': 'plain',
          'tags': [],
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'isNew': false
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'radio',
          'label': 'Resident',
          'key': 'resident',
          'values': [{'value': 'yes', 'label': 'Yes', 'shortcut': ''}, {'value': 'no', 'label': 'No', 'shortcut': ''}],
          'defaultValue': '',
          'protected': false,
          'fieldSet': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {'required': true, 'custom': '', 'customPrivate': false},
          'type': 'radio',
          'labelPosition': 'left-right',
          'optionsLabelPosition': 'right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'label': 'Employed From',
          'key': 'employedFrom',
          'placeholder': '',
          'format': 'yyyy-MM-dd',
          'enableDate': true,
          'enableTime': false,
          'defaultDate': '',
          'datepickerMode': 'day',
          'datePicker': {
            'showWeeks': true,
            'startingDay': 0,
            'initDate': '',
            'minMode': 'day',
            'maxMode': 'year',
            'yearRows': 4,
            'yearColumns': 5,
            'minDate': null,
            'maxDate': null,
            'datepickerMode': 'day'
          },
          'timePicker': {
            'hourStep': 1,
            'minuteStep': 1,
            'showMeridian': true,
            'readonlyInput': false,
            'mousewheel': true,
            'arrowkeys': true
          },
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {'required': true, 'custom': ''},
          'type': 'datetime',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'label': 'Employed To',
          'key': 'employedTo',
          'placeholder': '',
          'format': 'yyyy-MM-dd',
          'enableDate': true,
          'enableTime': false,
          'defaultDate': '',
          'datepickerMode': 'day',
          'datePicker': {
            'showWeeks': true,
            'startingDay': 0,
            'initDate': '',
            'minMode': 'day',
            'maxMode': 'year',
            'yearRows': 4,
            'yearColumns': 5,
            'minDate': null,
            'maxDate': null,
            'datepickerMode': 'day'
          },
          'timePicker': {
            'hourStep': 1,
            'minuteStep': 1,
            'showMeridian': true,
            'readonlyInput': false,
            'mousewheel': true,
            'arrowkeys': true
          },
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {'required': true, 'custom': ''},
          'type': 'datetime',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'radio',
          'label': 'ITW5 Variation',
          'key': 'itw5',
          'values': [{'value': 'yes', 'label': 'Yes', 'shortcut': ''}, {'value': 'no', 'label': 'No', 'shortcut': ''}],
          'defaultValue': '',
          'protected': false,
          'fieldSet': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {'required': false, 'custom': '', 'customPrivate': false},
          'type': 'radio',
          'labelPosition': 'left-right',
          'optionsLabelPosition': 'right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Salary/Wages',
          'key': 'salary',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': true,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Bonus/Commission',
          'key': 'commission',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Housing Benefit',
          'key': 'house',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Furniture Benefit',
          'key': 'furniture',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Motor Car Benefit',
          'key': 'car',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Other Benefits',
          'key': 'otherBenefits',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Severance Pay / Gratuity (Gross)',
          'key': 'severance',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Retrenchment Package (Gross)',
          'key': 'retrenchment',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Other Payments',
          'key': 'otherPayments',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }], 'width': 6, 'offset': 0, 'push': 0, 'pull': 0
      }, {
        'components': [{
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Total Remuneration',
          'key': 'remuneration',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': true,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Calculated Remuneration',
          'key': 'calculatedRemuneration',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': '',
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Payments to Approved Fund',
          'key': 'fund',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Max Payments to Fund',
          'key': 'maxFund',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': '',
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Exempt Amount',
          'key': 'exempt',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Calculated Exempt Amount',
          'key': 'calculatedExempt',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': '',
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Amount Subject to PAYE',
          'key': 'paye',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': true,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Calculated PAYE amount',
          'key': 'taxable',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': true,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'hideLabel': false,
          'disabled': true,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Tax Deductible',
          'key': 'deductible',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': true,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true,
          'disabled': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'text',
          'inputMask': '',
          'label': 'Calculation Method',
          'key': 'calculationMethod',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'multiple': false,
          'defaultValue': '',
          'protected': false,
          'unique': false,
          'persistent': true,
          'hidden': true,
          'clearOnHide': true,
          'spellcheck': true,
          'validate': {
            'required': false,
            'minLength': '',
            'maxLength': '',
            'pattern': '',
            'custom': '',
            'customPrivate': false
          },
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'type': 'textfield',
          'labelPosition': 'left-right',
          'inputFormat': 'plain',
          'tags': [],
          'properties': {},
          'lockKey': true,
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Tax Deducted',
          'key': 'deducted',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }, {
          'autofocus': false,
          'input': true,
          'tableView': true,
          'inputType': 'number',
          'label': 'Discrepancy',
          'key': 'discrepancy',
          'placeholder': '',
          'prefix': '',
          'suffix': '',
          'defaultValue': '0',
          'protected': false,
          'persistent': true,
          'hidden': false,
          'clearOnHide': true,
          'validate': {
            'required': false,
            'min': 0,
            'max': '',
            'step': 'any',
            'integer': '',
            'multiple': '',
            'custom': ''
          },
          'type': 'number',
          'labelPosition': 'left-right',
          'tags': [],
          'conditional': {'show': '', 'when': null, 'eq': ''},
          'properties': {},
          'labelWidth': 60,
          'labelMargin': 3,
          'disabled': true,
          'delimiter': true,
          'decimalLimit': 2,
          'lockKey': true
        }], 'width': 6, 'offset': 0, 'push': 0, 'pull': 0
      }]
    }],
    'revisions': '',
    '_vid': 0,
    '_id': '5b3f6b19760bda28d2da8cca',
    'title': 'PAYE',
    'display': 'form',
    'access': [{'roles': [], 'type': 'create_own'}, {'roles': [], 'type': 'create_all'}, {
      'roles': [],
      'type': 'read_own'
    }, {
      'roles': ['5b3e3bfa760bda4152da8244', '5b3e3bfa760bda388fda8245', '5b3e3bfa760bdabafbda8246'],
      'type': 'read_all'
    }, {'roles': [], 'type': 'update_own'}, {'roles': [], 'type': 'update_all'}, {
      'roles': [],
      'type': 'delete_own'
    }, {'roles': [], 'type': 'delete_all'}, {'roles': [], 'type': 'team_read'}, {
      'roles': [],
      'type': 'team_write'
    }, {'roles': [], 'type': 'team_admin'}],
    'submissionAccess': [{'roles': [], 'type': 'create_own'}, {'roles': [], 'type': 'create_all'}, {
      'roles': [],
      'type': 'read_own'
    }, {'roles': [], 'type': 'read_all'}, {'roles': [], 'type': 'update_own'}, {
      'roles': [],
      'type': 'update_all'
    }, {'roles': [], 'type': 'delete_own'}, {'roles': [], 'type': 'delete_all'}, {
      'roles': [],
      'type': 'team_read'
    }, {'roles': [], 'type': 'team_write'}, {'roles': [], 'type': 'team_admin'}],
    'settings': {},
    'name': 'Paye',
    'path': 'paye',
    'project': '5b3e3bfa760bda8180da8243',
    'created': '2018-07-06T13:14:01.276Z',
    'modified': '2018-10-05T12:33:28.083Z',
    'machineName': 'eafqrdjrqpjyymz:Paye'
  };
