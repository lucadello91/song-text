export interface RowInterface {
  ToString(lang: string, transposition: number): string;

  ToOnlyText(): string;

  ToEmpChord(lang: string, transposition: number): string;

  ToHtmlText(): string;
}
