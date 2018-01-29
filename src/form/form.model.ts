import {Container} from '../container/container.model';

export class Form {
  data: { [key: string]: any } = {};
  dictionary: { [key: string]: string };

  constructor(public rootContainer: Container, public lang: string) {

  }

}