/**
 * @jest-environment jsdom
*/

require('./__mocks__/matchMedia.js');
const { fixQuote } = require("../js/app.js");

test('Returns neutral string', () => {
    expect(fixQuote('control string')).toBe('control string');
});

test('Removes special spacing characters', () => {
    expect(fixQuote('\n\r\tseparated\nby\t\rspacing\n\t')).toBe('separated by spacing');
});

test('Formats \'_\' as italics', () => {
    expect(fixQuote('an uneven _number_ of _underscores__')).toBe('an uneven <i>number</i> of <i>underscores</i>');
});

test('Removes newlines', () => {
    expect(fixQuote('\nseparated\nby\nnewlines\n')).toBe('separated by newlines');
});

