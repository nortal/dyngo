export class FormControl {

  id: string;
  type: string;
  placeholder?: string;
  description?: string;
  options?: any;
  constraints?: { [key: string]: any };
  label?: string;
  defaultValue?: any;

  values?: any;
  html?: any;
  layout?: any;
  data?: any;
  columns?: any[];
  components?: any[];

}
