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


export { 
  readFile,
  writeFileData,
  parseFileData,
  unparseFileData,
  convertParagraphsIndentations,
  filterWithLessSentences,
  filterWithMoreSentences
};