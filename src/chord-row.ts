import { RowInterface } from './interfaces';
import { Chord } from './chord';

export class ChordRow implements RowInterface {
  private chords: Chord[];

  constructor(chords: Chord[]) {
    this.chords = chords;
  }

  ToEmpChord(lang: string, transposition: number): string {
    let row = "<span class='chord'>";
    for (const item of this.chords) {
      row = row + item.toString(lang, transposition);
    }
    row = row + '</span>' + '<br>';
    return row;
  }

  ToHtmlText(): string {
    return '';
  }

  ToOnlyText(): string {
    return '';
  }

  ToString(lang: string, transposition: number): string {
    let row = '';
    for (const item of this.chords) {
      row = row + item.toString(lang, transposition);
    }
    return row + '\n';
  }
}
