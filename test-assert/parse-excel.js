'use strict';

var assert = require('assert');
var path = require('path');
var xlsxNode = require('../index');

var tables = xlsxNode.parse(path.join(__dirname, '/files/test.read.xlsx'));

var sheets = [{
  name: 'Sheet1',
  merges: [{s: {c: 0, r: 1}, e: {c: 1, r: 1}}, {s: {c: 0, r: 2}, e: {c: 0, r: 4}}, {s: {c: 0, r: 6}, e: {c: 2, r: 7}}],
  range: 'A1:C8',
  data: [
    ['列1', '列2', '列3'],
    ['A2', null, 'C2'],
    ['A3', 'B3', 'C3'],
    [null, 'B4', 'C4'],
    [null, 'B5', 'C5'],
    ['A6', 'B6', 'C6'],
    ['A7', null, null],
    [null, null, null]
  ]
}, {
  name: 'Sheet2',
  data: []
}, {
  name: 'Sheet3',
  data: []
}];

sheets.forEach(function (item) {
  item.data.forEach(function (itm) {
    itm.forEach(function (it, index) {
      if (it == null) {
        delete itm[index];
      }
    });
  });
});

assert.deepEqual(tables, sheets);
