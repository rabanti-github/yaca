"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("./Types");
var List_1 = require("../src/List");
var Utils = (function () {
    function Utils() {
        this.Types = Types_1.Types;
    }
    Utils.compareNumbers = function (n1, n2) {
        if (n1 < n2) {
            return -1;
        }
        else if (n1 === n2) {
            return 0;
        }
        else {
            return 1;
        }
    };
    Utils.compareDates = function (d1, d2) {
        var n1 = d1.getTime();
        var n2 = d2.getTime();
        return Utils.compareNumbers(n1, n2);
    };
    Utils.compareBooleans = function (b1, b2) {
        if (b1 !== b2) {
            return -1;
        }
        else {
            return 1;
        }
    };
    Utils.setupList = function (t, initialValue) {
        if (initialValue === undefined) {
            if (t === Types_1.Types.boolean) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.date) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.number) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.string) {
                return new List_1.default();
            }
        }
        else {
            if (t === Types_1.Types.boolean) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.date) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.number) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.string) {
                return new List_1.default(initialValue);
            }
        }
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map