"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAT_SELECTSEARCH_DEFAULT_OPTIONS = exports.configurableDefaultOptions = void 0;
const core_1 = require("@angular/core");
/** List of inputs of NgxMatSelectSearchComponent that can be configured with a global default. */
exports.configurableDefaultOptions = [
    'ariaLabel',
    'clearSearchInput',
    'closeIcon',
    'closeSvgIcon',
    'disableInitialFocus',
    'disableScrollToActiveOnOptionsChanged',
    'enableClearOnEscapePressed',
    'hideClearSearchButton',
    'noEntriesFoundLabel',
    'placeholderLabel',
    'preventHomeEndKeyPropagation',
    'searching',
];
/**
 * InjectionToken that can be used to specify global options. e.g.
 *
 * ```typescript
 * providers: [
 *   {
 *     provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
 *     useValue: <MatSelectSearchOptions>{
 *       closeIcon: 'delete',
 *       noEntriesFoundLabel: 'No options found'
 *     }
 *   }
 * ]
 * ```
 *
 * See the corresponding inputs of `MatSelectSearchComponent` for documentation.
 */
exports.MAT_SELECTSEARCH_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-selectsearch-default-options');
//# sourceMappingURL=default-options.js.map