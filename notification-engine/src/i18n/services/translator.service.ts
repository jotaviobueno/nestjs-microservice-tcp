import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class TranslatorService {
  constructor(public readonly i18n: I18nService) {}

  getTranslatedMessages(
    paths: { [key: string]: string },
    options?: TranslateOptions,
  ): { [key: string]: string } {
    const i18nContext = I18nContext.current();

    return Object.keys(paths).reduce((acc, key) => {
      acc[key] = this.i18n.t(paths[key], {
        ...options,
        lang: i18nContext.lang,
      });

      return acc;
    }, {});
  }
}
