import * as util from './utils.js';
import _ from 'lodash';

const data = util.readFile('./inputs/file_4.txt');
const text = util.parseFileData(data);

// Sangria, salto linea y cortar frases
const example1 = (text, n) => _.flow(
  util.convertParagraphsIndentations,
  _.partial(util.convertParagraphLineBreaks, _, n),
  _.partial(util.filterWithLessSentences, _, n)
)(text, n)

// Ancho a lo más n, ignorar con menos de m frases, 
const example2 = (text, n, m) => _.flow(
  util.trimAllParagraphs,
  _.partial(util.takeFirstSentences, _, m),
  _.partial(util.convertParagraphLineBreaks, _, m),
)(text, n)

// Ignorar párrafos con más de n frases, cada frase debe estar en un párrafo y agregar n espacios antes de cada frase
const example3 = (text, n) => _.flow(
  util.filterWithMoreSentences,
  _.partial(util.splitParagraphs, _),
  _.partial(util.convertSentencesIndentations, _, n),
  _.partial(util.convertParagraphLineBreaks, _, n)
)(text, n)

util.writeFileData('./output_file_1.txt', util.unparseFileData(example1(text, 4)));
util.writeFileData('./output_file_2.txt', util.unparseFileData(example2(text, 90, 4)));
util.writeFileData('./output_file_3.txt', util.unparseFileData(example3(text, 4)));
