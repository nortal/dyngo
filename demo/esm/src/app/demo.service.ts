import {Injectable} from '@angular/core';
import {FormService} from '../../lib/form';
import {Form} from '../../lib/form/form.model';


@Injectable()
export class DemoService {

  textInputs: any[] = [{
    "id": "textInputs",
    "type": "header",
    "label": {"en": "Text inputs"}
  },
    {
      "id": "simpleText",
      "type": "textInput",
      "label": {"en": "Simple text"},
      "placeholder": {"en": "abracadabra (from 5 to 15 characters)"},
      "constraints": {
        "min": 5,
        "max": 15
      }
    },
    {
      "id": "simpleTextUtf8",
      "type": "textInput",
      "label": {"en": "Simple text, UTF8 test: öäõüžš"},
      "placeholder": {"en": "öäõüžš"},
      "constraints": {
        "visible": "simpleText == 'abcde'"
      }
    },
    {
      "id": "simpleTextWoLabel",
      "type": "textInput",
      "placeholder": {"en": "I have no label!"}
    },
    {
      "id": "simpleTextRequired",
      "type": "textInput",
      "label": {"en": "Simple text (required)"},
      "placeholder": {"en": "abracadabra (up to 15 characters)"},
      "constraints": {
        "max": 15,
        "required": true
      }
    },
    {
      "id": "simpleTextDisabled",
      "type": "textInput",
      "label": {"en": "Simple text (disabled)"},
      "constraints": {
        "disabled": true
      }
    },
    {
      "id": "simpleTextWithDefaultValue",
      "type": "textInput",
      "label": {"en": "Simple text with default value"},
      "defaultValue": "this is default value"
    },
    {
      "id": "simpleTextWithHelp",
      "type": "textInput",
      "label": {"en": "Simple text with help"},
      "placeholder": {"en": "abracadabra (up to 15 characters)"},
      "description": {
        "title": {"en": "Some title"},
        "content": {"en": "Some help content for this field"}
      }
    }];

  numberInputs: any[] = [{
    "id": "numberInputs",
    "type": "header",
    "label": {"en": "Number inputs"}
  },
    {
      "id": "positiveNumber",
      "type": "numberInput",
      "label": {"en": "Positive number"},
      "placeholder": {"en": "Number in range 0...999"},
      "constraints": {
        "min": 0,
        "max": 999
      }
    },
    {
      "id": "negativeNumber",
      "type": "numberInput",
      "label": {"en": "Negative number"},
      "placeholder": {"en": "Number in range -999...-1"},
      "constraints": {
        "min": -999,
        "max": -1
      }
    },
    {
      "id": "numberInputRequired",
      "type": "numberInput",
      "label": {"en": "Number input (required)"},
      "constraints": {
        "required": true
      }
    },
    {
      "id": "numberInputDisabled",
      "type": "numberInput",
      "label": {"en": "Number input (disabled)"},
      "constraints": {
        "disabled": true
      },
      "description": {
        "content": {"en": "Some help content for required numeric without title."}
      }
    },
    {
      "id": "numberInputWithDefaultValue",
      "type": "numberInput",
      "label": {"en": "Number input with default value"},
      "defaultValue": 100500
    },
    {
      "id": "numberInputWithHelp",
      "type": "numberInput",
      "label": {"en": "Number input with help"},
      "description": {
        "title": {"en": "Some title"},
        "content": {"en": "Some help content for numeric field"}
      }
    }];

  selectControls: any[] = [{
    "id": "selectControls",
    "type": "header",
    "label": {"en": "Select controls"}
  },
    {
      "id": "select1",
      "type": "select",
      "label": {"en": "Simple select"},
      "constraints": {
        "required": true
      },
      "placeholder": {"en": "Please choose something"},
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"},
          "weight": 100500
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        }
      ]
    },
    {
      "id": "selectWithDefault",
      "type": "select",
      "label": {"en": "Simple select with default value"},
      "constraints": {
        "required": true
      },
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"},
          "weight": 100500
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        }
      ],
      "defaultValue": "option_3"
    },
    {
      "id": "selectWithHelp",
      "type": "select",
      "label": {"en": "Simple select with help"},
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"},
          "weight": 100500
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        }
      ],
      "description": {
        "title": {"en": "Some title"},
        "content": {"en": "Some help content for select."}
      }
    }];

  radios: any[] = [{
    "id": "radioVertical",
    "type": "radio",
    "label": {"en": "Radiobutton vertical"},
    "constraints": {
      "required": true
    },
    "options": [
      {
        "code": "option_1",
        "text": {"en": "Option 1"}
      },
      {
        "code": "option_2",
        "text": {"en": "Option 2"}
      },
      {
        "code": "option_3",
        "text": {"en": "Option 3"}
      },
      {
        "code": "option_4",
        "text": {"en": "Option 4"}
      },
      {
        "code": "option_5",
        "text": {"en": "Option 5"}
      }
    ]
  },
    {
      "id": "radioHorizontal",
      "type": "radio",
      "label": {"en": "Radiobutton horizontal"},
      "constraints": {
        "required": true
      },
      "layout": {
        "orientation": "horizontal"
      },
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"}
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_5",
          "text": {"en": "Option 5"}
        }
      ]
    },
    {
      "id": "radioWithDefault",
      "type": "radio",
      "label": {"en": "Radiobutton with default value"},
      "constraints": {
        "required": true
      },
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"}
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_5",
          "text": {"en": "Option 5"}
        }
      ],
      "defaultValue": "option_2"
    }];

  checkboxes: any[] = [{
    "id": "checkboxVertical",
    "type": "checkbox",
    "label": {"en": "Checkbox vertical"},
    "constraints": {
      "required": true
    },
    "options": [
      {
        "code": "option_1",
        "text": {"en": "Option 1"}
      },
      {
        "code": "option_2",
        "text": {"en": "Option 2"}
      },
      {
        "code": "option_3",
        "text": {"en": "Option 3"}
      },
      {
        "code": "option_4",
        "text": {"en": "Option 4"}
      },
      {
        "code": "option_5",
        "text": {"en": "Option 5"}
      }
    ]
  },
    {
      "id": "checkboxHorizontal",
      "type": "checkbox",
      "label": {"en": "Checkbox horizontal"},
      "constraints": {
        "required": true
      },
      "layout": {
        "orientation": "horizontal"
      },
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"}
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_5",
          "text": {"en": "Option 5"}
        }
      ]
    }, {
      "id": "checkboxWithDefault",
      "type": "checkbox",
      "label": {"en": "Checkbox with default values"},
      "constraints": {
        "required": true
      },
      "options": [
        {
          "code": "option_1",
          "text": {"en": "Option 1"}
        },
        {
          "code": "option_2",
          "text": {"en": "Option 2"}
        },
        {
          "code": "option_3",
          "text": {"en": "Option 3"}
        },
        {
          "code": "option_4",
          "text": {"en": "Option 4"}
        },
        {
          "code": "option_5",
          "text": {"en": "Option 5"}
        }
      ],
      "defaultValue": [
        "option_2",
        "option_5"
      ]
    }];

  constraints: any[] = [{
    "id": "constraints",
    "type": "header",
    "label": {"en": "Constraints"}
  },
    {
      "id": "countryNameVisible",
      "type": "radio",
      "layout": {
        "orientation": "horizontal"
      },
      "label": {"en": "'Country name' visible?"},
      "options": [{"code": "yes", "text": {"en": "Yes"}}, {"code": "no", "text": {"en": "No"}}],
      "defaultValue": "yes"
    },
    {
      "id": "countryNameEditable",
      "type": "radio",
      "layout": {
        "orientation": "horizontal"
      },
      "label": {"en": "'Country name' editable?"},
      "options": [{"code": "yes", "text": {"en": "Yes"}}, {"code": "no", "text": {"en": "No"}}],
      "defaultValue": "yes",
      "constraints": {
        "visible": "countryNameVisible === 'yes'"
      }
    },
    {
      "id": "countryNameRequired",
      "type": "radio",
      "layout": {
        "orientation": "horizontal"
      },
      "label": {"en": "'Country name' required?"},
      "options": [{"code": "yes", "text": {"en": "Yes"}}, {"code": "no", "text": {"en": "No"}}],
      "defaultValue": "no",
      "constraints": {
        "visible": "countryNameVisible === 'yes'"
      }
    },
    {
      "id": "countryName",
      "type": "textInput",
      "label": {"en": "Country name"},
      "constraints": {
        "visible": "countryNameVisible === 'yes'",
        "disabled": "countryNameEditable === 'no'",
        "required": "countryNameRequired === 'yes'"
      }
    },
    {
      "id": "passwordA",
      "type": "textInput",
      "label": {"en": "Choose your password"},
      "constraints": {
        "min": 5,
        "required": true
      }
    },
    {
      "id": "passwordB",
      "type": "textInput",
      "label": {"en": "Re-type your password"},
      "constraints": {
        "min": 5,
        "required": true,
        "visible": "passwordA && passwordA.length >= 5"
      }
    },
    {
      "id": "passwordsMatch",
      "type": "staticText",
      "label": {"en": "<strong>Passwords match!</strong>"},
      "constraints": {
        "visible": "passwordA === passwordB"
      }
    },
    {
      "id": "passwordsDoNotMatch",
      "type": "staticText",
      "label": {"en": "<strong>Passwords do not match!</strong>"},
      "constraints": {
        "visible": "(passwordA && passwordB) && passwordA != passwordB"
      }
    }
  ];

  others: any[] = [
    {
      "id": "initiallyHiddenContainer",
      "type": "panel",
      "label": {"en": "Initially hidden container"},
      "controls": [
        {
          "id": "initiallyHiddenNumber",
          "type": "numberInput",
          "label": {"en": "Initially hidden number input"},
          "constraints": {
            "visible": "radioVertical == 'option_2' && radioHorizontal == 'option_1'"
          }
        }
      ]
    },
    ,
    {
      "id": "staticControls",
      "type": "header",
      "label": {"en": "Static controls"}
    },
    {
      "id": "staticText",
      "type": "staticText",
      "label": {"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    },
    {
      "id": "functionControls",
      "type": "header",
      "label": {"en": "Functions"}
    },
    {
      "id": "textReplace",
      "type": "textInput",
      "label": {"en": "Replacing spaces"},
      "placeholder": {"en": "Spaces between words will be replaced with underscores"},
      "functions": [
        "setData(replaceSpaces(textReplace, '_'))"
      ]
    },
    {
      "id": "sumOfPositiveAndNegative",
      "type": "textInput",
      "label": {"en": "Sum of positive & negative"},
      "placeholder": {"en": "Sum of 'Positive number' and 'Negative number' will appear here"},
      "functions": [
        "setData(positiveNumber + negativeNumber)"
      ]
    },
    {
      "id": "hiddenControls",
      "type": "header",
      "label": {"en": "Hidden controls"}
    },
    {
      "id": "hiddenInto",
      "type": "staticText",
      "label": {"en": "In this section there is one hidden input with calculated value using simple formula: value of 'Positive number' is multiplied by 2.33. You can see this value in 'data' section below."}
    },
    {
      "id": "hiddenInput",
      "type": "hidden",
      "label": {"en": "hidden_input.sample"},
      "functions": [
        "setData(positiveNumber * 2.33)"
      ]
    },
    {
      "id": "errorsAndWarnings",
      "type": "header",
      "label": {"en": "Errors and warnings"}
    },
    {
      "id": "unknownInput",
      "type": "nonExistingType",
      "label": {"en": "I'm unknown"}
    },
    {
      "id": "customControls",
      "type": "header",
      "label": {"en": "Custom controls"}
    },
    {
      "id": "periodRange_1",
      "type": "periodRange",
      "label": {"en": "Period range"},
      "constraints": {
        "required": true
      },
      "options": {
        "units": [
          {
            "code": "seconds",
            "text": {"en": "seconds"}
          },
          {
            "code": "minutes",
            "text": {"en": "minutes"}
          },
          {
            "code": "hours",
            "text": {"en": "hours"}
          },
          {
            "code": "days",
            "text": {"en": "days"}
          }
        ]
      }
    }
  ];

  rootContainer: any = {controls: []};

  dictionary: any = {
    "error.required": {"en": "You did not enter a field."},
    "error.max": {"en": "Value should not be greater than {{max()}}."},
    "error.min": {"en": "Value should not be less than {{min()}}."},
    "error.maxlength": {"en": "The maximum number of characters allowed is {{max()}}."},
    "error.minlength": {"en": "The minumum number of characters allowed is {{min()}}."},
    "error.required_select": {"en": "No item selected."}
  };

  constructor(private formService: FormService) {
    this.addControls(this.textInputs);
    this.addControls(this.numberInputs);
    this.addControls(this.selectControls);
    this.addControls(this.radios);
    this.addControls(this.checkboxes);
    this.addControls(this.constraints);
    this.addControls(this.others);
  }

  private addControls(controls: any[]) {
    controls.forEach(c => this.rootContainer.controls.push(c));
  }

  public initWithBuiltInForm(formData: any): Form {
    let form = new Form(this.rootContainer, 'en');
    form.dictionary = this.dictionary;
    form.data = formData;
    this.formService.registerForm('demoForm', form);
    return form;
  }

  public init(rootContainer: any, formData: any): void {
    let form = new Form(rootContainer, 'en');
    // form.dictionary = this.rootContainer.dictionary;
    form.data = formData;
    this.formService.registerForm('demoForm', form);
  }

}
