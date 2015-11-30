# xlsx-node
A simple XLSX Node library for reading and writing Excel file, including merger cell and setting cell size etc.

该 npm package 是基于 [js-xlsx](https://github.com/SheetJS/js-xlsx) 实现的。可以实现合并单元格、设置单元格宽度等定制API方法

## 开始

Install
```bash
npm install excel xlsx-node --save-dev
```

## 例子

### 简单例子，生成Excel

```js
var path = require('path');
var xlsxNode = require('../index');

var sheets = [{
  name: 'Sheet1',
  data: [['A1', 'B2', 'C3'], ['A2', 'B2', 'C3'], ['A3', 'B3', 'C3']]
}];

var outPath = path.join(__dirname, 'files/generator-excel.xlsx');
xlsxNode.genExcel(sheets, null, outPath);

```

### 生成包含合并表格的Excel

```js
var path = require('path');
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
  merges: [{s: {c: 0, r: 1}, e: {c: 1, r: 1}}, {s: {c: 0, r: 2}, e: {c: 0, r: 4}}, {s: {c: 0, r: 6}, e: {c: 2, r: 7}}]
}];

var outPath = path.join(__dirname, 'files/generator-merge-cell.xlsx');
xlsxNode.genExcel(sheets, null, outPath);

```

### 导出Excel数据

```js

var path = require('path');
var xlsxNode = require('../index');
var tables = xlsxNode.parse(path.join(__dirname, '/files/test.read.xlsx'));
console.info(JSON.stringify(tables));

```


## Testing

`xlsx-node` is tested with `assert` and `nodeunit`.

>
```bash
npm install --save-dev
npm test
```



## Authors

**Olivier Louvignes**

+ http://hopeblog.duapp.com/linder
+ https://github.com/demones


## Copyright and license

```
Copyright (C) 2012-2014  Olivier Louvignes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

Except where noted, this license applies to any and all software programs and associated documentation files created by the Original Author and distributed with the Software:

'node-xlsx.js' is a modified version of SheetJS gist examples, Copyright (c) SheetJS.
```