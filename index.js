import * as util from './utils.js';

const data = util.readFile('./input_file.txt');
const text = util.parseFileData(data);

const withMoreSentencesParagraphs = util.filterWithMoreSentences(text, 3);
const identationParagraphs = util.convertParagraphsIndentations(withMoreSentencesParagraphs, 4);

const parsedParagraphs = util.unparseFileData(identationParagraphs);

util.writeFileData('./output_file.txt', parsedParagraphs);
