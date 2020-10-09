import { RowInterface } from './interfaces';
import { TextRow } from './text-row';
import { Chord } from './chord';
import { ChordRow } from './chord-row';

export type ChordLang = 'en' | 'it';

export class SongText {
  private rows: RowInterface[] = [];
  private language: ChordLang;
  private transposition: number = 0;

  constructor(text: string) {
    this.parse(text);
    this.language = 'en';
  }

  private static isChord(chord: string): boolean {
    const rx = '([A-G]|[ACDFG]#|[ABDEG]b)(°|(d[io]m|ø)7?|([mM+]|maj|min|aug|)[467+]*|)$';

    return chord.match(rx) !== null;
  }

  public semitoneUp() {
    this.transposition++;
  }

  public semitoneDown() {
    this.transposition--;
  }

  public originalTon() {
    this.transposition = 0;
  }

  public setLanguage(lang: ChordLang) {
    this.language = lang;
  }

  public toString(lang: ChordLang = this.language, transposition: number = this.transposition): string {
    let text = '';
    for (const item of this.rows) {
      text = text + item.ToString(lang ?? this.language, transposition ?? this.transposition);
    }
    return text;
  }

  public toOnlyText(): string {
    let text = '';
    for (const item of this.rows) {
      text = text + item.ToOnlyText();
    }

    return text;
  }

  public toHtml(lang: ChordLang = this.language, transposition: number = this.transposition) {
    let text = '';
    for (const item of this.rows) {
      text = text + item.ToEmpChord(lang ?? this.language, transposition ?? this.transposition);
    }
    return text;
  }

  private parse(text: string) {
    this.rows = [];
    // let lines = text.split(new[] {"\r\n", "\r", "\n"}, StringSplitOptions.None);
    const lines = text.split(/\r\n|\n|\r/g);
    for (let row of lines) {
      if (row.trim() === '') {
        this.add(new TextRow());
      } else if (this.isChordRow(row.trim().split(' '))) {
        const chords: Chord[] = [];
        while (row.length !== 0) {
          let a;
          const spaces = row.search(/\S/);
          if (row.trim().indexOf(' ') !== -1) a = row.substring(0, row.trim().indexOf(' ') + spaces);
          else a = row.substring(0);
          chords.push(new Chord(a));
          row = row.substring(a.length);
        }
        this.add(new ChordRow(chords));
      } else {
        this.add(new TextRow(row));
      }
    }
  }

  private add(row: RowInterface) {
    this.rows.push(row);
  }

  private isChordRow(words: string[]): boolean {
    let result: boolean = true;

    words.forEach((word) => {
      if (word !== '') result = SongText.isChord(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return result;
  }
}
