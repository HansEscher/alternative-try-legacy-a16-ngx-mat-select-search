"use strict";
/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgxMatSelectSearchModule = exports.MatSelectNoEntriesFoundDirective = exports.MatSelectSearchClearDirective = exports.MatSelectSearchVersion = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const mat_select_search_component_1 = require("./mat-select-search.component");
const legacy_button_1 = require("@angular/material/legacy-button");
const legacy_checkbox_1 = require("@angular/material/legacy-checkbox");
const legacy_progress_spinner_1 = require("@angular/material/legacy-progress-spinner");
const legacy_tooltip_1 = require("@angular/material/legacy-tooltip");
const legacy_select_1 = require("@angular/material/legacy-select");
const common_1 = require("@angular/common");
const icon_1 = require("@angular/material/icon");
const mat_select_search_clear_directive_1 = require("./mat-select-search-clear.directive");
Object.defineProperty(exports, "MatSelectSearchClearDirective", { enumerable: true, get: function () { return mat_select_search_clear_directive_1.MatSelectSearchClearDirective; } });
const forms_1 = require("@angular/forms");
const mat_select_no_entries_found_directive_1 = require("./mat-select-no-entries-found.directive");
Object.defineProperty(exports, "MatSelectNoEntriesFoundDirective", { enumerable: true, get: function () { return mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective; } });
const divider_1 = require("@angular/material/divider");
exports.MatSelectSearchVersion = '6.0.5';
let NgxMatSelectSearchModule = class NgxMatSelectSearchModule {
};
NgxMatSelectSearchModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            legacy_button_1.MatLegacyButtonModule,
            legacy_checkbox_1.MatLegacyCheckboxModule,
            icon_1.MatIconModule,
            legacy_progress_spinner_1.MatLegacyProgressSpinnerModule,
            legacy_tooltip_1.MatLegacyTooltipModule,
            legacy_select_1.MatLegacySelectModule,
            divider_1.MatDividerModule,
        ],
        declarations: [
            mat_select_search_component_1.MatSelectSearchComponent,
            mat_select_search_clear_directive_1.MatSelectSearchClearDirective,
            mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective
        ],
        exports: [
            mat_select_search_component_1.MatSelectSearchComponent,
            mat_select_search_clear_directive_1.MatSelectSearchClearDirective,
            mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective
        ]
    })
], NgxMatSelectSearchModule);
exports.NgxMatSelectSearchModule = NgxMatSelectSearchModule;
//# sourceMappingURL=ngx-mat-select-search.module.js.map