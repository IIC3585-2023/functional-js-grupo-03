import _ from 'lodash';

const increaseSentenceIndentation = (paragraph, n) => paragraph.map(sentence => sentence.trimStart().padStart(n));
const convertSentencesIndentations = (paragraphs, n) => paragraphs.map(paragraph => increaseSentenceIndentation(paragraph, n));
