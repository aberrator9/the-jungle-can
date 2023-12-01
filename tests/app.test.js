/**
 * @jest-environment jsdom
*/

require('./__mocks__/matchMedia.js');
const { fixQuote } = require("../js/app.js");

test('Returns neutral string', () => {
    expect(fixQuote('control string')).toBe('control string');
});

test('Replaces ambiguous quote characters', () => {
    expect(fixQuote('String with "ambiguous quotes"')).toBe('String with “ambiguous quotes”');
});

test('Removes spacing characters and trims beginning and end', () => {
    expect(fixQuote('\n\r\tseparated\nby\t\rspacing\n\t')).toBe('separated by spacing');
});

test('Formats \'_\' as italics', () => {
    expect(fixQuote('a _number_ of _underscores_')).toBe('a <i>number</i> of <i>underscores</i>');
});

test('Removes newlines', () => {
    expect(fixQuote('\nseparated\nby\nnewlines\n')).toBe('separated by newlines');
});

