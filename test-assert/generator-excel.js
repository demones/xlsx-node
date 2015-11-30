'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var xlsxNode = require('../index');


var sheets = [{
  name: 'Sheet1',
  data: [['A1', 'B2', 'C3'], ['A2', 'B2', 'C3'], ['A3', 'B3', 'C3']]
}];

var outPath = path.join(__dirname, 'files/generator-excel.xlsx');
/*eslint-disable  no-sync*/
fs.unlinkSync(outPath);

xlsxNode.genExcel(sheets, null, outPath);
var tables = xlsxNode.parse(outPath);

sheets[0].range = 'A1:C3';

assert.deepEqual(tables, sheets);
