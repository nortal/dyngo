export class DyngoFormControl {

  id: string;
  type: string;
  placeholder?: string;
  description?: string;
  options?: any;
  constraints?: { [key: string]: any };
  label?: string;
  defaultValue?: any;

  validate?: ValidateConstraints;

  key?: string;
  values?: any;
  html?: any;
  layout?: any;
  data?: any;
  columns?: any[];
  components?: any[];
  disabled?: boolean;
  hidden?: boolean;

  labelWidth?: number;
  labelPosition?: string;

}

export class ValidateConstraints {
  required: boolean;
  min: any;
  max: any;
}
