/**
 * 生成自定义宽度Excel
 */

'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var xlsxNode = require('../index');

var sheets = [{
  name: 'Sheet1',
  data: [
    ['列1', '列2', '列3'],
    ['A2', null, 'C2'],
    ['A3', 'B3', 'C3'],
    [null, 'B4', 'C4'],
    [null, 'B5', 'C5'],
    ['A6', 'B6', 'C6'],
    ['A7', null, null],
    [null, null, null]
  ],
  merges: [{s: {c: 0, r: 1}, e: {c: 1, r: 1}}, {s: {c: 0, r: 2}, e: {c: 0, r: 4}}, {s: {c: 0, r: 6}, e: {c: 2, r: 7}}],
  cols: [{width: 50}, {width: 100}, {width: 150}]
}];

var outPath = path.join(__dirname, 'files/generator-width-cols.xlsx');
/*eslint-disable  no-sync*/
if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath);
}

xlsxNode.genExcel(sheets, null, outPath);
var tables = xlsxNode.parse(outPath);

sheets.forEach(function (item) {
  item.data.forEach(function (itm) {
    itm.forEach(function (it, index) {
      if (it == null) {
        delete itm[index];
      }
    });
  });
});

sheets[0].range = 'A1:C8';

assert.deepEqual(tables, sheets);
