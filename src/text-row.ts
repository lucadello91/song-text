import { RowInterface } from './interfaces';

export class TextRow implements RowInterface {
  private readonly text: string;

  constructor(text: string = '') {
    this.text = text;
  }

  ToEmpChord(lang: string, transposition: number): string {
    return "<span class='text'>" + this.text + '</span><br>';
  }

  ToHtmlText(): string {
    return "<span class='text'>" + this.text + '</span><br>';
  }

  ToOnlyText(): string {
    return this.text + '\n';
  }

  ToString(lang: string, transposition: number): string {
    return this.text + '\n';
  }
}
