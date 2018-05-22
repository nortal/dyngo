import {Injectable} from '@angular/core';
import {FormService} from './form.service';

@Injectable()
export class TranslationService {

  constructor(private formService: FormService) {}

  public translate(formName: string, value: any, lang: string): string {
    if (typeof value === 'string') {
      return this.lookupInDictionary(formName, value, lang);
    }
    return this.translateValue(value, lang);
  }

  private translateValue(translations: { [key: string]: string }, lang: string): string {
    if (!!translations) {
      return translations[lang] || '## MISSING TRANSLATION ##';
    }
  };

  private lookupInDictionary(formName: string, key: string, lang: string): string {
    const dictionary = this.formService.getForm(formName).dictionary;
    if (!!dictionary && !!dictionary[key]) {
      return (<any>dictionary[key])[lang] || '## MISSING TRANSLATION ##';
    }
  };

}
