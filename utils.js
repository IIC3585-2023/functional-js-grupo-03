import _ from 'lodash';

const increaseSentenceIndentation = (paragraph, n) => paragraph.map(sentence => sentence.trimStart().padStart(n));
const convertSentencesIndentations = (paragraphs, n) => paragraphs.map(paragraph => increaseSentenceIndentation(paragraph, n));

const chunkLast = (paragraph) => [_.dropRight(paragraph), _.last(paragraph)]
const addLineBreaks = ([rest, last], n) => [...rest, last.padEnd(n, '\n')]
const convertParagraphLineBreaks = (paragraphs, n) => paragraphs.map(paragraph => addLineBreaks(chunkLast(paragraph), n));

const joinParagraph = (paragraph) => paragraph.join('. ') + '.';
const trimToN = (string, n) => string.substr(0, n);
const trimToLastWord = (string) => string.substr(0, Math.min(string.length, string.lastIndexOf(' ')));
const splitParagraph = (string) => string.split('.')
                                        .filter(sentence => sentence.length > 0)
                                        .map(sentence => sentence.trim());
const trimParagraph = (paragraph, n) => _.flow(
  joinParagraph,
  trimToN.bind(this, n),
  trimToLastWord,
  splitParagraph
)(paragraph)

export {
  convertSentencesIndentations,
  convertParagraphLineBreaks,
  trimParagraph
}