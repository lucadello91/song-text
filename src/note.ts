export class Note {
  private notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
  private selectedNote: string = '';
  private selectedIndex: number = 0;

  constructor(note: string) {
    this.setNote(note);
  }

  public transposition(val: number) {
    let index = this.selectedIndex + val;
    index %= this.notes.length;

    return this.notes[index] ?? 'A';
  }

  private setNote(note: string) {
    this.selectedNote = note.charAt(0).toUpperCase() + note.slice(1);
    if (this.selectedNote === 'Db') this.selectedNote = 'C#';
    if (this.selectedNote === 'D#') this.selectedNote = 'Eb';
    if (this.selectedNote === 'E#') this.selectedNote = 'F';
    if (this.selectedNote === 'Fb') this.selectedNote = 'E';
    if (this.selectedNote === 'Gb') this.selectedNote = 'F#';
    if (this.selectedNote === 'Ab') this.selectedNote = 'G#';
    if (this.selectedNote === 'A#') this.selectedNote = 'Bb';
    if (this.selectedNote === 'B#') this.selectedNote = 'C';
    if (this.selectedNote === 'Cb') this.selectedNote = 'B';
    this.selectedIndex = this.notes.indexOf(this.selectedNote);

    if (this.selectedIndex < 0) this.selectedIndex = 0;
  }
}
