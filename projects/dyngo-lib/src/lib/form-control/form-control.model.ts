export class FormControl {

  id: string;
  type: string;
  placeholder?: string;
  description?: string;
  options?: any;
  constraints?: { [key: string]: any };
  label?: string;
  defaultValue?: any;

  key?: string;
  values?: any;
  html?: any;
  layout?: any;
  data?: any;
  columns?: any[];
  components?: any[];
  disabled?: boolean;

  labelWidth?: number;
  labelPosition?: string;

}
