import {SongText} from '../song-text';

test('My Test', () => {
    expect(new SongText('Song Text').toOnlyText()).toMatch('Song Text');
});
