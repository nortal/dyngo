import {Injectable} from '@angular/core';

@Injectable()
export class TranslationService {

  private dictionaries: any = {};

  public registerDictionary(formName: string, dictionary: any) {
    this.dictionaries[formName] = dictionary;
  }

  // public translate(formName: string, key: string, lang: string): string {
  //   // console.log('translate', formName, key, lang);
  //   let translatedValue;
  //   let dictionary = this.dictionaries[formName];
  //   if (!!dictionary && !!dictionary[lang]) {
  //     translatedValue = dictionary[lang][key];
  //   }
  //   if (!translatedValue) {
  //     translatedValue = key;
  //   }
  //   return translatedValue;
  // };

  public translate(formName: string, tranlations: { [key: string]: string }, lang: string): string {
    if (!!tranlations) {
      return tranlations[lang] || '## MISSING TRANSLATION ##';
    }
  };

}
