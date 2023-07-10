"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatSelectNoEntriesFoundDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
/**
 * Directive for providing a custom no entries found element.
 * e.g.
 * <ngx-mat-select-search [formControl]="bankFilterCtrl">
 *   <span ngxMatSelectNoEntriesFound>
 *     No entries found <button>Add</button>
 *   </span>
 * </ngx-mat-select-search>
 */
let MatSelectNoEntriesFoundDirective = class MatSelectNoEntriesFoundDirective {
};
MatSelectNoEntriesFoundDirective = tslib_1.__decorate([
    (0, core_1.Directive)({
        selector: '[ngxMatSelectNoEntriesFound]'
    })
], MatSelectNoEntriesFoundDirective);
exports.MatSelectNoEntriesFoundDirective = MatSelectNoEntriesFoundDirective;
//# sourceMappingURL=mat-select-no-entries-found.directive.js.map