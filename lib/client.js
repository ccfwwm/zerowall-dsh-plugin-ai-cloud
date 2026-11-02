window.__ModuleLoader__.load({ id: "@zerowall/dsh-plugin-ai-cloud", factory(require) { const module = { exports: {} }; const exports = module.exports; "use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    "use strict";
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    "use strict";
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module2) {
    "use strict";
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module2.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module2) {
    "use strict";
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module2.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    "use strict";
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module3 = data.get(row, col);
          if (module3 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module3;
            sameCountCol = 1;
          }
          module3 = data.get(col, row);
          if (module3 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module3;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    "use strict";
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    "use strict";
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    "use strict";
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module2) {
    "use strict";
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module2.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    "use strict";
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    "use strict";
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    "use strict";
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module2) {
    "use strict";
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module2.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module2) {
    "use strict";
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module2.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module2) {
    "use strict";
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module2.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module2) {
    "use strict";
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module2.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports, module2) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module2 !== "undefined") {
      module2.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    "use strict";
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    "use strict";
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    "use strict";
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/account/shared/types.ts
function accountGroupCatalog(account) {
  if (account.status !== "signedIn") return { groups: [], routes: [] };
  const groups = new Map((account.groups ?? []).map((group) => [group.groupId, group]));
  for (const model of [...account.models, ...account.mediaModels ?? []]) {
    if (!groups.has(model.groupId)) groups.set(model.groupId, { groupId: model.groupId, groupName: model.groupName, protocol: model.imageProtocol ?? "openai" });
  }
  return {
    ...account.gatewayBaseUrl ? { gatewayBaseUrl: account.gatewayBaseUrl } : {},
    groups: [...groups.values()],
    routes: account.models.map(({ providerId, groupId, modelId }) => ({ providerId, groupId, modelId }))
  };
}

// src/account/client/group-catalog.ts
var emptyCatalog = () => ({ groups: [], routes: [] });
var GroupCatalogStore = class {
  value = emptyCatalog();
  revision = 0;
  disposed = false;
  listeners = /* @__PURE__ */ new Set();
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  getSnapshot = () => this.value;
  set(value) {
    if (this.disposed || JSON.stringify(this.value) === JSON.stringify(value)) return;
    this.value = value;
    for (const listener of this.listeners) listener();
  }
  clear() {
    ++this.revision;
    this.set(emptyCatalog());
  }
  update(account) {
    ++this.revision;
    this.set(accountGroupCatalog(account));
  }
  async refresh(read) {
    const revision = ++this.revision;
    try {
      const value = await read();
      if (!this.disposed && revision === this.revision) this.set(value);
    } catch {
    }
  }
  dispose() {
    this.disposed = true;
    ++this.revision;
    this.listeners.clear();
  }
};
function displayGroups(providers, catalog) {
  const metadata = new Map(catalog.groups.map((group) => [group.groupId, group]));
  const routes = new Map(catalog.routes.map((route) => [JSON.stringify([route.providerId, route.modelId]), route.groupId]));
  const groups = /* @__PURE__ */ new Map();
  const rank = (id) => id === "deepseek-account" ? 0 : id === "deepseek-official" ? 1 : 2;
  for (const provider of [...providers].sort((a, b) => rank(a.id) - rank(b.id))) {
    for (const model of provider.models) {
      const groupId = routes.get(JSON.stringify([provider.id, model.id]));
      const group = groupId === void 0 ? void 0 : metadata.get(groupId);
      const key = groupId === void 0 ? JSON.stringify(["provider", provider.id]) : JSON.stringify(["cloud", catalog.gatewayBaseUrl, groupId]);
      let entry = groups.get(key);
      if (!entry) {
        entry = { key, name: group?.groupName ?? provider.name, cloud: groupId !== void 0, ...group ? { metadata: group } : {}, models: [] };
        groups.set(key, entry);
      }
      entry.models.push({ providerId: provider.id, model });
    }
  }
  return [...groups.values()];
}
function groupRate(group) {
  const rate = group?.rateMultiplier;
  return typeof rate === "number" && Number.isFinite(rate) && rate >= 0 ? `${rate}\xD7` : void 0;
}

// src/account/client/GroupedModelSelect.tsx
var import_react5 = require("react");
var import_react_dom2 = require("react-dom");

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = require("react");

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react = require("react");

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react2.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/arrow-left.js
var ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);

// node_modules/lucide-react/dist/esm/icons/check.js
var Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);

// node_modules/lucide-react/dist/esm/icons/chevron-down.js
var ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);

// node_modules/lucide-react/dist/esm/icons/chevron-right.js
var ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);

// node_modules/lucide-react/dist/esm/icons/circle-help.js
var CircleHelp = createLucideIcon("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);

// node_modules/lucide-react/dist/esm/icons/cloud.js
var Cloud = createLucideIcon("Cloud", [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
]);

// node_modules/lucide-react/dist/esm/icons/cpu.js
var Cpu = createLucideIcon("Cpu", [
  ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" }],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }]
]);

// node_modules/lucide-react/dist/esm/icons/credit-card.js
var CreditCard = createLucideIcon("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);

// node_modules/lucide-react/dist/esm/icons/external-link.js
var ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);

// node_modules/lucide-react/dist/esm/icons/eye-off.js
var EyeOff = createLucideIcon("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);

// node_modules/lucide-react/dist/esm/icons/eye.js
var Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);

// node_modules/lucide-react/dist/esm/icons/loader-circle.js
var LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);

// node_modules/lucide-react/dist/esm/icons/log-out.js
var LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

// node_modules/lucide-react/dist/esm/icons/refresh-cw.js
var RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/send.js
var Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);

// node_modules/lucide-react/dist/esm/icons/settings-2.js
var Settings2 = createLucideIcon("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);

// node_modules/lucide-react/dist/esm/icons/shield-check.js
var ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);

// node_modules/lucide-react/dist/esm/icons/x.js
var X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

// src/account/client/GroupInfo.tsx
var import_react4 = require("react");
var import_react_dom = require("react-dom");

// src/account/client/model-locales.ts
var MODEL_NS = "zerowallAccountModels";
var zh = {
  group: "\u5206\u7EC4",
  model: "\u6A21\u578B",
  effort: "\u63A8\u7406\u5F3A\u5EA6",
  select: "\u9009\u62E9\u6A21\u578B",
  menu: "\u5206\u7EC4\u3001\u6A21\u578B\u4E0E\u63A8\u7406\u5F3A\u5EA6",
  searchGroups: "\u641C\u7D22\u5206\u7EC4\u2026",
  searchModels: "\u641C\u7D22\u6A21\u578B\u2026",
  back: "\u8FD4\u56DE",
  empty: "\u6CA1\u6709\u5339\u914D\u7684\u6A21\u578B\u6216\u5206\u7EC4",
  info: "\u5206\u7EC4\u4ECB\u7ECD",
  noDescription: "\u6682\u65E0\u5206\u7EC4\u4ECB\u7ECD\u3002",
  rate: "\u5206\u7EC4\u500D\u7387",
  unknownRate: "\u500D\u7387\u672A\u63D0\u4F9B",
  billing: "\u5206\u7EC4\u500D\u7387\u4F5C\u7528\u4E8E\u57FA\u7840\u4EF7\u683C\uFF0C\u5B9E\u9645\u8D39\u7528\u4EE5\u5E73\u53F0\u7ED3\u7B97\u4E3A\u51C6\u3002",
  external: "\u4F7F\u7528\u5DF2\u914D\u7F6E\u7684\u4F9B\u5E94\u5546\uFF0C\u8D39\u7528\u4EE5\u8BE5\u4F9B\u5E94\u5546\u5B9A\u4EF7\u4E3A\u51C6\u3002",
  mediaBilling: "\u5A92\u4F53\u6A21\u578B\u53EF\u80FD\u91C7\u7528\u72EC\u7ACB\u8BA1\u8D39\u89C4\u5219\uFF0C\u8BF7\u67E5\u770B\u5E73\u53F0\u6A21\u578B\u4EF7\u683C\u3002",
  close: "\u5173\u95ED\u4ECB\u7ECD",
  retry: "\u91CD\u8BD5",
  defaultEffort: "\u4F9B\u5E94\u5546\u9ED8\u8BA4",
  unavailable: "\u5F53\u524D\u9009\u62E9\u6682\u4E0D\u53EF\u7528",
  configured: "\u5DF2\u914D\u7F6E\u4F9B\u5E94\u5546",
  cloud: "ZeroWall AI Cloud",
  updated: "\u6700\u8FD1\u540C\u6B65",
  syncing: "\u6B63\u5728\u540C\u6B65\u2026",
  noEffort: "\u5F53\u524D\u6A21\u578B\u672A\u63D0\u4F9B\u63A8\u7406\u5F3A\u5EA6\u3002"
};
var en = {
  group: "Group",
  model: "Model",
  effort: "Reasoning effort",
  select: "Select model",
  menu: "Group, model and reasoning effort",
  searchGroups: "Search groups\u2026",
  searchModels: "Search models\u2026",
  back: "Back",
  empty: "No matching models or groups",
  info: "Group details",
  noDescription: "No group description provided.",
  rate: "Group multiplier",
  unknownRate: "Multiplier not provided",
  billing: "The group multiplier applies to the base price. Final charges are determined by the platform.",
  external: "Uses your configured provider. Pricing is determined by that provider.",
  mediaBilling: "Media models may use separate billing rules. Check the platform model pricing.",
  close: "Close details",
  retry: "Retry",
  defaultEffort: "Provider default",
  unavailable: "Current selection is unavailable",
  configured: "Configured providers",
  cloud: "ZeroWall AI Cloud",
  updated: "Last synced",
  syncing: "Syncing\u2026",
  noEffort: "This model does not declare reasoning levels."
};
var defaultModelText = (key) => zh[key];

// src/account/client/use-floating-panel.ts
var import_react3 = require("react");
function useFloatingPanel(open, anchor, panel) {
  const [position, setPosition] = (0, import_react3.useState)({ visibility: "hidden", left: 0, top: 0 });
  (0, import_react3.useLayoutEffect)(() => {
    if (!open) return;
    const place = () => {
      const rect = anchor.current?.getBoundingClientRect();
      const menu = panel.current;
      if (!rect || !menu) return;
      const margin = 12;
      const top = rect.top - menu.offsetHeight - 8;
      const left = Math.max(margin, Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - margin));
      const nextTop = Math.max(margin, Math.min(top >= margin ? top : rect.bottom + 8, window.innerHeight - menu.offsetHeight - margin));
      setPosition((previous) => previous.left === left && previous.top === nextTop && previous.visibility !== "hidden" ? previous : { left, top: nextTop });
    };
    place();
    const observer = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(place);
    if (panel.current) observer?.observe(panel.current);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, anchor, panel]);
  return position;
}

// src/account/client/GroupedModelSelect.module.css
var GroupedModelSelect_default = {
  root: "GroupedModelSelect_root",
  trigger: "GroupedModelSelect_trigger",
  row: "GroupedModelSelect_row",
  infoButton: "GroupedModelSelect_infoButton",
  triggerName: "GroupedModelSelect_triggerName",
  triggerMeta: "GroupedModelSelect_triggerMeta",
  triggerIcon: "GroupedModelSelect_triggerIcon",
  menu: "GroupedModelSelect_menu",
  infoPanel: "GroupedModelSelect_infoPanel",
  check: "GroupedModelSelect_check",
  value: "GroupedModelSelect_value",
  rootRow: "GroupedModelSelect_rootRow",
  groupRow: "GroupedModelSelect_groupRow",
  rate: "GroupedModelSelect_rate",
  paneHeader: "GroupedModelSelect_paneHeader",
  search: "GroupedModelSelect_search",
  effortControl: "GroupedModelSelect_effortControl",
  choices: "GroupedModelSelect_choices",
  section: "GroupedModelSelect_section",
  groupName: "GroupedModelSelect_groupName",
  modelName: "GroupedModelSelect_modelName",
  description: "GroupedModelSelect_description",
  help: "GroupedModelSelect_help",
  error: "GroupedModelSelect_error",
  loading: "GroupedModelSelect_loading",
  spin: "GroupedModelSelect_spin",
  "zws-model-spin": "GroupedModelSelect_zws-model-spin"
};

// src/account/client/GroupInfo.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function RateBadge({ group, t = defaultModelText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: GroupedModelSelect_default.rate, title: t("rate"), "aria-label": `${t("rate")}\uFF1A${groupRate(group) ?? t("unknownRate")}`, children: groupRate(group) ?? t("unknownRate") });
}
function GroupInfo({ name, group, cloud = true, media = false, t = defaultModelText }) {
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [pinned, setPinned] = (0, import_react4.useState)(false);
  const anchor = (0, import_react4.useRef)(null);
  const panel = (0, import_react4.useRef)(null);
  const closeButton = (0, import_react4.useRef)(null);
  const hideTimer = (0, import_react4.useRef)();
  const restoringFocus = (0, import_react4.useRef)(false);
  const id = (0, import_react4.useId)();
  const position = useFloatingPanel(open, anchor, panel);
  const cancelHide = () => {
    window.clearTimeout(hideTimer.current);
  };
  const preview = () => {
    cancelHide();
    if (!restoringFocus.current) setOpen(true);
  };
  const leave = () => {
    cancelHide();
    if (!pinned && document.activeElement !== anchor.current && !panel.current?.contains(document.activeElement)) {
      hideTimer.current = window.setTimeout(() => setOpen(false), 120);
    }
  };
  const blur = (target2) => {
    if (!pinned && !anchor.current?.contains(target2) && !panel.current?.contains(target2)) setOpen(false);
  };
  const close = () => {
    cancelHide();
    setOpen(false);
    setPinned(false);
    restoringFocus.current = true;
    anchor.current?.focus();
    restoringFocus.current = false;
  };
  (0, import_react4.useEffect)(() => () => window.clearTimeout(hideTimer.current), []);
  (0, import_react4.useEffect)(() => {
    if (!open) return;
    const outside = (event) => {
      if (!panel.current?.contains(event.target) && !anchor.current?.contains(event.target)) {
        setOpen(false);
        setPinned(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);
  (0, import_react4.useEffect)(() => {
    if (!pinned) return;
    closeButton.current?.focus();
    const timer = window.setTimeout(() => closeButton.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [pinned]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref: anchor,
        className: GroupedModelSelect_default.infoButton,
        type: "button",
        "aria-label": `${t("info")}\uFF1A${name}`,
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": open ? id : void 0,
        onMouseEnter: preview,
        onMouseLeave: leave,
        onFocus: preview,
        onBlur: (event) => blur(event.relatedTarget),
        onKeyDown: (event) => {
          if (open && event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            close();
          }
        },
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          cancelHide();
          if (pinned) close();
          else {
            setOpen(true);
            setPinned(true);
          }
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { size: 15, "aria-hidden": "true" })
      }
    ),
    open && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: panel,
        id,
        className: GroupedModelSelect_default.infoPanel,
        style: position,
        role: "dialog",
        "aria-label": `${t("info")}\uFF1A${name}`,
        "data-zws-group-info": "true",
        onMouseEnter: cancelHide,
        onMouseLeave: leave,
        onBlur: (event) => blur(event.relatedTarget),
        onKeyDown: (event) => {
          event.stopPropagation();
          if (event.key === "Escape") {
            event.preventDefault();
            close();
          } else if (event.key === "Tab") {
            event.preventDefault();
            closeButton.current?.focus();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { ref: closeButton, className: GroupedModelSelect_default.infoButton, type: "button", "aria-label": t("close"), onClick: close, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 }) })
          ] }),
          cloud && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              t("rate"),
              "\uFF1A"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RateBadge, { group, t })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: GroupedModelSelect_default.description, children: group?.description || t(cloud ? "noDescription" : "external") }),
          cloud && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: GroupedModelSelect_default.help, children: t("billing") }),
          media && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: GroupedModelSelect_default.help, children: t("mediaBilling") })
        ]
      }
    ), anchor.current?.closest('dialog, [role="dialog"]') ?? document.body)
  ] });
}

// src/account/client/GroupedModelSelect.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function GroupedModelSelect({ available, locked, directory, load, select, catalog, t }) {
  const state = (0, import_react5.useSyncExternalStore)((fn) => directory.subscribe(fn), () => directory.getSnapshot());
  const metadata = (0, import_react5.useSyncExternalStore)(catalog.subscribe, catalog.getSnapshot);
  const groups = (0, import_react5.useMemo)(() => displayGroups(state.groups, metadata), [state.groups, metadata]);
  const currentGroup = groups.find((group) => group.models.some((row) => row.providerId === state.current?.provider && row.model.id === state.current.model));
  const current = currentGroup?.models.find((row) => row.providerId === state.current?.provider && row.model.id === state.current.model);
  const reasoning = current?.model.reasoning;
  const highEffort = reasoning?.efforts.find((level) => level.id === "high");
  const effectiveEffort = state.current?.reasoningEffort ?? highEffort?.id ?? reasoning?.defaultEffort;
  const effortLabel = reasoning?.efforts.find((effort) => effort.id === effectiveEffort)?.name ?? state.retainedEffort ?? effectiveEffort;
  const busy = state.pending !== null;
  const [open, setOpen] = (0, import_react5.useState)(false);
  const [pane, setPane] = (0, import_react5.useState)("root");
  const [browseKey, setBrowseKey] = (0, import_react5.useState)();
  const [query, setQuery] = (0, import_react5.useState)("");
  const [error, setError] = (0, import_react5.useState)();
  const [retrySelection, setRetrySelection] = (0, import_react5.useState)();
  const [effortIndex, setEffortIndex] = (0, import_react5.useState)(0);
  const trigger = (0, import_react5.useRef)(null);
  const menu = (0, import_react5.useRef)(null);
  const search = (0, import_react5.useRef)(null);
  const mounted = (0, import_react5.useRef)(true);
  const defaultAttempt = (0, import_react5.useRef)();
  const id = (0, import_react5.useId)();
  const position = useFloatingPanel(open, trigger, menu);
  const browsing = groups.find((group) => group.key === browseKey) ?? currentGroup ?? groups[0];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredGroups = groups.filter((group) => `${group.name} ${group.metadata?.description ?? ""}`.toLocaleLowerCase().includes(normalizedQuery));
  const models = browsing?.models.filter((row) => `${row.model.name} ${row.model.id}`.toLocaleLowerCase().includes(normalizedQuery)) ?? [];
  const close = (focus = true) => {
    setOpen(false);
    setBrowseKey(void 0);
    setQuery("");
    if (focus) trigger.current?.focus();
  };
  const drill = (next) => {
    setQuery("");
    setPane(next);
    if (next === "root") setBrowseKey(void 0);
  };
  (0, import_react5.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const outside = (event) => {
      const target2 = event.target;
      if (trigger.current?.contains(target2) || menu.current?.contains(target2) || target2.closest?.("[data-zws-group-info]")) return;
      close(false);
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const target2 = search.current ?? menu.current?.querySelector('[aria-checked="true"]:not(:disabled), [data-choice]:not(:disabled)');
    target2?.focus();
  }, [open, pane]);
  (0, import_react5.useEffect)(() => {
    if (locked || !available) {
      setOpen(false);
      setBrowseKey(void 0);
    }
  }, [locked, available]);
  (0, import_react5.useEffect)(() => {
    if (pane === "effort" && reasoning) setEffortIndex(Math.max(0, reasoning.efforts.findIndex((level) => level.id === effectiveEffort)));
  }, [pane, reasoning, effectiveEffort]);
  const submit = async (selection) => {
    setError(void 0);
    setRetrySelection(selection);
    trigger.current?.focus();
    try {
      const result = await select(selection);
      if (!mounted.current) return;
      if (result?.ok) {
        setRetrySelection(void 0);
        close();
      } else if (result && !result.ok) setError(`${result.error.code}: ${result.error.message}`);
    } catch (reason) {
      if (mounted.current) setError(reason instanceof Error ? reason.message : String(reason));
    }
  };
  (0, import_react5.useEffect)(() => {
    const selected = state.current;
    if (!selected || selected.reasoningEffort !== void 0 || !highEffort || busy || locked || !available) return;
    const key = JSON.stringify([selected.provider, selected.model]);
    if (defaultAttempt.current === key) return;
    defaultAttempt.current = key;
    void select({ ...selected, reasoningEffort: highEffort.id }).catch((reason) => {
      if (mounted.current) setError(String(reason));
    });
  }, [state.current, highEffort, busy, locked, available, select]);
  const choose = (row) => {
    if (row.providerId === state.current?.provider && row.model.id === state.current.model && state.current.reasoningEffort !== void 0) {
      close();
      return;
    }
    const effort = row.model.reasoning?.efforts.some((level) => level.id === state.current?.reasoningEffort) ? state.current?.reasoningEffort : row.model.reasoning?.efforts.find((level) => level.id === "high")?.id ?? row.model.reasoning?.defaultEffort;
    void submit({ provider: row.providerId, model: row.model.id, ...effort === void 0 ? {} : { reasoningEffort: effort } });
  };
  const keyDown = (event) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Escape" || event.key === "Tab" && event.shiftKey) {
      event.preventDefault();
      if (pane !== "root") drill("root");
      else close();
      return;
    }
    const rows = [...menu.current?.querySelectorAll("[data-choice]:not(:disabled)") ?? []];
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const active = rows.indexOf(document.activeElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? rows.length - 1 : active < 0 ? event.key === "ArrowDown" ? 0 : rows.length - 1 : (active + (event.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length;
      rows[next]?.focus();
      rows[next]?.scrollIntoView?.({ block: "nearest" });
    } else if (event.key === "Enter" && event.target === search.current) {
      event.preventDefault();
      rows[0]?.click();
    } else if (event.key === "Tab") {
      const controls = [...menu.current?.querySelectorAll("button:not(:disabled), input") ?? []];
      if (document.activeElement === controls.at(-1)) {
        event.preventDefault();
        controls[0]?.focus();
      }
    }
  };
  if (!available) return null;
  const modelLabel = current?.model.name ?? state.current?.model ?? t("select");
  const rate = currentGroup?.cloud ? groupRate(currentGroup.metadata) ?? t("unknownRate") : void 0;
  const label = [modelLabel, rate, effortLabel].filter(Boolean).join(" \xB7 ");
  const isCurrent = (row) => row.providerId === state.current?.provider && row.model.id === state.current.model;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        ref: trigger,
        className: GroupedModelSelect_default.trigger,
        type: "button",
        disabled: locked,
        "aria-disabled": busy,
        title: label,
        "aria-label": `${t("select")}\uFF1A${label}`,
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": open ? id : void 0,
        onKeyDown: (event) => {
          if (open) keyDown(event);
        },
        onClick: () => {
          if (busy) return;
          if (open) {
            close();
            return;
          }
          setBrowseKey(currentGroup?.key);
          setPane("root");
          setQuery("");
          setError(void 0);
          setRetrySelection(void 0);
          setOpen(true);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Cpu, { size: 16, className: GroupedModelSelect_default.triggerIcon, "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.triggerName, children: modelLabel }),
          rate && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: GroupedModelSelect_default.triggerMeta, children: [
            "\xB7 ",
            rate
          ] }),
          effortLabel && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: GroupedModelSelect_default.triggerMeta, children: [
            "\xB7 ",
            effortLabel
          ] }),
          busy ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 14, className: GroupedModelSelect_default.spin }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronDown, { size: 13, "aria-hidden": "true" })
        ]
      }
    ),
    open && (0, import_react_dom2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: menu, id, className: GroupedModelSelect_default.menu, style: position, role: "dialog", "aria-label": t("menu"), onKeyDown: keyDown, children: [
      pane === "root" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.rootRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { "data-choice": true, type: "button", className: GroupedModelSelect_default.row, disabled: busy, "aria-label": `${t("group")} ${currentGroup?.name ?? ""}`, onClick: () => drill("group"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("group") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.value, children: currentGroup?.name ?? t("group") }),
            currentGroup?.cloud && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RateBadge, { group: currentGroup.metadata, t }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronRight, { size: 14 })
          ] }),
          currentGroup && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GroupInfo, { name: currentGroup.name, group: currentGroup.metadata, cloud: currentGroup.cloud, t })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { "data-choice": true, type: "button", className: GroupedModelSelect_default.row, disabled: busy, "aria-label": `${t("model")} ${modelLabel}`, onClick: () => drill("model"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("model") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.value, children: modelLabel }),
          currentGroup?.cloud && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RateBadge, { group: currentGroup.metadata, t }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronRight, { size: 14 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { "data-choice": true, type: "button", className: GroupedModelSelect_default.row, disabled: !reasoning || busy, onClick: () => drill("effort"), title: !reasoning ? t("noEffort") : void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("effort") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.value, children: effortLabel ?? t("defaultEffort") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronRight, { size: 14 })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: GroupedModelSelect_default.paneHeader, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: GroupedModelSelect_default.infoButton, "aria-label": t("back"), onClick: () => drill("root"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ArrowLeft, { size: 16 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: pane === "model" ? browsing?.name ?? t("model") : t(pane) }),
          pane === "model" && browsing && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GroupInfo, { name: browsing.name, group: browsing.metadata, cloud: browsing.cloud, t })
        ] }),
        pane !== "effort" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { ref: search, className: GroupedModelSelect_default.search, type: "search", "aria-label": t(pane === "group" ? "searchGroups" : "searchModels"), placeholder: t(pane === "group" ? "searchGroups" : "searchModels"), value: query, onChange: (event) => setQuery(event.target.value) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.choices, role: "menu", "aria-label": t(pane), children: [
          pane === "group" && filteredGroups.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            (index === 0 || filteredGroups[index - 1]?.cloud !== group.cloud) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: GroupedModelSelect_default.section, children: t(group.cloud ? "cloud" : "configured") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.groupRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { "data-choice": true, className: GroupedModelSelect_default.row, type: "button", role: "menuitemradio", "aria-checked": group.key === currentGroup?.key, disabled: busy, title: group.name, onClick: () => {
                setBrowseKey(group.key);
                drill("model");
              }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: GroupedModelSelect_default.groupName, children: [
                  group.name,
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: group.models.length })
                ] }),
                group.cloud && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RateBadge, { group: group.metadata, t }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.check, children: group.key === currentGroup?.key && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Check, { size: 15 }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GroupInfo, { name: group.name, group: group.metadata, cloud: group.cloud, t })
            ] })
          ] }, group.key)),
          pane === "model" && models.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { "data-choice": true, className: GroupedModelSelect_default.row, type: "button", role: "menuitemradio", "aria-checked": isCurrent(row), disabled: busy, title: `${row.model.name} (${row.providerId})`, onClick: () => choose(row), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.modelName, children: row.model.name }),
            browsing?.cloud && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RateBadge, { group: browsing.metadata, t }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: GroupedModelSelect_default.check, children: isCurrent(row) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Check, { size: 15 }) })
          ] }, JSON.stringify([row.providerId, row.model.id]))),
          pane === "effort" && reasoning && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.effortControl, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": t("effort"), type: "range", min: 0, max: Math.max(0, reasoning.efforts.length - 1), step: 1, value: effortIndex, "aria-valuetext": reasoning.efforts[effortIndex]?.name ?? effectiveEffort, disabled: busy || reasoning.efforts.length < 2, onChange: (event) => setEffortIndex(Number(event.target.value)), onKeyDown: (event) => {
              if (event.key !== "Escape" && event.key !== "Tab") event.stopPropagation();
            }, onPointerUp: (event) => {
              const level = reasoning.efforts[Number(event.currentTarget.value)];
              if (level && state.current) void submit({ ...state.current, reasoningEffort: level.id });
            }, onKeyUp: (event) => {
              if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(event.key)) return;
              const level = reasoning.efforts[Number(event.currentTarget.value)];
              if (level && state.current) void submit({ ...state.current, reasoningEffort: level.id });
            } }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("output", { children: reasoning.efforts[effortIndex]?.name ?? t("defaultEffort") })
          ] }) }),
          (pane === "model" && models.length === 0 || pane === "group" && filteredGroups.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: GroupedModelSelect_default.help, children: t("empty") })
        ] })
      ] }),
      state.routable === false && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: GroupedModelSelect_default.help, children: t("unavailable") }),
      state.failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: GroupedModelSelect_default.help, children: [
        failure.name,
        ": ",
        failure.message
      ] }, failure.id)),
      (error || state.error) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: GroupedModelSelect_default.error, role: "alert", children: [
        error ?? state.error,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => retrySelection ? void submit(retrySelection) : load(), disabled: busy, children: t("retry") })
      ] }),
      (state.status === "loading" || busy) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { role: "status", className: GroupedModelSelect_default.loading, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 15, className: GroupedModelSelect_default.spin }),
        t("syncing")
      ] })
    ] }), document.body)
  ] });
}

// src/account/client/account-surface.tsx
var import_react6 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var target = null;
var listeners = /* @__PURE__ */ new Set();
var openListeners = /* @__PURE__ */ new Set();
var accountSurface = {
  open() {
    for (const listener of openListeners) listener();
  },
  subscribeOpen(listener) {
    openListeners.add(listener);
    return () => {
      openListeners.delete(listener);
    };
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => target
};
function AccountSection() {
  const attach = (0, import_react6.useCallback)((node) => {
    target = node;
    for (const listener of listeners) listener();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: attach });
}

// src/account/client/AiCloudAccountButton.tsx
var import_react7 = require("react");
var import_react_dom3 = require("react-dom");
var import_browser = __toESM(require_browser(), 1);

// src/account/client/platform.ts
function gatewayPlatformUrl(baseUrl = "https://hkcode.aicodeme.xyz") {
  try {
    const url = new URL(baseUrl);
    if (url.protocol !== "https:" || url.username || url.password || url.port || !["hkcode.aicodeme.xyz", "code.aicodeme.xyz", "code.aicodeme.cn"].includes(url.hostname)) return void 0;
    return url.origin;
  } catch {
    return void 0;
  }
}
function accountConnection(account, unavailable = false) {
  if (unavailable || account?.status === "signedIn" && account.balanceFreshness === "stale") return "unavailable";
  if (account === void 0) return "loading";
  if (account.status === "authExpired") return "expired";
  return account.status === "signedIn" ? "online" : "offline";
}
function openPlatform(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// src/account/client/AiCloudAccountButton.module.css
var AiCloudAccountButton_default = {
  trigger: "AiCloudAccountButton_trigger",
  triggerIcon: "AiCloudAccountButton_triggerIcon",
  statusDot: "AiCloudAccountButton_statusDot",
  iconButton: "AiCloudAccountButton_iconButton",
  backdrop: "AiCloudAccountButton_backdrop",
  panel: "AiCloudAccountButton_panel",
  header: "AiCloudAccountButton_header",
  headerIdentity: "AiCloudAccountButton_headerIdentity",
  brandIcon: "AiCloudAccountButton_brandIcon",
  headerActions: "AiCloudAccountButton_headerActions",
  auth: "AiCloudAccountButton_auth",
  gateway: "AiCloudAccountButton_gateway",
  error: "AiCloudAccountButton_error",
  notice: "AiCloudAccountButton_notice",
  warning: "AiCloudAccountButton_warning",
  success: "AiCloudAccountButton_success",
  rechargeCard: "AiCloudAccountButton_rechargeCard",
  authLead: "AiCloudAccountButton_authLead",
  savedHint: "AiCloudAccountButton_savedHint",
  capabilities: "AiCloudAccountButton_capabilities",
  passwordField: "AiCloudAccountButton_passwordField",
  remember: "AiCloudAccountButton_remember",
  segmented: "AiCloudAccountButton_segmented",
  codeGroup: "AiCloudAccountButton_codeGroup",
  codeRow: "AiCloudAccountButton_codeRow",
  codeNotice: "AiCloudAccountButton_codeNotice",
  textButton: "AiCloudAccountButton_textButton",
  primary: "AiCloudAccountButton_primary",
  authActions: "AiCloudAccountButton_authActions",
  secondary: "AiCloudAccountButton_secondary",
  content: "AiCloudAccountButton_content",
  account: "AiCloudAccountButton_account",
  accountCard: "AiCloudAccountButton_accountCard",
  identity: "AiCloudAccountButton_identity",
  externalActions: "AiCloudAccountButton_externalActions",
  modelList: "AiCloudAccountButton_modelList",
  modelSearch: "AiCloudAccountButton_modelSearch",
  modelGroups: "AiCloudAccountButton_modelGroups",
  modelGroup: "AiCloudAccountButton_modelGroup",
  modelRows: "AiCloudAccountButton_modelRows",
  catalogNotice: "AiCloudAccountButton_catalogNotice",
  catalogEmpty: "AiCloudAccountButton_catalogEmpty",
  modelSync: "AiCloudAccountButton_modelSync",
  balance: "AiCloudAccountButton_balance",
  externalButton: "AiCloudAccountButton_externalButton",
  connectionBadge: "AiCloudAccountButton_connectionBadge",
  managedProvider: "AiCloudAccountButton_managedProvider",
  providerMeta: "AiCloudAccountButton_providerMeta",
  providerActions: "AiCloudAccountButton_providerActions",
  providerIdentity: "AiCloudAccountButton_providerIdentity",
  providerGateway: "AiCloudAccountButton_providerGateway",
  sectionHeading: "AiCloudAccountButton_sectionHeading",
  ordersHeader: "AiCloudAccountButton_ordersHeader",
  orderRow: "AiCloudAccountButton_orderRow",
  spin: "AiCloudAccountButton_spin",
  "zerowall-spin": "AiCloudAccountButton_zerowall-spin",
  syncButton: "AiCloudAccountButton_syncButton",
  groupHeading: "AiCloudAccountButton_groupHeading",
  logoutButton: "AiCloudAccountButton_logoutButton",
  billingGrid: "AiCloudAccountButton_billingGrid",
  paymentCard: "AiCloudAccountButton_paymentCard",
  paymentEmpty: "AiCloudAccountButton_paymentEmpty",
  amountChoices: "AiCloudAccountButton_amountChoices",
  paymentChoices: "AiCloudAccountButton_paymentChoices",
  securityNote: "AiCloudAccountButton_securityNote",
  orderAmount: "AiCloudAccountButton_orderAmount",
  qrFrame: "AiCloudAccountButton_qrFrame",
  payLink: "AiCloudAccountButton_payLink",
  polling: "AiCloudAccountButton_polling",
  status: "AiCloudAccountButton_status",
  orders: "AiCloudAccountButton_orders",
  emptyOrders: "AiCloudAccountButton_emptyOrders",
  embedded: "AiCloudAccountButton_embedded",
  balancePrompt: "AiCloudAccountButton_balancePrompt",
  balancePromptIcon: "AiCloudAccountButton_balancePromptIcon",
  promptClose: "AiCloudAccountButton_promptClose"
};

// src/account/client/AiCloudAccountButton.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var TERMINAL = /* @__PURE__ */ new Set(["COMPLETED", "FAILED", "CANCELLED", "EXPIRED", "REFUNDED"]);
var noSubscription = () => () => {
};
var noCatalog = () => void 0;
function AiCloudAccountButton(props) {
  const tModels = props.modelText ?? defaultModelText;
  const groupCatalog = (0, import_react7.useSyncExternalStore)(props.catalog?.subscribe ?? noSubscription, props.catalog?.getSnapshot ?? noCatalog);
  const target2 = (0, import_react7.useSyncExternalStore)(accountSurface.subscribe, accountSurface.getSnapshot);
  const firstCheck = (0, import_react7.useRef)(false);
  const [open, setOpen] = (0, import_react7.useState)(false);
  const [account, setAccount] = (0, import_react7.useState)();
  const [config, setConfig] = (0, import_react7.useState)();
  const [gateways, setGateways] = (0, import_react7.useState)([]);
  const [checkout, setCheckout] = (0, import_react7.useState)();
  const [registering, setRegistering] = (0, import_react7.useState)(false);
  const [forgotMode, setForgotMode] = (0, import_react7.useState)(false);
  const [syncingModels, setSyncingModels] = (0, import_react7.useState)(false);
  const modelSyncRequest = (0, import_react7.useRef)(0);
  const [modelQuery, setModelQuery] = (0, import_react7.useState)("");
  (0, import_react7.useEffect)(() => accountSurface.subscribeOpen(() => setOpen(true)), []);
  const [email, setEmail] = (0, import_react7.useState)("");
  const [password, setPassword] = (0, import_react7.useState)("");
  const [savedLoginAvailable, setSavedLoginAvailable] = (0, import_react7.useState)(false);
  const [passwordVisible, setPasswordVisible] = (0, import_react7.useState)(false);
  const [rememberPassword, setRememberPassword] = (0, import_react7.useState)(true);
  const [code, setCode] = (0, import_react7.useState)("");
  const [codeCooldown, setCodeCooldown] = (0, import_react7.useState)(0);
  const [sendingCode, setSendingCode] = (0, import_react7.useState)(false);
  const [resetCooldown, setResetCooldown] = (0, import_react7.useState)(0);
  const authPending = (0, import_react7.useRef)(false);
  const refreshPending = (0, import_react7.useRef)(false);
  const restoreAttempts = (0, import_react7.useRef)(0);
  const cancelAutoRestore = (0, import_react7.useRef)(() => {
  });
  const formEdited = (0, import_react7.useRef)(false);
  const configRequest = (0, import_react7.useRef)(0);
  const [codeNotice, setCodeNotice] = (0, import_react7.useState)();
  const [orders, setOrders] = (0, import_react7.useState)([]);
  const [activeOrder, setActiveOrder] = (0, import_react7.useState)();
  const [amount, setAmount] = (0, import_react7.useState)("100");
  const [paymentType, setPaymentType] = (0, import_react7.useState)("alipay");
  const [busy, setBusy] = (0, import_react7.useState)(false);
  const [relogging, setRelogging] = (0, import_react7.useState)(false);
  const [polling, setPolling] = (0, import_react7.useState)(false);
  const [error, setError] = (0, import_react7.useState)();
  const [success, setSuccess] = (0, import_react7.useState)();
  const [verificationGateway, setVerificationGateway] = (0, import_react7.useState)();
  const [qrImage, setQrImage] = (0, import_react7.useState)();
  const [balancePrompt, setBalancePrompt] = (0, import_react7.useState)(false);
  const balanceDialog = (0, import_react7.useRef)(null);
  const balancePrompted = (0, import_react7.useRef)(false);
  (0, import_react7.useEffect)(() => {
    if (codeCooldown <= 0 && resetCooldown <= 0) return;
    const codeUntil = Date.now() + codeCooldown * 1e3;
    const resetUntil = Date.now() + resetCooldown * 1e3;
    const timer = window.setInterval(() => {
      setCodeCooldown(Math.max(0, Math.ceil((codeUntil - Date.now()) / 1e3)));
      setResetCooldown(Math.max(0, Math.ceil((resetUntil - Date.now()) / 1e3)));
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [codeCooldown, resetCooldown]);
  (0, import_react7.useEffect)(() => {
    if (account?.status !== "signedIn" || account.balanceFreshness !== "current") {
      setBalancePrompt(false);
      return;
    }
    if (account.balance !== void 0 && Number.isFinite(account.balance) && account.balance <= 0 && !balancePrompted.current) {
      balancePrompted.current = true;
      setBalancePrompt(true);
    } else if (account.balance !== void 0 && account.balance > 0) setBalancePrompt(false);
  }, [account]);
  (0, import_react7.useEffect)(() => {
    if (!balancePrompt) return;
    const previous = document.activeElement;
    balanceDialog.current?.showModal();
    const escape = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setBalancePrompt(false);
    };
    window.addEventListener("keydown", escape, true);
    return () => {
      window.removeEventListener("keydown", escape, true);
      previous?.focus();
    };
  }, [balancePrompt]);
  const loadBilling = (0, import_react7.useCallback)(async () => {
    const [checkoutResult, ordersResult] = await Promise.allSettled([props.checkoutInfo(), props.listOrders()]);
    if (checkoutResult.status === "fulfilled") {
      setCheckout(checkoutResult.value);
      setAmount((current) => Number(current) < checkoutResult.value.minimumAmount ? String(checkoutResult.value.minimumAmount) : current);
      const supported = checkoutResult.value.paymentTypes.map(displayPaymentType);
      if (supported.length > 0 && !supported.includes(paymentType)) setPaymentType(supported[0] ?? "alipay");
    }
    if (ordersResult.status === "fulfilled" && Array.isArray(ordersResult.value)) setOrders(ordersResult.value);
  }, [paymentType, props.checkoutInfo, props.listOrders]);
  const refresh = (0, import_react7.useCallback)(async () => {
    if (authPending.current || refreshPending.current) return;
    refreshPending.current = true;
    setBusy(true);
    setError(void 0);
    const requestId = ++configRequest.current;
    void props.getPublicConfig().then((value) => {
      if (requestId === configRequest.current) setConfig(value);
    }).catch(() => {
      if (requestId === configRequest.current) setConfig(void 0);
    });
    void props.gateways().then(setGateways).catch(() => void 0);
    try {
      const nextAccount = await props.getAccount();
      setAccount({ ...nextAccount });
      if (nextAccount.status === "signedIn") await loadBilling();
      return nextAccount;
    } catch (reason) {
      setError(message(reason));
      return void 0;
    } finally {
      refreshPending.current = false;
      setBusy(false);
    }
  }, [loadBilling, props.getAccount, props.getPublicConfig]);
  (0, import_react7.useEffect)(() => {
    if (firstCheck.current) return;
    firstCheck.current = true;
    void refresh();
  }, [refresh]);
  (0, import_react7.useEffect)(() => {
    if (account?.autoLoginRetryable !== true || restoreAttempts.current >= 3) return;
    let active = true;
    let started = false;
    const retry = () => {
      if (!active || started || authPending.current || refreshPending.current) return;
      started = true;
      ++restoreAttempts.current;
      void refresh();
    };
    const timer = window.setTimeout(retry, [2e3, 8e3, 3e4][restoreAttempts.current]);
    window.addEventListener("online", retry);
    const cancel = () => {
      active = false;
      window.clearTimeout(timer);
      window.removeEventListener("online", retry);
    };
    cancelAutoRestore.current = () => {
      restoreAttempts.current = 3;
      cancel();
    };
    return cancel;
  }, [account, refresh]);
  (0, import_react7.useEffect)(() => {
    if (!open && !target2) return;
    let active = true;
    if (account === void 0) return;
    void props.savedLogin?.().then((saved) => {
      if (!active) return;
      setSavedLoginAvailable(saved !== void 0);
      if (account.status === "signedIn" || saved === void 0 || formEdited.current) return;
      setEmail(saved.email);
      setPassword(saved.password);
      setRememberPassword(true);
    }).catch(() => void 0);
    return () => {
      active = false;
    };
  }, [account?.status, props.savedLogin, open, target2]);
  (0, import_react7.useEffect)(() => {
    if (!open || target2) return;
    const close = (event) => {
      if (event.key !== "Escape" || balancePrompt || event.target instanceof Element && event.target.closest("[data-zws-group-info]")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setOpen(false);
    };
    window.addEventListener("keydown", close, true);
    return () => window.removeEventListener("keydown", close, true);
  }, [open, target2, balancePrompt]);
  (0, import_react7.useEffect)(() => {
    if (!open && !target2 || activeOrder === void 0 || TERMINAL.has(activeOrder.status.toUpperCase())) return;
    let cancelled = false;
    let timer;
    const poll = async () => {
      if (cancelled) return;
      setPolling(true);
      try {
        const next = activeOrder.outTradeNo ? await props.verifyOrder(activeOrder.outTradeNo) : await props.getOrder(activeOrder.id);
        if (cancelled) return;
        const updated = mergePaymentOrder(activeOrder, next);
        setActiveOrder(updated);
        setOrders((current) => [updated, ...current.filter((order) => order.id !== updated.id)]);
        if (updated.status.toUpperCase() === "COMPLETED") await refresh();
        else if (!TERMINAL.has(updated.status.toUpperCase())) timer = setTimeout(() => {
          void poll();
        }, 2500);
      } catch {
        if (!cancelled) timer = setTimeout(() => {
          void poll();
        }, 5e3);
      } finally {
        if (!cancelled) setPolling(false);
      }
    };
    timer = setTimeout(() => {
      void poll();
    }, 1800);
    return () => {
      cancelled = true;
      if (timer !== void 0) clearTimeout(timer);
    };
  }, [activeOrder?.id, activeOrder?.outTradeNo, activeOrder?.status, open, target2]);
  (0, import_react7.useEffect)(() => {
    let cancelled = false;
    setQrImage(void 0);
    if (!activeOrder?.qrCode) return;
    void import_browser.default.toDataURL(activeOrder.qrCode, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 220,
      color: { dark: "#17212b", light: "#ffffff" }
    }).then((value) => {
      if (!cancelled) setQrImage(value);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [activeOrder?.qrCode]);
  const authenticate = async () => {
    if (authPending.current || busy) return;
    if (forgotMode && !resetAvailable) {
      setError(props.t("account.resetUnavailable"));
      return;
    }
    if (registering && !registrationAvailable) {
      setError(props.t("account.registrationUnavailable"));
      return;
    }
    if (!validEmail(email)) {
      setError(props.t("account.invalidEmail"));
      return;
    }
    if (!forgotMode && password === "") return;
    if (forgotMode && resetCooldown > 0) return;
    if (!forgotMode && registering && password.length < 6) {
      setError(props.t("account.passwordHint"));
      return;
    }
    if (!forgotMode && registering && !/^[0-9]{6}$/.test(code.trim())) {
      setError(props.t("account.invalidCode"));
      return;
    }
    cancelAutoRestore.current();
    authPending.current = true;
    setSuccess(void 0);
    setBusy(true);
    setError(void 0);
    try {
      if (forgotMode) {
        await props.forgotPassword(email.trim().toLowerCase(), selectedGateway);
        setResetCooldown(60);
        setPassword("");
        setSuccess(props.t("account.resetSent"));
        return;
      }
      const next = registering ? await props.register(email.trim().toLowerCase(), password, code.trim(), rememberPassword, verificationGateway ?? selectedGateway) : await props.login(email.trim().toLowerCase(), password, rememberPassword);
      setAccount(next);
      setSavedLoginAvailable(rememberPassword);
      setCode("");
      await loadBilling();
      setOpen(false);
    } catch (reason) {
      setError(message(reason));
    } finally {
      authPending.current = false;
      setBusy(false);
    }
  };
  const syncModels = async () => {
    if (syncingModels || account?.status !== "signedIn") return;
    const request = ++modelSyncRequest.current;
    setSyncingModels(true);
    setError(void 0);
    try {
      const next = await props.discoverModels();
      await props.refreshModelCatalog?.();
      if (request !== modelSyncRequest.current) return;
      setAccount(next);
      setSuccess(props.t(hasIncompleteCatalog(next) ? "account.modelsSyncPartial" : "account.modelsSynced", { count: next.models.length }));
    } catch (reason) {
      if (request === modelSyncRequest.current) setError(message(reason));
    } finally {
      if (request === modelSyncRequest.current) setSyncingModels(false);
    }
  };
  const sendCode = async () => {
    if (codeCooldown > 0 || busy || authPending.current) return;
    if (!registrationAvailable) {
      setError(props.t("account.registrationUnavailable"));
      return;
    }
    if (!validEmail(email)) {
      setError(props.t("account.invalidEmail"));
      return;
    }
    authPending.current = true;
    setSendingCode(true);
    setBusy(true);
    setError(void 0);
    setSuccess(void 0);
    setCodeNotice(void 0);
    try {
      const result = await props.sendCode(email.trim().toLowerCase(), selectedGateway);
      setVerificationGateway(result.gatewayBaseUrl);
      setCodeCooldown(result.countdown);
      setCode("");
      setCodeNotice(props.t("account.codeSent", { email: email.trim().toLowerCase() }));
    } catch (reason) {
      setError(message(reason));
    } finally {
      authPending.current = false;
      setSendingCode(false);
      setBusy(false);
    }
  };
  const logout = async () => {
    cancelAutoRestore.current();
    ++modelSyncRequest.current;
    setSyncingModels(false);
    setBusy(true);
    setError(void 0);
    try {
      await props.logout();
      setAccount({ status: "signedOut", balanceFreshness: "current", lowBalance: false, models: [] });
      setOrders([]);
      setActiveOrder(void 0);
      const saved = await props.savedLogin?.();
      setSavedLoginAvailable(saved !== void 0);
      setRegistering(false);
      setPasswordVisible(false);
      setEmail(saved?.email ?? "");
      setPassword(saved?.password ?? "");
      setTimeout(() => document.querySelector('input[autocomplete="current-password"]')?.focus(), 0);
    } catch (reason) {
      setError(message(reason));
    } finally {
      setBusy(false);
    }
  };
  const relogin = async () => {
    if (busy || relogging || authPending.current) return;
    cancelAutoRestore.current();
    authPending.current = true;
    setRelogging(true);
    setBusy(true);
    setError(void 0);
    setSuccess(void 0);
    try {
      const next = await props.relogin();
      setAccount(next);
      setSavedLoginAvailable(true);
      await props.refreshModelCatalog?.().catch(() => void 0);
      await loadBilling();
      setSuccess(props.t(hasIncompleteCatalog(next) ? "account.modelsSyncPartial" : "account.reloginSuccess"));
    } catch (reason) {
      setError(message(reason));
    } finally {
      authPending.current = false;
      setRelogging(false);
      setBusy(false);
    }
  };
  const switchGateway = async (baseUrl) => {
    ++modelSyncRequest.current;
    setSyncingModels(false);
    if (authPending.current) return;
    cancelAutoRestore.current();
    formEdited.current = true;
    ++configRequest.current;
    setConfig(void 0);
    clearVerification();
    setSuccess(void 0);
    setBusy(true);
    setError(void 0);
    try {
      const next = await props.selectGateway(baseUrl);
      setAccount(next);
      setGateways((current) => current.map((gateway) => ({ ...gateway, preferred: gateway.baseUrl === baseUrl })));
      setConfig(await props.getPublicConfig(baseUrl));
      if (next.status === "signedIn") await loadBilling();
    } catch (reason) {
      setError(message(reason));
    } finally {
      setBusy(false);
    }
  };
  const createOrder = async () => {
    setBusy(true);
    setError(void 0);
    try {
      const order = await props.createOrder(Number(amount), paymentType);
      setActiveOrder(order);
      setOrders((current) => [order, ...current.filter((item) => item.id !== order.id)]);
    } catch (reason) {
      setError(message(reason));
    } finally {
      setBusy(false);
    }
  };
  const clearVerification = () => {
    setCode("");
    setVerificationGateway(void 0);
    setCodeNotice(void 0);
  };
  const changeMode = (mode) => {
    formEdited.current = true;
    setForgotMode(mode === "reset");
    setRegistering(mode === "register");
    setPasswordVisible(false);
    setError(void 0);
    setSuccess(void 0);
    if (mode !== "register") setCodeNotice(void 0);
    if (mode === "reset") setPassword("");
  };
  const continueOrder = (order) => {
    setActiveOrder(order);
  };
  const signedIn = account?.status === "signedIn";
  const restoring = account === void 0 && error === void 0;
  const selectedGateway = account?.gatewayBaseUrl ?? gateways.find((gateway) => gateway.preferred)?.baseUrl ?? gateways[0]?.baseUrl;
  const registrationAvailable = config?.registrationEnabled === true && config.emailVerifyEnabled && !config.captchaEnabled && !config.invitationCodeEnabled;
  const resetAvailable = config?.passwordResetEnabled === true && !config.captchaEnabled;
  const minimumAmount = checkout?.minimumAmount ?? 10;
  const paymentTypes = [...new Set((checkout?.paymentTypes ?? ["alipay", "wxpay"]).map(displayPaymentType))];
  const paymentUrl = activeOrder?.paymentUrl ?? checkout?.rechargeUrl ?? account?.rechargeUrl ?? config?.rechargeUrl;
  const orderComplete = activeOrder?.status.toUpperCase() === "COMPLETED";
  const activePaymentLabel = (0, import_react7.useMemo)(
    () => paymentLabel(displayPaymentType(activeOrder?.paymentType || paymentType), props.t),
    [activeOrder?.paymentType, paymentType, props.t]
  );
  const usageUrl = signedIn ? usagePageUrl(account?.gatewayBaseUrl) : void 0;
  const platformUrl = gatewayPlatformUrl(selectedGateway);
  const metadataGroups = groupCatalog?.groups ?? account?.groups ?? [];
  const groupMetadata = (groupId) => metadataGroups.find((group) => group.groupId === groupId);
  const filteredModels = account?.models.filter((model) => `${model.groupName} ${groupMetadata(model.groupId)?.description ?? ""} ${model.modelId} ${model.providerId} ${model.capability ?? "chat"}`.toLowerCase().includes(modelQuery.trim().toLowerCase())) ?? [];
  const modelGroups = groupModels(filteredModels);
  const mediaModelGroups = groupModels(account?.mediaModels?.filter((model) => `${model.groupName} ${groupMetadata(model.groupId)?.description ?? ""} ${model.modelId} ${model.mediaType}`.toLowerCase().includes(modelQuery.trim().toLowerCase())) ?? []);
  const connection = accountConnection(account, account === void 0 && error !== void 0);
  const accountStatusText = props.t(`account.connection.${connection}`);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.trigger, "data-zerowall-footer-action": true, "data-connection": connection, type: "button", onClick: () => {
      setOpen(true);
      void refresh();
    }, title: `${props.t("account.trigger")} \xB7 ${accountStatusText}`, "aria-label": props.t("account.trigger"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: AiCloudAccountButton_default.triggerIcon, "data-zerowall-footer-icon": true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Cloud, { size: 18, "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: AiCloudAccountButton_default.statusDot, "data-zerowall-footer-status-dot": true, "aria-hidden": "true" })
      ] }),
      props.wide && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: props.t("account.nav") })
    ] }),
    (open || target2) && (0, import_react_dom3.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: target2 ? AiCloudAccountButton_default.embedded : AiCloudAccountButton_default.backdrop, role: "presentation", onMouseDown: (event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: AiCloudAccountButton_default.panel, "data-auth": !signedIn, role: target2 ? void 0 : "dialog", "aria-modal": target2 ? void 0 : true, "aria-labelledby": "zerowall-account-title", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("header", { className: AiCloudAccountButton_default.header, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.headerIdentity, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: AiCloudAccountButton_default.brandIcon, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Cloud, { size: 22, "aria-hidden": "true" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "ZeroWall Science" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { id: "zerowall-account-title", children: restoring ? props.t("account.restoring") : signedIn ? props.t("account.centerTitle") : forgotMode ? props.t("account.resetTitle") : props.t("account.title") })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.headerActions, children: [
          platformUrl !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.iconButton, type: "button", onClick: () => openExternal(platformUrl), title: props.t("account.openPlatform"), "aria-label": props.t("account.openPlatform"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExternalLink, { size: 18 }) }),
          !target2 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.iconButton, type: "button", onClick: () => setOpen(false), title: props.t("common.close"), "aria-label": props.t("common.close"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(X, { size: 18 }) })
        ] })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.error, role: "alert", children: accountError(error, props.t) }),
      success && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.success, role: "status", children: success }),
      restoring ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.auth, role: "status", "aria-live": "polite", "aria-busy": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { size: 22, className: AiCloudAccountButton_default.spin, "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.authLead, children: props.t("account.restoringHint") }),
        !target2 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.secondary, type: "button", onClick: () => setOpen(false), children: props.t("common.close") })
      ] }) : !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("form", { className: AiCloudAccountButton_default.auth, noValidate: true, onSubmit: (event) => {
        event.preventDefault();
        void authenticate();
      }, children: [
        account?.status === "authExpired" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.notice, children: props.t("account.authExpired") }),
        !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: AiCloudAccountButton_default.capabilities, "aria-label": props.t("account.capabilities"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: props.t("account.capabilities") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: props.t("account.capabilitiesNote") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.authLead, children: props.t(forgotMode ? "account.resetLead" : registering ? "account.registerLead" : "account.authLead") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GatewaySelector, { gateways, selected: selectedGateway, disabled: busy, onChange: switchGateway, t: props.t }),
        !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.segmented, role: "group", "aria-label": props.t("account.actions"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", "aria-pressed": !registering, disabled: busy, onClick: () => changeMode("login"), children: props.t("account.login") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", "aria-pressed": registering, disabled: busy || !registrationAvailable, onClick: () => changeMode("register"), children: props.t("account.register") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { children: [
          props.t("account.email"),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "email", value: email, disabled: busy, onChange: (event) => {
            formEdited.current = true;
            setEmail(event.target.value);
            clearVerification();
            setSuccess(void 0);
            setError(void 0);
          }, autoComplete: "username", autoCapitalize: "none", spellCheck: false })
        ] }),
        !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.passwordField, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { htmlFor: "zerowall-account-password", children: props.t("account.password") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { id: "zerowall-account-password", type: passwordVisible ? "text" : "password", value: password, disabled: busy, onChange: (event) => {
                formEdited.current = true;
                setPassword(event.target.value);
              }, autoComplete: registering ? "new-password" : "current-password" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.iconButton, type: "button", disabled: busy, "aria-label": props.t(passwordVisible ? "account.hidePassword" : "account.showPassword"), title: props.t(passwordVisible ? "account.hidePassword" : "account.showPassword"), onClick: () => setPasswordVisible((value) => !value), children: passwordVisible ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(EyeOff, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Eye, { size: 17 }) })
            ] })
          ] }),
          registering && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.authLead, children: props.t("account.passwordHint") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: AiCloudAccountButton_default.remember, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "checkbox", disabled: busy, checked: rememberPassword, onChange: (event) => {
              const checked = event.target.checked;
              setRememberPassword(checked);
              if (!checked) {
                setSavedLoginAvailable(false);
                void props.forgetLogin().catch((reason) => setError(message(reason)));
              }
            } }),
            props.t("account.rememberPassword")
          ] })
        ] }),
        registering && !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.codeGroup, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { htmlFor: "zerowall-verification-code", children: props.t("account.code") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.codeRow, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { id: "zerowall-verification-code", disabled: busy, value: code, onChange: (event) => setCode(event.target.value), inputMode: "numeric", autoComplete: "one-time-code", maxLength: 6, "aria-describedby": "zerowall-code-help" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { type: "button", onClick: () => void sendCode(), disabled: busy || !registrationAvailable || !validEmail(email) || codeCooldown > 0, children: [
              sendingCode ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { className: AiCloudAccountButton_default.spin, size: 15, "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Send, { size: 15, "aria-hidden": "true" }),
              sendingCode ? props.t("account.sendingCode") : codeCooldown > 0 ? props.t("account.codeResend", { seconds: codeCooldown }) : props.t("account.sendCode")
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { id: "zerowall-code-help", className: codeNotice ? AiCloudAccountButton_default.codeNotice : AiCloudAccountButton_default.authLead, role: codeNotice ? "status" : void 0, children: codeNotice ?? props.t("account.codeHelp") })
        ] }),
        !registering && !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.textButton, type: "button", disabled: busy, onClick: () => changeMode("reset"), children: props.t("account.forgotPassword") }),
        !forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.savedHint, children: props.t(rememberPassword ? "account.savedHint" : "account.unsavedHint") }),
        forgotMode && (config?.passwordResetEnabled === false || config?.captchaEnabled) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.notice, children: props.t("account.resetUnavailable") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.authActions, children: [
          !target2 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.secondary, type: "button", onClick: () => setOpen(false), children: props.t("account.skip") }),
          savedLoginAvailable && !forgotMode && !registering && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.secondary, type: "button", onClick: () => void relogin(), disabled: busy || relogging, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { size: 15, className: relogging ? AiCloudAccountButton_default.spin : void 0 }),
            relogging ? props.t("account.relogging") : props.t("account.relogin")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.primary, type: "submit", disabled: busy || !validEmail(email) || (forgotMode ? resetCooldown > 0 || !resetAvailable : password === "" || registering && (!registrationAvailable || password.length < 6 || !/^[0-9]{6}$/.test(code.trim()))), children: busy && !sendingCode ? props.t("account.working") : forgotMode ? resetCooldown > 0 ? props.t("account.codeResend", { seconds: resetCooldown }) : props.t("account.sendReset") : registering ? props.t("account.registerConfigure") : props.t("account.loginConfigure") })
        ] }),
        forgotMode && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.textButton, type: "button", disabled: busy, onClick: () => changeMode("login"), children: props.t("account.backToLogin") })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.content, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GatewaySelector, { gateways, selected: account?.gatewayBaseUrl, disabled: busy, onChange: switchGateway, t: props.t }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.accountCard, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.identity, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: props.t("account.currentAccount") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: account.email }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: AiCloudAccountButton_default.connectionBadge, "data-connection": connection, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { "aria-hidden": "true" }),
                accountStatusText
              ] }),
              account.balanceFreshness === "stale" ? props.t("account.lastBalance") : props.t("account.signedIn")
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.balance, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: props.t("account.balance") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: formatBalance(account) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.logoutButton, type: "button", onClick: () => void logout(), disabled: busy, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LogOut, { size: 16 }),
            props.t("account.logout")
          ] }),
          savedLoginAvailable && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.externalButton, type: "button", onClick: () => void relogin(), disabled: busy || relogging, title: props.t("account.relogin"), "aria-label": props.t("account.relogin"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { size: 15, className: relogging ? AiCloudAccountButton_default.spin : void 0 }),
            relogging ? props.t("account.relogging") : props.t("account.relogin")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.externalActions, children: [
            usageUrl !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.externalButton, type: "button", onClick: () => openExternal(usageUrl), children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExternalLink, { size: 15 }),
              props.t("account.usageDetails")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.externalButton, type: "button", onClick: () => openExternal(modelPricingUrl), children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExternalLink, { size: 15 }),
              props.t("account.modelPricing")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: AiCloudAccountButton_default.modelSync, "aria-live": "polite", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: props.t("account.modelsTitle") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.modelsDescription") }),
            (account.modelSync?.checkedAt || account.mediaSync?.checkedAt) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { children: [
              tModels("updated"),
              "\uFF1A",
              formatDate([account.modelSync?.checkedAt, account.mediaSync?.checkedAt].filter(Boolean).sort().at(-1))
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.syncButton, type: "button", onClick: () => void syncModels(), disabled: busy || syncingModels, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { size: 15, className: syncingModels ? AiCloudAccountButton_default.spin : void 0 }),
            syncingModels ? props.t("account.modelsSyncing") : props.t("account.modelsSync")
          ] })
        ] }),
        hasIncompleteCatalog(account) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.catalogNotice, role: "status", children: props.t("account.modelsSyncPartial") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: AiCloudAccountButton_default.modelSearch, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Search, { size: 16, "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { "aria-label": props.t("account.modelsSearch"), placeholder: props.t("account.modelsSearch"), value: modelQuery, onChange: (event) => setModelQuery(event.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("details", { className: AiCloudAccountButton_default.modelList, open: modelQuery.trim() ? true : void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("summary", { children: [
            "\u5A92\u4F53\u6A21\u578B\uFF08",
            account.mediaModels?.length ?? 0,
            "\uFF09"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.modelGroups, children: mediaModelGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("details", { className: AiCloudAccountButton_default.modelGroup, open: modelQuery.trim() ? true : void 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("summary", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: AiCloudAccountButton_default.groupHeading, children: group.groupName }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RateBadge, { group: groupMetadata(group.key), t: tModels }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GroupInfo, { name: group.groupName, group: groupMetadata(group.key), media: true, t: tModels }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: group.models.length })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.modelRows, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.catalogEmpty, children: tModels("mediaBilling") }),
              group.models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: model.modelId }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RateBadge, { group: groupMetadata(group.key), t: tModels }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
                  model.mediaType,
                  " \xB7 ",
                  props.t(model.stale ? "account.modelsStale" : "account.modelsAvailable")
                ] })
              ] }, `${model.providerId ?? group.key}:${model.profileId}:${model.modelId}`))
            ] })
          ] }, group.key)) }),
          mediaModelGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.catalogEmpty, children: props.t(modelQuery.trim() ? "account.modelsNoMatches" : "account.modelsEmpty") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("details", { className: AiCloudAccountButton_default.modelList, open: modelQuery.trim() ? true : void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("summary", { children: props.t("account.modelsList", { count: account.models.length }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.modelGroups, children: modelGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("details", { className: AiCloudAccountButton_default.modelGroup, open: modelQuery.trim() ? true : void 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("summary", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: AiCloudAccountButton_default.groupHeading, children: group.groupName }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RateBadge, { group: groupMetadata(group.key), t: tModels }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GroupInfo, { name: group.groupName, group: groupMetadata(group.key), t: tModels }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: group.models.length })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.modelRows, children: group.models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: model.modelId }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RateBadge, { group: groupMetadata(group.key), t: tModels }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
                model.providerId.split("-").at(-1),
                " \xB7 ",
                model.capability ?? "chat",
                " \xB7 ",
                props.t(model.stale ? "account.modelsStale" : "account.modelsAvailable")
              ] })
            ] }, `${model.providerId}:${model.modelId}`)) })
          ] }, group.key)) }),
          modelGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.catalogEmpty, children: props.t(modelQuery.trim() ? "account.modelsNoMatches" : "account.modelsEmpty") })
        ] }),
        (account.lowBalance || account.balance !== void 0 && account.balance <= 0) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.warning, role: "alert", children: account.balance !== void 0 && account.balance <= 0 ? props.t("account.balanceEmpty") : props.t("account.lowBalance") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.billingGrid, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: AiCloudAccountButton_default.rechargeCard, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.sectionHeading, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: props.t("account.rechargeTitle") }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.rechargeDescription") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CreditCard, { size: 19 })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.amountChoices, children: [50, 100, 200, 500].map((value) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", "data-active": Number(amount) === value, onClick: () => setAmount(String(value)), children: value }, value)) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { children: [
              props.t("account.customAmount"),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "number", min: minimumAmount, step: "1", inputMode: "decimal", value: amount, onChange: (event) => setAmount(event.target.value) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: props.t("account.minimumAmount", { amount: minimumAmount }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.paymentChoices, role: "group", "aria-label": props.t("account.payment"), children: paymentTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", "data-active": paymentType === type, onClick: () => setPaymentType(type), children: paymentLabel(type, props.t) }, type)) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: AiCloudAccountButton_default.primary, type: "button", onClick: () => void createOrder(), disabled: busy || checkout?.enabled === false || Number(amount) < minimumAmount, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CreditCard, { size: 16 }),
              props.t("account.createPayment")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: AiCloudAccountButton_default.securityNote, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ShieldCheck, { size: 14 }),
              props.t("account.paymentSecurity")
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("section", { className: AiCloudAccountButton_default.paymentCard, children: activeOrder === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.paymentEmpty, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CreditCard, { size: 28 }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: props.t("account.paymentEmptyTitle") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.paymentEmptyDescription") })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.sectionHeading, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: props.t("account.orderNumber", { id: activeOrder.outTradeNo || String(activeOrder.id) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.paymentLive") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: AiCloudAccountButton_default.status, "data-status": activeOrder.status.toLowerCase(), children: statusLabel(activeOrder.status, props.t) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.orderAmount, children: [
              activeOrder.amount.toFixed(2),
              " ",
              account.currency ?? "CNY",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: activePaymentLabel })
            ] }),
            qrImage && !orderComplete && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.qrFrame, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: qrImage, alt: props.t("account.paymentQr") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: props.t("account.scanPayment") })
            ] }),
            paymentUrl && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("a", { className: AiCloudAccountButton_default.payLink, href: withSelection(paymentUrl, amount, paymentType), target: "_blank", rel: "noreferrer", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExternalLink, { size: 16 }),
              props.t("account.openPayment")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.polling, children: polling ? props.t("account.checkingPayment") : TERMINAL.has(activeOrder.status.toUpperCase()) ? statusLabel(activeOrder.status, props.t) : props.t("account.waitingPayment") })
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.ordersHeader, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { children: props.t("account.recentOrders") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.ordersDescription") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.iconButton, type: "button", onClick: () => void loadBilling(), disabled: busy, title: props.t("common.refresh"), "aria-label": props.t("common.refresh"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { size: 17 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.orders, children: orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: AiCloudAccountButton_default.emptyOrders, children: props.t("account.noOrders") }) : orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.orderRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: order.outTradeNo || `#${order.id}` }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: formatDate(order.createdAt) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
            order.amount.toFixed(2),
            " ",
            account.currency ?? "CNY"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: AiCloudAccountButton_default.status, "data-status": order.status.toLowerCase(), children: statusLabel(order.status, props.t) }),
          !TERMINAL.has(order.status.toUpperCase()) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", onClick: () => continueOrder(order), children: props.t("account.continuePayment") })
        ] }, order.id)) })
      ] })
    ] }) }), target2 ?? document.body),
    balancePrompt && (0, import_react_dom3.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("dialog", { ref: balanceDialog, className: AiCloudAccountButton_default.balancePrompt, "aria-labelledby": "zerowall-balance-prompt-title", onCancel: () => setBalancePrompt(false), children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.promptClose, type: "button", "aria-label": props.t("common.close"), onClick: () => setBalancePrompt(false), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(X, { size: 16 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: AiCloudAccountButton_default.balancePromptIcon, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CreditCard, { size: 28 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { id: "zerowall-balance-prompt-title", children: props.t("account.balancePromptTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: props.t("account.balancePrompt") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: AiCloudAccountButton_default.authActions, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.secondary, type: "button", onClick: () => setBalancePrompt(false), children: props.t("account.later") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: AiCloudAccountButton_default.primary, type: "button", onClick: () => {
          setBalancePrompt(false);
          setOpen(true);
          void refresh();
        }, children: props.t("account.rechargeTitle") })
      ] })
    ] }), document.body)
  ] });
}
function GatewaySelector({ gateways, selected, disabled, onChange, t }) {
  if (gateways.length === 0) return null;
  const value = selected ?? gateways.find((gateway) => gateway.preferred)?.baseUrl ?? gateways[0]?.baseUrl;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: AiCloudAccountButton_default.gateway, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: t("account.gateway") }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("select", { "aria-label": t("account.gateway"), value, disabled, onChange: (event) => onChange(event.target.value), children: gateways.map((gateway) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("option", { value: gateway.baseUrl, children: [
      gateway.label,
      " (",
      gateway.baseUrl.replace("https://", ""),
      ")"
    ] }, gateway.baseUrl)) })
  ] });
}
function groupModels(models) {
  const groups = /* @__PURE__ */ new Map();
  for (const model of models) {
    const key = model.groupId ?? model.groupName;
    let group = groups.get(key);
    if (!group) {
      group = { key, groupName: model.groupName, models: [] };
      groups.set(key, group);
    }
    group.models.push(model);
  }
  return [...groups.values()];
}
function hasIncompleteCatalog(account) {
  return [account.modelSync, account.mediaSync].some((sync) => sync !== void 0 && sync.status !== "succeeded");
}
function displayPaymentType(value) {
  return ["wechat", "wechat_pay", "wxpay", "wxpay_direct"].includes(value.toLowerCase()) ? "wechat" : "alipay";
}
function mergePaymentOrder(previous, next) {
  if (previous.id !== next.id) return next;
  const paymentUrl = next.paymentUrl ?? previous.paymentUrl;
  const qrCode = next.qrCode ?? previous.qrCode;
  const createdAt = next.createdAt ?? previous.createdAt;
  return {
    ...previous,
    ...next,
    outTradeNo: next.outTradeNo || previous.outTradeNo,
    paymentType: next.paymentType || previous.paymentType,
    ...paymentUrl === void 0 ? {} : { paymentUrl },
    ...qrCode === void 0 ? {} : { qrCode },
    ...createdAt === void 0 ? {} : { createdAt }
  };
}
function paymentLabel(value, t) {
  return value === "wechat" ? t("account.wechat") : t("account.alipay");
}
function statusLabel(status, t) {
  const key = { PENDING: "pending", PAID: "paid", RECHARGING: "paid", COMPLETED: "completed", FAILED: "failed", CANCELLED: "cancelled", EXPIRED: "expired", REFUNDED: "refunded" }[status.toUpperCase()] ?? "pending";
  return t(`account.status.${key}`);
}
function withSelection(raw, amount, paymentType) {
  try {
    const url = new URL(raw);
    if (!url.searchParams.has("amount")) url.searchParams.set("amount", amount);
    if (!url.searchParams.has("payment_type")) url.searchParams.set("payment_type", paymentType);
    return url.toString();
  } catch {
    return raw;
  }
}
function formatBalance(account) {
  return account.balance === void 0 ? "--" : `${account.balance.toFixed(2)} ${account.currency ?? "CNY"}`;
}
function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleString();
}
function usagePageUrl(baseUrl) {
  const platform = gatewayPlatformUrl(baseUrl);
  return platform === void 0 ? void 0 : `${platform}/usage`;
}
var modelPricingUrl = "https://hkcode.aicodeme.xyz/model-plaza?embedded=1";
function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}
function message(reason) {
  const raw = reason instanceof Error ? reason.message : String(reason);
  return raw.replace(/^zerowall\.[\w.]+ failed:\s*(?:internal:\s*)?/i, "").trim();
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function accountError(error, t) {
  if (/credential IPC is unavailable/i.test(error)) return t("account.desktopRequired");
  if (/invalid or expired verification code|INVALID_VERIFY_CODE/i.test(error)) return t("account.codeInvalid");
  if (/too many.*attempt|VERIFY_CODE_MAX_ATTEMPTS/i.test(error)) return t("account.codeAttempts");
  if (/too frequent|too many requests|HTTP 429|rate.limit/i.test(error)) return t("account.tooFrequent");
  if (/email.*(?:already|exists)|EMAIL_EXISTS/i.test(error)) return t("account.emailExists");
  if (/invalid.*credentials|incorrect.*password|HTTP 401/i.test(error)) return t("account.loginInvalid");
  if (/ACCOUNT_INVALID_EMAIL|email.*required/i.test(error)) return t("account.invalidEmail");
  if (/password reset is not|PASSWORD_RESET_DISABLED/i.test(error)) return t("account.resetUnavailable");
  if (/native registration is not available/i.test(error)) return t("account.registrationUnavailable");
  if (/fetch failed|failed to fetch|network|timeout|timed out|unreachable/i.test(error)) return t("account.networkError");
  return error.replace(/^.*?gateway\/internal:\s*/i, "").replace(/^zerowall\.account\.[^:]+ failed:\s*[^:]+:\s*/i, "");
}

// src/account/client/ManagedProviderCard.tsx
var import_react8 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function ManagedProviderCard({ getAccount, t }) {
  const [account, setAccount] = (0, import_react8.useState)();
  const [error, setError] = (0, import_react8.useState)();
  (0, import_react8.useEffect)(() => {
    let active = true;
    const refresh = () => {
      void getAccount().then((value) => {
        if (active) {
          setAccount(value);
          setError(void 0);
        }
      }, () => {
        if (active) setError("\u8D26\u6237\u72B6\u6001\u6682\u4E0D\u53EF\u7528");
      });
    };
    refresh();
    const timer = setInterval(refresh, 15e3);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [getAccount]);
  const connection = accountConnection(account, error !== void 0);
  const platformUrl = gatewayPlatformUrl(account?.gatewayBaseUrl);
  const signedIn = account?.status === "signedIn";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: AiCloudAccountButton_default.managedProvider, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: AiCloudAccountButton_default.providerMeta, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: AiCloudAccountButton_default.connectionBadge, "data-connection": connection, role: "status", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { "aria-hidden": "true" }),
        t(`account.connection.${connection}`)
      ] }),
      signedIn && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("account.modelCount", { count: account.models.length }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: AiCloudAccountButton_default.providerIdentity, children: signedIn ? account.email : t("account.providerDescription") }),
    platformUrl && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: AiCloudAccountButton_default.providerGateway, children: new URL(platformUrl).hostname }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: AiCloudAccountButton_default.providerActions, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { className: AiCloudAccountButton_default.secondary, type: "button", onClick: () => accountSurface.open(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Settings2, { size: 16, "aria-hidden": "true" }),
        t(signedIn ? "account.manage" : "account.providerLogin")
      ] }),
      platformUrl && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { className: AiCloudAccountButton_default.externalButton, type: "button", onClick: () => openPlatform(platformUrl), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExternalLink, { size: 16, "aria-hidden": "true" }),
        t("account.openPlatform")
      ] })
    ] })
  ] });
}

// src/base-client-helpers.ts
var NS = "zerowall";
function unwrapRemoteResult(operation, result) {
  if (!result.ok) throw new Error(`${operation} failed: ${result.error.code}: ${result.error.message}`);
  return result.value;
}

// src/account/client/index.ts
var inject = ["slots", "locale", "remote", "connection", "remote.zerowallAccount", "remote.session"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(MODEL_NS, { zh, en }), "account: model dictionaries");
  const t = ctx.locale.bind(NS);
  const modelText = ctx.locale.bind(MODEL_NS);
  const catalog = new GroupCatalogStore();
  ctx.effect(() => () => catalog.dispose());
  let identityRevision = 0;
  const accountRemote = ctx.get("remote.zerowallAccount");
  const requireAccountRemote = () => {
    if (accountRemote === void 0) throw new Error("AI \u4E91\u8D26\u6237\u670D\u52A1\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
    return accountRemote;
  };
  const sessionRemote = ctx.get("remote.session");
  const accountResult = async (operation, changesIdentity = false) => {
    if (changesIdentity) ++identityRevision;
    const revision = identityRevision;
    const result = unwrapRemoteResult("zerowall.account", await operation());
    if (revision === identityRevision) catalog.update(result);
    return result;
  };
  const refreshGroups = () => {
    if (accountRemote?.discoverModels === void 0) return;
    void accountResult(() => accountRemote.discoverModels()).catch(() => void 0);
  };
  refreshGroups();
  ctx.on("connection/reset", () => {
    ++identityRevision;
    catalog.clear();
    refreshGroups();
  });
  ctx.inject(["modelDirectories", "sessions"], (scope) => {
    const models = scope.modelDirectories;
    const sessions = scope.sessions;
    scope.slots.inject("conversation.input.model", () => scope.slots.register({
      name: "conversation.input.model",
      priority: -20,
      locale: MODEL_NS,
      inject: (sessionId) => {
        const directory = models.directoryFor(sessionId);
        const available = sessions.subagentAddress(sessionId) === void 0;
        return {
          catalog,
          available,
          directory: directory.store,
          load: () => {
            if (available) void directory.load().catch(() => {
            });
          },
          select: (selection) => available ? directory.select(selection) : Promise.resolve(void 0)
        };
      }
    }, GroupedModelSelect));
  });
  ctx.slots.inject("settings.models.provider-card", () => ctx.slots.register({ name: "settings.models.provider-card", key: "zerowall-ai-cloud", locale: NS, inject: () => ({ getAccount: () => accountResult(() => requireAccountRemote().current()) }) }, ManagedProviderCard));
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "zerowall-ai-cloud",
    order: -20,
    locale: NS,
    inject: () => ({
      getAccount: () => accountResult(() => requireAccountRemote().current()),
      catalog,
      modelText,
      forgetLogin: async () => {
        unwrapRemoteResult("zerowall.account.forgetLogin", await requireAccountRemote().forgetLogin());
      },
      savedLogin: async () => unwrapRemoteResult("zerowall.account.savedLogin", await requireAccountRemote().savedLogin()),
      relogin: () => accountResult(() => requireAccountRemote().relogin(), true),
      getPublicConfig: async (gatewayBaseUrl) => unwrapRemoteResult("zerowall.account.publicConfig", await requireAccountRemote().publicConfig(gatewayBaseUrl)),
      gateways: async () => unwrapRemoteResult("zerowall.account.gateways", await requireAccountRemote().gateways()),
      selectGateway: (baseUrl) => accountResult(() => requireAccountRemote().selectGateway(baseUrl), true),
      login: (email, password, rememberPassword) => accountResult(() => requireAccountRemote().login({ email, password, rememberPassword }), true),
      register: (email, password, verificationCode, rememberPassword, gatewayBaseUrl) => accountResult(() => requireAccountRemote().register({ email, password, verificationCode, rememberPassword, ...gatewayBaseUrl === void 0 ? {} : { gatewayBaseUrl } }), true),
      sendCode: async (email, gatewayBaseUrl) => unwrapRemoteResult("zerowall.account.sendCode", await requireAccountRemote().sendCode({ email, ...gatewayBaseUrl === void 0 ? {} : { gatewayBaseUrl } })),
      forgotPassword: async (email, gatewayBaseUrl) => {
        unwrapRemoteResult("zerowall.account.forgotPassword", await requireAccountRemote().forgotPassword({ email, ...gatewayBaseUrl === void 0 ? {} : { gatewayBaseUrl } }));
      },
      logout: async () => {
        ++identityRevision;
        catalog.clear();
        unwrapRemoteResult("zerowall.account.logout", await requireAccountRemote().logout());
      },
      discoverModels: () => accountResult(() => requireAccountRemote().discoverModels()),
      refreshModelCatalog: async () => {
        if (sessionRemote?.modelCatalog === void 0) return;
        unwrapRemoteResult("zerowall.account.modelCatalog", await sessionRemote.modelCatalog());
      },
      checkoutInfo: async () => unwrapRemoteResult("zerowall.account.checkoutInfo", await requireAccountRemote().checkoutInfo()),
      listOrders: async () => unwrapRemoteResult("zerowall.account.listOrders", await requireAccountRemote().listOrders()),
      createOrder: async (amount, paymentType) => unwrapRemoteResult("zerowall.account.createOrder", await requireAccountRemote().createOrder({ amount, paymentType })),
      getOrder: async (orderId) => unwrapRemoteResult("zerowall.account.getOrder", await requireAccountRemote().getOrder({ orderId })),
      verifyOrder: async (outTradeNo) => unwrapRemoteResult("zerowall.account.verifyOrder", await requireAccountRemote().verifyOrder({ outTradeNo }))
    })
  }, AiCloudAccountButton));
  ctx.slots.inject("settings.section", () => ctx.slots.register({ name: "settings.section", id: "zerowall-account", order: 20, locale: NS, label: () => t("account.settingsNav") }, AccountSection));
}
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-left.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/circle-help.js:
lucide-react/dist/esm/icons/cloud.js:
lucide-react/dist/esm/icons/cpu.js:
lucide-react/dist/esm/icons/credit-card.js:
lucide-react/dist/esm/icons/external-link.js:
lucide-react/dist/esm/icons/eye-off.js:
lucide-react/dist/esm/icons/eye.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/log-out.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/settings-2.js:
lucide-react/dist/esm/icons/shield-check.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/

const plugin = module.exports; return { ...plugin, apply(ctx, config) { const style = document.createElement('style'); style.dataset.zerowallPlugin = "@zerowall/dsh-plugin-ai-cloud"; style.textContent = "/* src/account/client/GroupedModelSelect.module.css */\n.GroupedModelSelect_root {\n  position: relative;\n  min-width: 0;\n}\n.GroupedModelSelect_trigger {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-width: 0;\n  max-width: min(380px, 48cqw);\n  height: 28px;\n  padding: 0 6px;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #626770);\n  font: inherit;\n  font-size: 13px;\n  font-weight: 400;\n  cursor: pointer;\n}\n.GroupedModelSelect_trigger:hover,\n.GroupedModelSelect_row:hover:not(:disabled),\n.GroupedModelSelect_row:focus-visible,\n.GroupedModelSelect_infoButton:hover {\n  background: var(--dsw-alias-interactive-bg-hover, #8882);\n}\n.GroupedModelSelect_triggerName {\n  display: var(--dsh-composer-model-text-display, block);\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.GroupedModelSelect_triggerMeta {\n  display: var(--dsh-composer-model-text-display, block);\n  flex: 0 0 auto;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-caption, #858a92);\n}\n.GroupedModelSelect_triggerIcon {\n  display: var(--dsh-composer-model-icon-display, none);\n  flex-shrink: 0;\n}\n.GroupedModelSelect_trigger > svg {\n  flex-shrink: 0;\n}\n.GroupedModelSelect_menu,\n.GroupedModelSelect_infoPanel {\n  position: fixed;\n  z-index: 1200;\n  box-sizing: border-box;\n  width: min(390px, calc(100vw - 24px));\n  max-height: calc(100dvh - 24px);\n  padding: 6px;\n  overflow: auto;\n  border: 1px solid var(--dsw-alias-border-l2, #8883);\n  border-radius: 14px;\n  color: var(--dsw-alias-label-primary, #252830);\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-shadow: 0 8px 28px #0002;\n  font: 400 13px/1.5 sans-serif;\n}\n.GroupedModelSelect_row {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  min-width: 0;\n  min-height: 40px;\n  padding: 8px 10px;\n  border: 0;\n  border-radius: 8px;\n  color: inherit;\n  background: transparent;\n  text-align: left;\n  font: inherit;\n  cursor: pointer;\n}\n.GroupedModelSelect_row:disabled,\n.GroupedModelSelect_trigger:disabled {\n  opacity: .55;\n  cursor: default;\n}\n.GroupedModelSelect_row[aria-checked=true] {\n  background: var(--dsw-alias-interactive-bg-hover, #8882);\n}\n.GroupedModelSelect_row > svg {\n  flex-shrink: 0;\n}\n.GroupedModelSelect_check {\n  display: inline-flex;\n  flex: 0 0 15px;\n  width: 15px;\n}\n.GroupedModelSelect_value {\n  flex: 1;\n  min-width: 0;\n  text-align: right;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-secondary, #626770);\n}\n.GroupedModelSelect_rootRow,\n.GroupedModelSelect_groupRow {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.GroupedModelSelect_rootRow > .GroupedModelSelect_row,\n.GroupedModelSelect_groupRow > .GroupedModelSelect_row {\n  flex: 1;\n  width: 0;\n}\n.GroupedModelSelect_infoButton {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: 0 0 auto;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #626770);\n  cursor: pointer;\n  vertical-align: middle;\n}\n.GroupedModelSelect_rate {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  align-self: center;\n  padding: 1px 7px;\n  border-radius: 6px;\n  color: var(--dsw-alias-link, #315b7d);\n  background: color-mix(in srgb, var(--dsw-alias-link, #315b7d) 9%, transparent);\n  font-size: 11px;\n  font-weight: 500;\n  line-height: 20px;\n  white-space: nowrap;\n}\n.GroupedModelSelect_paneHeader,\n.GroupedModelSelect_infoPanel header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 3px 4px 6px;\n}\n.GroupedModelSelect_paneHeader strong {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 500;\n}\n.GroupedModelSelect_search {\n  box-sizing: border-box;\n  width: 100%;\n  margin: 3px 0 5px;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-border-l2, #8883);\n  border-radius: 8px;\n  color: inherit;\n  background: var(--dsw-alias-bg-layer-2, #8881);\n  font: inherit;\n}\n.GroupedModelSelect_effortControl {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n  padding: 10px;\n  color: var(--dsw-alias-label-secondary, #626770);\n  font-size: 12px;\n}\n.GroupedModelSelect_effortControl input {\n  width: 100%;\n  accent-color: #16856b;\n}\n.GroupedModelSelect_effortControl output {\n  min-width: 52px;\n  text-align: right;\n  color: var(--dsw-alias-label-primary, #202428);\n  font-weight: 600;\n}\n.GroupedModelSelect_choices {\n  max-height: min(350px, calc(100dvh - 155px));\n  overflow: auto;\n  overscroll-behavior: contain;\n}\n.GroupedModelSelect_section {\n  padding: 8px 10px 3px;\n  color: var(--dsw-alias-label-caption, #858a92);\n  font-size: 11px;\n}\n.GroupedModelSelect_groupName,\n.GroupedModelSelect_modelName {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.GroupedModelSelect_groupName small {\n  padding-left: 7px;\n  color: var(--dsw-alias-label-caption, #858a92);\n  font-size: 11px;\n}\n.GroupedModelSelect_infoPanel {\n  z-index: 1210;\n  width: min(360px, calc(100vw - 24px));\n  padding: 12px 14px;\n  overflow: auto;\n}\n.GroupedModelSelect_infoPanel header strong {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n.GroupedModelSelect_infoPanel p {\n  margin: 8px 0;\n}\n.GroupedModelSelect_description {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.GroupedModelSelect_help {\n  padding: 5px 10px;\n  margin: 3px 0;\n  color: var(--dsw-alias-label-secondary, #626770);\n  font-size: 12px;\n}\n.GroupedModelSelect_infoPanel .GroupedModelSelect_help {\n  padding: 0;\n}\n.GroupedModelSelect_error {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 8px;\n  color: var(--dsw-alias-state-error-primary, #b63838);\n  overflow-wrap: anywhere;\n}\n.GroupedModelSelect_error button {\n  border: 0;\n  background: transparent;\n  color: inherit;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.GroupedModelSelect_loading {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 10px;\n  color: var(--dsw-alias-label-secondary, #626770);\n  font-size: 12px;\n}\n.GroupedModelSelect_spin {\n  animation: GroupedModelSelect_zws-model-spin .8s linear infinite;\n}\n@keyframes GroupedModelSelect_zws-model-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n:is(.GroupedModelSelect_trigger, .GroupedModelSelect_row, .GroupedModelSelect_infoButton, .GroupedModelSelect_search):focus-visible {\n  outline: 2px solid var(--dsw-alias-link, #315b7d);\n  outline-offset: -2px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .GroupedModelSelect_spin {\n    animation: none;\n  }\n}\n\n/* src/account/client/AiCloudAccountButton.module.css */\n.AiCloudAccountButton_trigger {\n  width: 100%;\n  min-width: 32px;\n  height: 36px;\n  padding: 0 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 8px;\n  border: 0;\n  border-radius: 8px;\n  color: var(--dsw-alias-label-primary, #202428);\n  background: transparent;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n.AiCloudAccountButton_triggerIcon {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n}\n.AiCloudAccountButton_statusDot {\n  position: absolute;\n  right: -3px;\n  bottom: -2px;\n  width: 7px;\n  height: 7px;\n  border: 2px solid var(--dsw-alias-bg-layer-1, #fff);\n  border-radius: 50%;\n  background: #c43c3c;\n}\n.AiCloudAccountButton_trigger[data-connection=online] .AiCloudAccountButton_statusDot {\n  background: #27845a;\n}\n.AiCloudAccountButton_trigger[data-connection=loading] .AiCloudAccountButton_statusDot,\n.AiCloudAccountButton_trigger[data-connection=expired] .AiCloudAccountButton_statusDot,\n.AiCloudAccountButton_trigger[data-connection=unavailable] .AiCloudAccountButton_statusDot {\n  background: #c1851c;\n}\n.AiCloudAccountButton_trigger:hover,\n.AiCloudAccountButton_trigger:focus-visible,\n.AiCloudAccountButton_iconButton:hover {\n  color: var(--dsw-alias-label-primary, #202428);\n  background: var(--dsw-alias-interactive-bg-hover, rgba(24,32,40,.08));\n}\n.AiCloudAccountButton_trigger:focus-visible {\n  outline: 2px solid var(--dsw-focus-ring-color, #315b7d);\n  outline-offset: -2px;\n}\n.AiCloudAccountButton_backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1020;\n  display: grid;\n  place-items: center;\n  padding: 20px;\n  background: rgba(14, 18, 22, .42);\n}\n.AiCloudAccountButton_panel {\n  box-sizing: border-box;\n  width: min(840px, 100%);\n  max-height: min(820px, calc(100vh - 40px));\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 16px;\n  color: var(--dsw-alias-label-primary, #202428);\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-shadow: 0 24px 70px rgba(8, 14, 20, .24);\n}\n.AiCloudAccountButton_header {\n  min-height: 64px;\n  padding: 18px 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid var(--dsw-alias-border-l2, #e3e6e8);\n}\n.AiCloudAccountButton_headerIdentity {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n.AiCloudAccountButton_brandIcon {\n  width: 38px;\n  height: 38px;\n  display: grid;\n  place-items: center;\n  border-radius: 12px;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #315b7d,\n      #6d8db0);\n  box-shadow: 0 7px 18px rgba(49, 91, 125, .2);\n}\n.AiCloudAccountButton_headerActions {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.AiCloudAccountButton_panel[data-auth=true] {\n  width: min(520px, 100%);\n}\n.AiCloudAccountButton_panel[data-auth=true] .AiCloudAccountButton_auth {\n  width: 100%;\n  padding-top: 20px;\n  gap: 12px;\n}\n.AiCloudAccountButton_panel[data-auth=true] .AiCloudAccountButton_gateway {\n  margin-bottom: 0;\n}\n.AiCloudAccountButton_header p {\n  margin: 0;\n  color: var(--dsw-alias-link, #315b7d);\n  font-size: 12px;\n  font-weight: 650;\n}\n.AiCloudAccountButton_header h2 {\n  margin: 2px 0 0;\n  font-size: 20px;\n  letter-spacing: 0;\n}\n.AiCloudAccountButton_iconButton {\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border: 0;\n  border-radius: 12px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n}\n.AiCloudAccountButton_iconButton:disabled {\n  opacity: .4;\n}\n.AiCloudAccountButton_error,\n.AiCloudAccountButton_notice,\n.AiCloudAccountButton_warning,\n.AiCloudAccountButton_success {\n  margin: 0;\n  padding: 10px 18px;\n  font-size: 12px;\n  overflow-wrap: anywhere;\n}\n.AiCloudAccountButton_error {\n  color: #a12b2b;\n  background: rgba(188, 54, 54, .08);\n}\n.AiCloudAccountButton_success {\n  color: #21734e;\n  background: rgba(39, 132, 90, .10);\n}\n.AiCloudAccountButton_notice,\n.AiCloudAccountButton_warning {\n  color: #735313;\n  background: #fff7dc;\n}\n.AiCloudAccountButton_auth {\n  box-sizing: border-box;\n  width: min(430px, 100%);\n  margin: 0 auto;\n  padding: 28px 24px 32px;\n  overflow: auto;\n  min-height: 0;\n  display: grid;\n  gap: 14px;\n}\n.AiCloudAccountButton_auth label,\n.AiCloudAccountButton_rechargeCard label {\n  display: grid;\n  gap: 5px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 12px;\n}\n.AiCloudAccountButton_authLead,\n.AiCloudAccountButton_savedHint {\n  margin: 0;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 12px;\n  line-height: 1.6;\n}\n.AiCloudAccountButton_capabilities {\n  display: grid;\n  gap: 6px;\n  padding-bottom: 14px;\n  border-bottom: 1px solid var(--dsw-alias-border-l2, #e3e6e8);\n}\n.AiCloudAccountButton_capabilities strong {\n  font-size: 13px;\n  line-height: 1.5;\n}\n.AiCloudAccountButton_capabilities span {\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n  line-height: 1.5;\n}\n.AiCloudAccountButton_savedHint {\n  padding-left: 18px;\n  position: relative;\n}\n.AiCloudAccountButton_savedHint::before {\n  content: \"\";\n  position: absolute;\n  left: 3px;\n  top: 7px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #27845a;\n}\n.AiCloudAccountButton_auth input,\n.AiCloudAccountButton_rechargeCard input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 38px;\n  padding: 0 10px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: inherit;\n  background: var(--dsw-alias-bg-layer-1);\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.AiCloudAccountButton_passwordField {\n  display: grid;\n  gap: 5px;\n}\n.AiCloudAccountButton_passwordField > label {\n  display: block;\n}\n.AiCloudAccountButton_passwordField > div {\n  position: relative;\n}\n.AiCloudAccountButton_passwordField input {\n  padding-right: 42px;\n}\n.AiCloudAccountButton_passwordField .AiCloudAccountButton_iconButton {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 34px;\n  height: 34px;\n}\n.AiCloudAccountButton_remember {\n  display: flex !important;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 8px !important;\n  cursor: pointer;\n}\n.AiCloudAccountButton_remember input {\n  width: 15px;\n  height: 15px;\n  margin: 0;\n  accent-color: var(--dsw-alias-link, #315b7d);\n}\n.AiCloudAccountButton_gateway {\n  display: grid;\n  gap: 5px;\n  margin-bottom: 14px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 12px;\n}\n.AiCloudAccountButton_gateway select {\n  width: 100%;\n  height: 38px;\n  padding: 0 10px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: inherit;\n  background: var(--dsw-alias-bg-layer-1);\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.4;\n}\n.AiCloudAccountButton_segmented {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2px;\n  padding: 3px;\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-2, #f0f2f3);\n}\n.AiCloudAccountButton_segmented button {\n  height: 32px;\n  border: 0;\n  border-radius: 5px;\n  background: transparent;\n  cursor: pointer;\n}\n.AiCloudAccountButton_segmented button[aria-pressed=true] {\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .12);\n}\n.AiCloudAccountButton_codeGroup {\n  display: grid;\n  gap: 6px;\n}\n.AiCloudAccountButton_codeGroup > label {\n  display: block;\n}\n.AiCloudAccountButton_codeRow {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 8px;\n}\n.AiCloudAccountButton_codeRow button {\n  min-width: 132px;\n  min-height: 38px;\n  padding: 0 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: inherit;\n  background: var(--dsw-alias-bg-layer-1);\n  cursor: pointer;\n  font: inherit;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.AiCloudAccountButton_codeRow button:disabled {\n  cursor: default;\n  opacity: .55;\n}\n.AiCloudAccountButton_codeNotice {\n  margin: 0;\n  color: #21734e;\n  font-size: 11px;\n  line-height: 1.45;\n}\n.AiCloudAccountButton_textButton {\n  justify-self: start;\n  padding: 0;\n  border: 0;\n  color: var(--dsw-alias-link, #315b7d);\n  background: transparent;\n  cursor: pointer;\n  font: inherit;\n  font-size: 12px;\n}\n.AiCloudAccountButton_textButton:disabled {\n  cursor: default;\n  opacity: .5;\n}\n.AiCloudAccountButton_primary {\n  min-height: 38px;\n  padding: 0 13px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  border: 0;\n  border-radius: 9px;\n  color: #fff;\n  background: var(--dsw-alias-brand-primary, #315b7d);\n  cursor: pointer;\n  font-weight: 650;\n}\n.AiCloudAccountButton_primary:disabled {\n  cursor: default;\n  opacity: .45;\n}\n.AiCloudAccountButton_authActions {\n  display: grid;\n  grid-template-columns: minmax(100px, .7fr) minmax(160px, 1.3fr);\n  gap: 10px;\n}\n.AiCloudAccountButton_authActions > :only-child {\n  grid-column: 1 / -1;\n}\n.AiCloudAccountButton_auth input:focus-visible,\n.AiCloudAccountButton_auth select:focus-visible,\n.AiCloudAccountButton_auth button:focus-visible {\n  outline: 2px solid var(--dsw-alias-link, #315b7d);\n  outline-offset: 2px;\n}\n.AiCloudAccountButton_codeNotice,\n.AiCloudAccountButton_authLead {\n  overflow-wrap: anywhere;\n}\n.AiCloudAccountButton_secondary {\n  min-height: 38px;\n  padding: 0 13px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n  font-weight: 600;\n}\n.AiCloudAccountButton_content {\n  min-height: 0;\n  min-width: 0;\n  container-type: inline-size;\n  container-name: AiCloudAccountButton_account;\n  overflow: auto;\n  padding: 22px;\n  background: var(--dsw-alias-bg-layer-2);\n}\n.AiCloudAccountButton_accountCard {\n  padding: 14px 16px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px 20px;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-2, #f7f8f9);\n}\n.AiCloudAccountButton_accountCard > div {\n  display: grid;\n  min-width: 0;\n  gap: 3px;\n}\n.AiCloudAccountButton_accountCard > .AiCloudAccountButton_identity {\n  flex: 1 1 200px;\n}\n.AiCloudAccountButton_identity small {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  color: #27845a;\n}\n.AiCloudAccountButton_externalActions {\n  margin-left: auto;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.AiCloudAccountButton_accountCard > .AiCloudAccountButton_externalActions {\n  display: flex;\n  flex: 1 1 100%;\n  margin-left: 0;\n  justify-content: flex-start;\n}\n.AiCloudAccountButton_modelList {\n  margin-top: 12px;\n  padding: 12px;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 12px;\n  min-width: 0;\n}\n.AiCloudAccountButton_modelList summary {\n  cursor: pointer;\n  color: var(--dsw-alias-link, #315b7d);\n  font-size: 13px;\n  font-weight: 650;\n}\n.AiCloudAccountButton_modelSearch {\n  min-height: 38px;\n  margin: 12px 0;\n  padding: 0 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: var(--dsw-alias-label-tertiary, #8a9299);\n  background: var(--dsw-alias-bg-layer-1);\n}\n.AiCloudAccountButton_modelSearch input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 34px;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  color: inherit;\n  background: transparent;\n}\n.AiCloudAccountButton_modelGroups {\n  display: grid;\n  gap: 8px;\n  margin-top: 12px;\n}\n.AiCloudAccountButton_modelGroup {\n  border: 1px solid var(--dsw-alias-border-l2, #e1e5e8);\n  border-radius: 10px;\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 2%, var(--dsw-alias-bg-layer-1));\n}\n.AiCloudAccountButton_modelGroup summary {\n  min-height: 38px;\n  padding: 0 11px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  color: var(--dsw-alias-label-primary, #202428);\n}\n.AiCloudAccountButton_modelGroup summary small {\n  min-width: 22px;\n  padding: 2px 7px;\n  border-radius: 999px;\n  color: var(--dsw-alias-link, #315b7d);\n  background: rgba(49, 91, 125, .09);\n  text-align: center;\n}\n.AiCloudAccountButton_modelGroup .AiCloudAccountButton_modelRows {\n  padding: 0 11px 4px;\n}\n.AiCloudAccountButton_modelRows {\n  max-height: 280px;\n  overflow: auto;\n}\n.AiCloudAccountButton_modelRows > div {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 5px 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  font-size: 12px;\n  overflow-wrap: anywhere;\n}\n.AiCloudAccountButton_modelRows small {\n  grid-column: 1 / -1;\n  color: var(--dsw-alias-label-secondary, #687078);\n}\n.AiCloudAccountButton_catalogNotice,\n.AiCloudAccountButton_catalogEmpty {\n  margin: 10px 2px 0;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n  line-height: 1.5;\n}\n.AiCloudAccountButton_catalogNotice {\n  padding: 9px 11px;\n  border-radius: 9px;\n  background: rgba(193, 133, 28, .1);\n  color: #735313;\n}\n@media (max-width: 600px) {\n  .AiCloudAccountButton_modelSync {\n    flex-wrap: wrap;\n  }\n  .AiCloudAccountButton_balance {\n    min-width: 0;\n  }\n  .AiCloudAccountButton_externalActions {\n    justify-content: flex-start;\n  }\n}\n.AiCloudAccountButton_externalButton {\n  min-height: 34px;\n  padding: 0 11px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid rgba(49, 91, 125, .35);\n  border-radius: 9px;\n  color: var(--dsw-alias-link, #315b7d);\n  background: rgba(49, 91, 125, .05);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n}\n.AiCloudAccountButton_externalButton:hover {\n  background: rgba(49, 91, 125, .12);\n}\n.AiCloudAccountButton_connectionBadge {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  color: var(--dsw-alias-label-secondary, #687078);\n}\n.AiCloudAccountButton_connectionBadge i {\n  width: 7px;\n  height: 7px;\n  display: inline-block;\n  border-radius: 50%;\n  background: #c43c3c;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=online] {\n  color: #21734e;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=online] i {\n  background: #27845a;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=loading] {\n  color: #85610f;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=loading] i {\n  background: #c1851c;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=expired],\n.AiCloudAccountButton_connectionBadge[data-connection=unavailable] {\n  color: #85610f;\n}\n.AiCloudAccountButton_connectionBadge[data-connection=expired] i,\n.AiCloudAccountButton_connectionBadge[data-connection=unavailable] i {\n  background: #c1851c;\n}\n.AiCloudAccountButton_managedProvider {\n  margin-top: 10px;\n  padding: 13px 14px;\n  display: grid;\n  gap: 7px;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 3%, var(--dsw-alias-bg-layer-1));\n}\n.AiCloudAccountButton_providerMeta,\n.AiCloudAccountButton_providerActions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n.AiCloudAccountButton_providerMeta {\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n}\n.AiCloudAccountButton_providerIdentity {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 650;\n  overflow-wrap: anywhere;\n}\n.AiCloudAccountButton_providerGateway {\n  color: var(--dsw-alias-label-tertiary, #8a9299);\n  font-size: 11px;\n}\n.AiCloudAccountButton_providerActions .AiCloudAccountButton_secondary,\n.AiCloudAccountButton_providerActions .AiCloudAccountButton_externalButton {\n  min-height: 34px;\n}\n.AiCloudAccountButton_accountCard span,\n.AiCloudAccountButton_accountCard small,\n.AiCloudAccountButton_sectionHeading p,\n.AiCloudAccountButton_ordersHeader p,\n.AiCloudAccountButton_orderRow small {\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n}\n.AiCloudAccountButton_accountCard strong {\n  overflow-wrap: anywhere;\n  font-size: 14px;\n}\n.AiCloudAccountButton_modelSync {\n  margin-top: 12px;\n  padding: 12px 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-2, #f7f8f9);\n}\n.AiCloudAccountButton_modelSync h3 {\n  margin: 0;\n  font-size: 13px;\n}\n.AiCloudAccountButton_modelSync p {\n  margin: 3px 0 0;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n}\n.AiCloudAccountButton_spin {\n  animation: AiCloudAccountButton_zerowall-spin .8s linear infinite;\n}\n.AiCloudAccountButton_syncButton {\n  min-height: 32px;\n  padding: 0 11px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  align-self: flex-start;\n  flex: 0 0 auto;\n  gap: 7px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-1);\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 1.4;\n  cursor: pointer;\n}\n.AiCloudAccountButton_syncButton:hover:not(:disabled) {\n  color: var(--dsw-alias-link, #315b7d);\n  background: var(--dsw-alias-interactive-bg-hover, #8882);\n}\n.AiCloudAccountButton_syncButton:disabled {\n  opacity: .6;\n  cursor: default;\n}\n.AiCloudAccountButton_groupHeading {\n  flex: 1;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n@keyframes AiCloudAccountButton_zerowall-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.AiCloudAccountButton_balance {\n  min-width: 140px;\n  text-align: right;\n}\n.AiCloudAccountButton_balance strong {\n  font-size: 20px;\n  letter-spacing: 0;\n}\n.AiCloudAccountButton_logoutButton {\n  min-height: 34px;\n  padding: 0 10px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  background: transparent;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 500;\n}\n.AiCloudAccountButton_logoutButton:hover {\n  color: #9b3030;\n  border-color: rgba(155, 48, 48, .35);\n  background: rgba(155, 48, 48, .06);\n}\n.AiCloudAccountButton_billingGrid {\n  margin-top: 14px;\n  display: grid;\n  grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);\n  gap: 14px;\n}\n.AiCloudAccountButton_rechargeCard,\n.AiCloudAccountButton_paymentCard {\n  min-height: 300px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 12px;\n}\n.AiCloudAccountButton_sectionHeading {\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.AiCloudAccountButton_sectionHeading h3,\n.AiCloudAccountButton_ordersHeader h3,\n.AiCloudAccountButton_paymentEmpty h3 {\n  margin: 0;\n  font-size: 14px;\n  letter-spacing: 0;\n}\n.AiCloudAccountButton_sectionHeading p,\n.AiCloudAccountButton_ordersHeader p {\n  margin: 3px 0 0;\n}\n.AiCloudAccountButton_amountChoices {\n  margin: 16px 0 12px;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 7px;\n}\n.AiCloudAccountButton_amountChoices button,\n.AiCloudAccountButton_paymentChoices button {\n  height: 34px;\n  border: 1px solid var(--dsw-alias-border-l2, #cfd5d9);\n  border-radius: 9px;\n  color: inherit;\n  background: transparent;\n  cursor: pointer;\n}\n.AiCloudAccountButton_amountChoices button[data-active=true],\n.AiCloudAccountButton_paymentChoices button[data-active=true] {\n  border-color: var(--dsw-alias-link, #315b7d);\n  color: var(--dsw-alias-link, #315b7d);\n  background: rgba(49, 91, 125, .08);\n  font-weight: 650;\n}\n.AiCloudAccountButton_rechargeCard label small {\n  color: var(--dsw-alias-label-tertiary, #8a9299);\n}\n.AiCloudAccountButton_paymentChoices {\n  margin: 13px 0;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.AiCloudAccountButton_rechargeCard > .AiCloudAccountButton_primary {\n  margin-top: auto;\n  width: 100%;\n}\n.AiCloudAccountButton_securityNote {\n  margin: 10px 0 0;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 6px;\n  color: var(--dsw-alias-label-tertiary, #8a9299);\n  font-size: 10px;\n  line-height: 1.45;\n}\n.AiCloudAccountButton_paymentEmpty {\n  min-height: 260px;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  text-align: center;\n  color: var(--dsw-alias-label-secondary, #687078);\n}\n.AiCloudAccountButton_paymentEmpty h3 {\n  margin-top: 10px;\n  color: var(--dsw-alias-label-primary, #202428);\n}\n.AiCloudAccountButton_paymentEmpty p {\n  max-width: 280px;\n  margin: 5px 0 0;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.AiCloudAccountButton_orderAmount {\n  margin: 20px 0 12px;\n  display: grid;\n  gap: 3px;\n  text-align: center;\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: 0;\n}\n.AiCloudAccountButton_orderAmount small {\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 11px;\n  font-weight: 500;\n}\n.AiCloudAccountButton_qrFrame {\n  width: 220px;\n  max-width: 100%;\n  margin: 0 auto 12px;\n  padding: 8px;\n  display: grid;\n  justify-items: center;\n  gap: 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #dfe3e6);\n  border-radius: 12px;\n  background: #fff;\n}\n.AiCloudAccountButton_qrFrame img {\n  display: block;\n  width: 100%;\n  aspect-ratio: 1;\n}\n.AiCloudAccountButton_qrFrame span {\n  color: #4f5962;\n  font-size: 11px;\n}\n.AiCloudAccountButton_payLink {\n  height: 38px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  border-radius: 9px;\n  color: #fff;\n  background: var(--dsw-alias-brand-primary, #315b7d);\n  text-decoration: none;\n  font-size: 12px;\n  font-weight: 650;\n}\n.AiCloudAccountButton_polling {\n  margin-top: auto;\n  padding-top: 14px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  text-align: center;\n  font-size: 11px;\n}\n.AiCloudAccountButton_status {\n  padding: 4px 7px;\n  border-radius: 5px;\n  color: #85570f;\n  background: rgba(196, 133, 28, .10);\n  font-size: 10px;\n  white-space: nowrap;\n}\n.AiCloudAccountButton_status[data-status=completed] {\n  color: #21734e;\n  background: rgba(39, 132, 90, .10);\n}\n.AiCloudAccountButton_status[data-status=failed],\n.AiCloudAccountButton_status[data-status=cancelled],\n.AiCloudAccountButton_status[data-status=expired] {\n  color: #9b3030;\n  background: rgba(188, 54, 54, .09);\n}\n.AiCloudAccountButton_ordersHeader {\n  margin-top: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.AiCloudAccountButton_orders {\n  margin-top: 8px;\n  border-top: 1px solid var(--dsw-alias-border-l2, #e3e6e8);\n}\n.AiCloudAccountButton_orderRow {\n  min-height: 54px;\n  padding: 8px 2px;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto auto;\n  align-items: center;\n  gap: 12px;\n  border-bottom: 1px solid var(--dsw-alias-border-l2, #e3e6e8);\n  font-size: 12px;\n}\n.AiCloudAccountButton_orderRow > div {\n  min-width: 0;\n  display: grid;\n  gap: 3px;\n}\n.AiCloudAccountButton_orderRow strong {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.AiCloudAccountButton_orderRow button {\n  border: 0;\n  color: var(--dsw-alias-link, #315b7d);\n  background: transparent;\n  cursor: pointer;\n  font-size: 11px;\n}\n.AiCloudAccountButton_emptyOrders {\n  padding: 24px 0;\n  color: var(--dsw-alias-label-secondary, #687078);\n  text-align: center;\n  font-size: 12px;\n}\n@media (max-width: 720px) {\n  .AiCloudAccountButton_backdrop {\n    padding: 8px;\n  }\n  .AiCloudAccountButton_accountCard,\n  .AiCloudAccountButton_billingGrid {\n    grid-template-columns: 1fr;\n  }\n  .AiCloudAccountButton_modelSync {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .AiCloudAccountButton_modelSync .AiCloudAccountButton_secondary {\n    width: 100%;\n  }\n  .AiCloudAccountButton_balance {\n    text-align: left;\n  }\n  .AiCloudAccountButton_orderRow {\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n  .AiCloudAccountButton_orderRow .AiCloudAccountButton_status,\n  .AiCloudAccountButton_orderRow button {\n    justify-self: start;\n  }\n  .AiCloudAccountButton_authActions {\n    grid-template-columns: 1fr;\n  }\n  .AiCloudAccountButton_codeRow {\n    grid-template-columns: 1fr;\n  }\n  .AiCloudAccountButton_codeRow button {\n    width: 100%;\n  }\n}\n.AiCloudAccountButton_embedded {\n  padding: 20px;\n  min-width: 0;\n}\n.AiCloudAccountButton_embedded .AiCloudAccountButton_panel {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 960px;\n  max-height: none;\n  box-shadow: none;\n  margin: 0 auto;\n  overflow: visible;\n}\n.AiCloudAccountButton_embedded .AiCloudAccountButton_content {\n  overflow: visible;\n  max-height: none;\n}\n.AiCloudAccountButton_balancePrompt {\n  width: min(380px, calc(100vw - 32px));\n  position: relative;\n  padding: 28px;\n  border: 0;\n  border-radius: 18px;\n  color: var(--dsw-alias-label-primary, #202428);\n  background: var(--dsw-alias-bg-layer-1, #fff);\n  box-shadow: var(--dsw-elevation-prominent, 0 24px 70px rgba(8,14,20,.24));\n  text-align: center;\n}\n.AiCloudAccountButton_balancePrompt::backdrop {\n  background: rgba(14, 18, 22, .42);\n  backdrop-filter: blur(6px);\n}\n.AiCloudAccountButton_balancePromptIcon {\n  width: 48px;\n  height: 48px;\n  display: grid;\n  place-items: center;\n  margin: 0 auto 12px;\n  border-radius: 15px;\n  color: var(--dsw-alias-link, #315b7d);\n  background: var(--dsw-alias-bg-layer-2, #f1f5f8);\n}\n.AiCloudAccountButton_balancePrompt h3 {\n  margin: 0;\n  font-size: 18px;\n}\n.AiCloudAccountButton_balancePrompt p {\n  margin: 9px 0 20px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  font-size: 13px;\n  line-height: 1.6;\n}\n.AiCloudAccountButton_balancePrompt .AiCloudAccountButton_authActions {\n  grid-template-columns: 1fr 1fr;\n}\n.AiCloudAccountButton_promptClose {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border: 0;\n  border-radius: 9px;\n  color: var(--dsw-alias-label-secondary, #687078);\n  background: transparent;\n  cursor: pointer;\n}\n.AiCloudAccountButton_promptClose:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(24,32,40,.08));\n}\n.AiCloudAccountButton_panel:has(.AiCloudAccountButton_auth) {\n  width: min(500px, 100%);\n}\n.AiCloudAccountButton_rechargeCard,\n.AiCloudAccountButton_paymentCard,\n.AiCloudAccountButton_accountCard,\n.AiCloudAccountButton_modelSync {\n  background: var(--dsw-alias-bg-layer-1);\n}\n.AiCloudAccountButton_embedded {\n  padding: 0;\n}\n.AiCloudAccountButton_embedded .AiCloudAccountButton_panel {\n  border: 0;\n}\n.AiCloudAccountButton_panel :is(button, input, select):focus-visible,\n.AiCloudAccountButton_balancePrompt button:focus-visible {\n  outline: 2px solid var(--dsw-alias-link);\n  outline-offset: 2px;\n}\n.AiCloudAccountButton_segmented button {\n  color: inherit;\n  font: inherit;\n  font-size: 13px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .AiCloudAccountButton_spin {\n    animation: none;\n  }\n}\n.AiCloudAccountButton_segmented,\n.AiCloudAccountButton_accountCard,\n.AiCloudAccountButton_modelSync {\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, var(--dsw-alias-bg-layer-1));\n}\n@container AiCloudAccountButton_account (max-width: 760px) {\n  .AiCloudAccountButton_accountCard {\n    grid-template-columns: minmax(0, 1fr) auto;\n    gap: 12px;\n  }\n  .AiCloudAccountButton_externalActions {\n    margin-left: 0;\n    justify-content: flex-start;\n  }\n  .AiCloudAccountButton_accountCard > .AiCloudAccountButton_externalActions {\n    grid-column: 1 / -1;\n  }\n  .AiCloudAccountButton_billingGrid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .AiCloudAccountButton_balance {\n    min-width: 0;\n  }\n}\n@container AiCloudAccountButton_account (max-width: 460px) {\n  .AiCloudAccountButton_accountCard {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .AiCloudAccountButton_balance {\n    text-align: left;\n  }\n  .AiCloudAccountButton_modelSync {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .AiCloudAccountButton_orderRow {\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n}\n"; document.head.append(style); ctx.effect(() => () => { document.querySelectorAll('style[data-zerowall-plugin="@zerowall/dsh-plugin-ai-cloud"]').forEach(n => n.remove()) }); return plugin.apply(ctx, config); } }; } });
