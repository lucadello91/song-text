import { Note } from './note';

export class Chord {
  private readonly translations: { [key: string]: string } = {
    C: 'Do',
    'C#': 'Do#',
    D: 'Re',
    Eb: 'Mib',
    E: 'Mi',
    F: 'Fa',
    'F#': 'Fa#',
    G: 'Sol',
    'G#': 'Sol#',
    A: 'La',
    Bb: 'Sib',
    B: 'Si',
  };
  private readonly note: Note;
  private readonly mod: string;
  private readonly spaces: number;

  constructor(completeChord: string) {
    this.spaces = completeChord.length - completeChord.replace(new RegExp(' ', 'g'), '').length;
    completeChord = completeChord.trim();
    if (completeChord.length > 1 && (completeChord[1] === '#' || completeChord[1] === 'b')) {
      this.note = new Note(completeChord.substr(0, 2));
      completeChord = completeChord.substr(2);
    } else {
      this.note = new Note(completeChord[0].toString());
      completeChord = completeChord.substr(1);
    }
    this.mod = completeChord.toLowerCase();
  }

  public toString(lang: string, transposition: number) {
    let chord = '';
    for (let i = 0; i < this.spaces; i++) chord = chord + ' ';

    if (lang === 'en') chord = chord + this.note.transposition(transposition);
    else if (lang === 'it') {
      chord = chord + this.translations[this.note.transposition(transposition)];
    }

    chord = chord + this.mod;
    return chord;
  }
}
