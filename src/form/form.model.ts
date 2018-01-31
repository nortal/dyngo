import {Container} from '../container/container.model';

export class Form {
  data: { [key: string]: any } = {};
  dictionary: { [key: string]: string };
  submitCallback: SubmitCallback;

  constructor(public rootContainer: Container, public lang: string) {

  }

}

export type SubmitCallback = () => any;