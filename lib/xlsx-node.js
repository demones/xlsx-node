'use strict';

var xlsx = require('xlsx');
var _ = require('underscore');

function dateNum(date, date1904) {
  if (date1904) date1904 += 1462;
  var epoch = Date.parse(date);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

/**
 * 格式化表格数据
 * @param data
 * @param merges 如果设置了merges，则使用 merges，否则根据数据自动生成 TODO 自动生成待实现
 * @returns {{}}
 */
function parseCellData(data, merges, cols) {
  var ws = {};
  var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
  for (var R = 0; R !== data.length; ++R) {
    for (var C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {v: data[R][C]};
      if (cell.v === null) continue;
      var cellRef = xlsx.utils.encode_cell({c: C, r: R});

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = xlsx.SSF._table[14];
        cell.v = dateNum(cell.v);
      }
      else cell.t = 's';

      ws[cellRef] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = xlsx.utils.encode_range(range);

  ws['!merges'] = merges;

  //TODO: 设置列宽待实现
  //if (cols) {
  //  ws['!cols'] = cols;
  //}
  return ws;
}

/**
 * Excel 工作表对象
 * @constructor
 */
function Workbook() {
  this.SheetNames = [];
  this.Sheets = {};
}

module.exports = {
  /**
   * 生成Excel文件
   * @param sheets
   * @param options
   * @param file
   */
  genExcel: function (sheets, options, file) {
    var defaults = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };
    var wb = new Workbook();
    sheets.forEach(function (sheet) {
      var name = sheet.name || 'Sheet';
      var data = parseCellData(sheet.data || [], sheet.merges, sheet.cols);
      wb.SheetNames.push(name);
      wb.Sheets[name] = data;
    });

    options = _.extend(options || {}, defaults);
    var data = xlsx.write(wb, options);
    if (!data) {
      return false;
    }
    var buffer = new Buffer(data, 'binary');
    if (!file) {
      return buffer;
    }
    xlsx.writeFile(wb, file, options);
    return true;
  },

  /**
   * 解析Excel，返回数据格式
   * @param file
   * @param options
   */
  parse: function (file, options) {
    var ws;
    if (typeof file === 'string') {
      ws = xlsx.readFile(file, options);
    } else {
      ws = xlsx.read(file, options);
    }

    return _.map(ws.Sheets, function (value, key) {
      var obj = {
        name: key,
        data: xlsx.utils.sheet_to_json(value, {header: 1, raw: true})
      };
      if (value['!merges']) {
        obj.merges = value['!merges'];
      }
      if (value['!ref']) {
        obj.range = value['!ref'];
      }
      return obj;
    });
  }
};
