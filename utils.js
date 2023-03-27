import _ from 'lodash';
import * as fs from 'fs';

const readFile = (path) => {
  return _.attempt(() => {
    return fs.readFileSync(path, 'utf8');
  });
};

const parseFileData = (data) => {
  return _.chain(data)
    .split('\n\n')
    .map(paragraph => paragraph.split('.')
                               .filter(sentence => sentence.length > 0)
                               .map(sentence => sentence.trim()))
    .value();
};

const unparseFileData = (data) => {
  return _.chain(data)
    .map(paragraph => paragraph.join('. ') + '.')
    .join('\n\n')
    .value();
};

const writeFileData = (path, data) => {
  return _.attempt(() => {
    fs.writeFileSync(path, data);
  });
};

// rule 1: add n spaces before each sentence
const increaseSentenceIndentation = (paragraph, n) => paragraph.map(sentence => sentence.trimStart().padStart(n + sentence.length));
const convertSentencesIndentations = (paragraphs, n) => paragraphs.map(paragraph => increaseSentenceIndentation(paragraph, n));

// rule 2: add n break lines after each paragraph
const chunkLast = (paragraph) => [_.dropRight(paragraph), _.last(paragraph)]
const addLineBreaks = ([rest, last], n) => [...rest, last.padEnd(n + last.length, '\n')]
const convertParagraphLineBreaks = (paragraphs, n) => paragraphs.map(paragraph => addLineBreaks(chunkLast(paragraph), n));

// rule 3: trim the paragraph to n max length without cutting words
const joinParagraph = (paragraph) => paragraph.join('. ') + '.';
const trimToN = (n, string) => string.substr(0, n);
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
const trimAllParagraphs = (paragraphs, n) => paragraphs.map(paragraph => trimParagraph(paragraph, n));

const increaseIndentation = ([first, ...rest], n) => [first.padStart(n), ...rest];

// rule 4: each paragraph must have n spaces of indentation
const convertParagraphsIndentations = (paragraphs, n) => {
  return paragraphs.map(paragraph => increaseIndentation(paragraph, n));
};


// rule 5: ignore paragraphs that have less than n sentences
const filterWithLessSentences = (paragraphs, n) => {
  return paragraphs.filter(paragraph => paragraph.length >= n);
};

// rule 6: ignore paragraphs that have more than n sentences
const filterWithMoreSentences = (paragraphs, n) => {
  return paragraphs.filter(paragraph => paragraph.length <= n);
};

// rule 7: each sentence must appear in separate paragraph
const splitParagraphs = (paragraphs) => {
  return paragraphs.reduce((acc, paragraph) => {
    return acc.concat(paragraph.map(sentence => [sentence]));
  }, []);
};

// rule 8: Just n first sentences of each paragraph
const takeFirstSentences = (paragraphs, n) => {
  return paragraphs.map(paragraph => paragraph.slice(0, n));
};

export {
  readFile,
  writeFileData,
  parseFileData,
  unparseFileData,
  convertParagraphsIndentations,
  filterWithLessSentences,
  filterWithMoreSentences,
  splitParagraphs,
  takeFirstSentences,
  convertSentencesIndentations,
  convertParagraphLineBreaks,
  trimAllParagraphs
};