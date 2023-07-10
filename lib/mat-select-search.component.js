"use strict";
var MatSelectSearchComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatSelectSearchComponent = void 0;
const tslib_1 = require("tslib");
/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const keycodes_1 = require("@angular/cdk/keycodes");
const scrolling_1 = require("@angular/cdk/scrolling");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const legacy_core_1 = require("@angular/material/legacy-core");
// import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
const legacy_form_field_1 = require("@angular/material/legacy-form-field");
const legacy_select_1 = require("@angular/material/legacy-select");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const mat_select_search_clear_directive_1 = require("./mat-select-search-clear.directive");
const default_options_1 = require("./default-options");
const mat_select_no_entries_found_directive_1 = require("./mat-select-no-entries-found.directive");
let MatSelectSearchComponent = MatSelectSearchComponent_1 = class MatSelectSearchComponent {
    /** Current search value */
    get value() {
        return this._formControl.value;
    }
    /** Reference to the MatLegacySelect options */
    set _options(_options) {
        this._options$.next(_options);
    }
    get _options() {
        return this._options$.getValue();
    }
    // private hostElement: Element,
    constructor(matSelect, matOption, changeDetectorRef, _viewportRuler, matFormField = null, defaultOptions) {
        this.matSelect = matSelect;
        this.matOption = matOption;
        this.changeDetectorRef = changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this.matFormField = matFormField;
        /** Label of the search placeholder */
        this.placeholderLabel = 'Suche';
        /** Type of the search input field */
        this.type = 'text';
        /** Font-based icon used for displaying Close-Icon */
        this.closeIcon = 'close';
        /** Label to be shown when no entries are found. Set to null if no message should be shown. */
        this.noEntriesFoundLabel = 'Keine Optionen gefunden';
        /**
          * Whether or not the search field should be cleared after the dropdown menu is closed.
          * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
          */
        this.clearSearchInput = true;
        /** Whether to show the search-in-progress indicator */
        this.searching = false;
        /** Disables initial focusing of the input field */
        this.disableInitialFocus = false;
        /** Enable clear input on escape pressed */
        this.enableClearOnEscapePressed = false;
        /**
         * Prevents home / end key being propagated to mat-select,
         * allowing to move the cursor within the search input instead of navigating the options
         */
        this.preventHomeEndKeyPropagation = false;
        /** Disables scrolling to active options when option list changes. Useful for server-side search */
        this.disableScrollToActiveOnOptionsChanged = false;
        /** Adds 508 screen reader support for search box */
        this.ariaLabel = 'dropdown search';
        /** Whether to show Select All Checkbox (for mat-select[multi=true]) */
        this.showToggleAllCheckbox = false;
        /** select all checkbox checked state */
        this.toggleAllCheckboxChecked = false;
        /** select all checkbox indeterminate state */
        this.toggleAllCheckboxIndeterminate = false;
        /** Display a message in a tooltip on the toggle-all checkbox */
        this.toggleAllCheckboxTooltipMessage = '';
        /** Define the position of the tooltip on the toggle-all checkbox. */
        this.toggleAllCheckboxTooltipPosition = 'below';
        /** Show/Hide the search clear button of the search input */
        this.hideClearSearchButton = false;
        /**
         * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
         * Defaults to false, so selected options are only restored while filtering is active.
         */
        this.alwaysRestoreSelectedOptionsMulti = false;
        /** Output emitter to send to parent component with the toggle all boolean */
        this.toggleAll = new core_1.EventEmitter();
        // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
        this.onTouched = (_) => { };
        this._options$ = new rxjs_1.BehaviorSubject(null);
        this.optionsList$ = this._options$.pipe((0, operators_1.switchMap)(_options => _options ?
            _options.changes.pipe((0, operators_1.map)(options => options.toArray()), (0, operators_1.startWith)(_options.toArray())) : (0, rxjs_1.of)([])));
        this.optionsLength$ = this.optionsList$.pipe((0, operators_1.map)(options => options ? options.length : 0));
        this._formControl = new forms_1.FormControl('', { nonNullable: true });
        /** whether to show the no entries found message */
        this._showNoEntriesFound$ = (0, rxjs_1.combineLatest)([
            this._formControl.valueChanges,
            this.optionsLength$
        ]).pipe((0, operators_1.map)(([value, optionsLength]) => {
            const result = (!!this.noEntriesFoundLabel) && (!!value) && optionsLength === this.getOptionsLengthOffset();
            return result;
        }));
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.applyDefaultOptions(defaultOptions);
    }
    applyDefaultOptions(defaultOptions) {
        if (!defaultOptions) {
            return;
        }
        for (const key of default_options_1.configurableDefaultOptions) {
            // eslint-disable-next-line no-prototype-builtins
            if (defaultOptions.hasOwnProperty(key)) {
                this[key] = defaultOptions[key];
            }
        }
    }
    ngOnInit() {
        // set custom mat-option class if the component was placed inside a mat-option
        if (this.matOption) {
            this.matOption.disabled = true;
            this.matOption._getHostElement().classList.add('contains-mat-select-search');
            this.matOption._getHostElement().setAttribute('aria-hidden', 'true');
        }
        else {
            console.error('<ngx-mat-select-search> must be placed inside a <mat-option> element');
        }
        // when the select dropdown panel is opened or closed
        this.matSelect.openedChange
            .pipe((0, operators_1.delay)(1), (0, operators_1.takeUntil)(this._onDestroy))
            .subscribe((opened) => {
            if (opened) {
                this.updateInputWidth();
                // focus the search field when opening
                if (!this.disableInitialFocus) {
                    this._focus();
                }
            }
            else {
                // clear it when closing
                if (this.clearSearchInput) {
                    this._reset();
                }
            }
        });
        // set the first item active after the options changed
        this.matSelect.openedChange
            .pipe((0, operators_1.take)(1), (0, operators_1.switchMap)((_) => {
            this._options = this.matSelect.options;
            // Closure variable for tracking the most recent first option.
            // In order to avoid avoid causing the list to
            // scroll to the top when options are added to the bottom of
            // the list (eg: infinite scroll), we compare only
            // the changes to the first options to determine if we
            // should set the first item as active.
            // This prevents unnecessary scrolling to the top of the list
            // when options are appended, but allows the first item
            // in the list to be set as active by default when there
            // is no active selection
            let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
            return this._options.changes
                .pipe((0, operators_1.tap)(() => {
                // avoid "expression has been changed" error
                setTimeout(() => {
                    // Convert the QueryList to an array
                    const options = this._options?.toArray() ?? [];
                    // The true first item is offset by 1
                    const currentFirstOption = options[this.getOptionsLengthOffset()];
                    const keyManager = this.matSelect._keyManager;
                    if (keyManager && this.matSelect.panelOpen) {
                        // set first item active and input width
                        // Check to see if the first option in these changes is different from the previous.
                        const firstOptionIsChanged = !this.matSelect.compareWith(previousFirstOption, currentFirstOption);
                        // CASE: The first option is different now.
                        // Indiciates we should set it as active and scroll to the top.
                        if (firstOptionIsChanged
                            || !keyManager.activeItem
                            || !options.find(option => this.matSelect.compareWith(option, keyManager.activeItem))) {
                            keyManager.setFirstItemActive();
                        }
                        // wait for panel width changes
                        setTimeout(() => {
                            this.updateInputWidth();
                        });
                    }
                    // Update our reference
                    previousFirstOption = currentFirstOption;
                });
            }));
        }))
            .pipe((0, operators_1.takeUntil)(this._onDestroy))
            .subscribe();
        // add or remove css class depending on whether to show the no entries found message
        // note: this is hacky
        this._showNoEntriesFound$.pipe((0, operators_1.takeUntil)(this._onDestroy)).subscribe(showNoEntriesFound => {
            // set no entries found class on mat option
            if (this.matOption) {
                if (showNoEntriesFound) {
                    this.matOption._getHostElement().classList.add('mat-select-search-no-entries-found');
                }
                else {
                    this.matOption._getHostElement().classList.remove('mat-select-search-no-entries-found');
                }
            }
        });
        // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
        this._viewportRuler.change()
            .pipe((0, operators_1.takeUntil)(this._onDestroy))
            .subscribe(() => {
            if (this.matSelect.panelOpen) {
                this.updateInputWidth();
            }
        });
        this.initMultipleHandling();
        this.optionsList$.pipe((0, operators_1.takeUntil)(this._onDestroy)).subscribe(() => {
            // update view when available options change
            this.changeDetectorRef.markForCheck();
        });
    }
    _emitSelectAllBooleanToParent(state) {
        this.toggleAll.emit(state);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    _isToggleAllCheckboxVisible() {
        return (this.matSelect?.multiple) && this.showToggleAllCheckbox;
    }
    /**
     * Handles the key down event with MatLegacySelect.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event) {
        // Prevent propagation for all alphanumeric characters in order to avoid selection issues
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= keycodes_1.A && event.keyCode <= keycodes_1.Z) ||
            (event.keyCode >= keycodes_1.ZERO && event.keyCode <= keycodes_1.NINE) ||
            (event.keyCode === keycodes_1.SPACE)
            || (this.preventHomeEndKeyPropagation && (event.keyCode === keycodes_1.HOME || event.keyCode === keycodes_1.END))) {
            event.stopPropagation();
        }
        if ((this.matSelect?.multiple) && event.key && event.keyCode === keycodes_1.ENTER) {
            // Regain focus after multiselect, so we can further type
            setTimeout(() => this._focus());
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.keyCode === keycodes_1.ESCAPE && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    }
    /**
     * Handles the key up event with MatLegacySelect.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event) {
        if (event.keyCode === keycodes_1.UP_ARROW || event.keyCode === keycodes_1.DOWN_ARROW) {
            const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
            const optionArray = this._options?.toArray() ?? [];
            const index = optionArray.findIndex(item => item && item['id'] && item['id'] === ariaActiveDescendantId);
            if (index !== -1) {
                this.unselectActiveDescendant();
                this.activeDescendant = optionArray[index]._getHostElement();
                this.activeDescendant.setAttribute('aria-selected', 'true');
                this.searchSelectInput.nativeElement.setAttribute('aria-activedescendant', ariaActiveDescendantId);
            }
        }
    }
    writeValue(value) {
        this._lastExternalInputValue = value;
        this._formControl.setValue(value);
        this.changeDetectorRef.markForCheck();
    }
    onBlur() {
        this.unselectActiveDescendant();
        this.onTouched();
    }
    registerOnChange(fn) {
        this._formControl.valueChanges.pipe((0, operators_1.filter)(value => value !== this._lastExternalInputValue), (0, operators_1.tap)(() => this._lastExternalInputValue = undefined), (0, operators_1.takeUntil)(this._onDestroy)).subscribe(fn);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Focuses the search input field
     */
    _focus() {
        if (!this.searchSelectInput || !this.matSelect.panel) {
            return;
        }
        // save and restore scrollTop of panel, since it will be reset by focus()
        // note: this is hacky
        const panel = this.matSelect.panel.nativeElement;
        const scrollTop = panel.scrollTop;
        // focus
        this.searchSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    }
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus) {
        this._formControl.setValue('');
        if (focus) {
            this._focus();
        }
    }
    /**
     * Initializes handling <mat-select [multiple]="true">
     * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
     */
    initMultipleHandling() {
        if (this.matSelect.ngControl === null) {
            if (this.matSelect?.multiple) {
                // note: the access to MatLegacySelect.ngControl (instead of MatLegacySelect.value / MatLegacySelect.valueChanges)
                // is necessary to properly work in multi-selection mode.
                console.error('the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true');
            }
            return;
        }
        const valueChanges = this.matSelect.ngControl.valueChanges;
        if (valueChanges === null)
            return;
        // if <mat-select [multiple]="true">
        // store previously selected values and restore them when they are deselected
        // because the option is not available while we are currently filtering
        this.previousSelectedValues = this.matSelect.ngControl.value;
        valueChanges
            .pipe((0, operators_1.takeUntil)(this._onDestroy))
            .subscribe((values) => {
            let restoreSelectedValues = false;
            if (this.matSelect?.multiple) {
                if ((this.alwaysRestoreSelectedOptionsMulti || (this._formControl.value && this._formControl.value.length))
                    && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
                    if (!values || !Array.isArray(values)) {
                        values = [];
                    }
                    const optionValues = this.matSelect.options.map(option => option.value);
                    this.previousSelectedValues.forEach(previousValue => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (!values.some((v) => this.matSelect.compareWith(v, previousValue))
                            && !optionValues.some(v => this.matSelect.compareWith(v, previousValue))) {
                            // if a value that was selected before is deselected and not found in the options, it was deselected
                            // due to the filtering, so we restore it.
                            values.push(previousValue);
                            restoreSelectedValues = true;
                        }
                    });
                }
            }
            this.previousSelectedValues = values;
            if (restoreSelectedValues) {
                this.matSelect._onChange(values);
            }
        });
    }
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth() {
        if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
            return;
        }
        let element = this.innerSelectSearch.nativeElement;
        let panelElement;
        while ((element = element?.parentElement ?? null) !== null) {
            if (element.classList.contains('mat-select-panel')) {
                panelElement = element;
                break;
            }
        }
        if (panelElement) {
            this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
        }
    }
    /**
     * Determine the offset to length that can be caused by the optional MatLegacyOption used as a search input.
     */
    getOptionsLengthOffset() {
        if (this.matOption) {
            return 1;
        }
        else {
            return 0;
        }
    }
    unselectActiveDescendant() {
        this.activeDescendant?.removeAttribute('aria-selected');
        this.searchSelectInput.nativeElement.removeAttribute('aria-activedescendant');
    }
};
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "placeholderLabel", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "type", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "closeIcon", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], MatSelectSearchComponent.prototype, "closeSvgIcon", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "noEntriesFoundLabel", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "clearSearchInput", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "searching", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "disableInitialFocus", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "enableClearOnEscapePressed", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "preventHomeEndKeyPropagation", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "disableScrollToActiveOnOptionsChanged", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "ariaLabel", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "showToggleAllCheckbox", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "toggleAllCheckboxChecked", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "toggleAllCheckboxIndeterminate", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "toggleAllCheckboxTooltipMessage", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], MatSelectSearchComponent.prototype, "toggleAllCheckboxTooltipPosition", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "hideClearSearchButton", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "alwaysRestoreSelectedOptionsMulti", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], MatSelectSearchComponent.prototype, "toggleAll", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('searchSelectInput', { read: core_1.ElementRef, static: true }),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], MatSelectSearchComponent.prototype, "searchSelectInput", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('innerSelectSearch', { read: core_1.ElementRef, static: true }),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], MatSelectSearchComponent.prototype, "innerSelectSearch", void 0);
tslib_1.__decorate([
    (0, core_1.ContentChild)(mat_select_search_clear_directive_1.MatSelectSearchClearDirective),
    tslib_1.__metadata("design:type", mat_select_search_clear_directive_1.MatSelectSearchClearDirective)
], MatSelectSearchComponent.prototype, "clearIcon", void 0);
tslib_1.__decorate([
    (0, core_1.ContentChild)(mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective),
    tslib_1.__metadata("design:type", mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective)
], MatSelectSearchComponent.prototype, "noEntriesFound", void 0);
MatSelectSearchComponent = MatSelectSearchComponent_1 = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'ngx-mat-select-search',
        templateUrl: './mat-select-search.component.html',
        styleUrls: ['./mat-select-search.component.scss'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: (0, core_1.forwardRef)(() => MatSelectSearchComponent_1),
                multi: true
            }
        ],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    tslib_1.__param(0, (0, core_1.Inject)(legacy_select_1.MatLegacySelect)),
    tslib_1.__param(1, (0, core_1.Optional)()),
    tslib_1.__param(1, (0, core_1.SkipSelf)()),
    tslib_1.__param(1, (0, core_1.Host)()),
    tslib_1.__param(4, (0, core_1.Optional)()),
    tslib_1.__param(4, (0, core_1.Inject)(legacy_form_field_1.MatLegacyFormField)),
    tslib_1.__param(5, (0, core_1.Optional)()),
    tslib_1.__param(5, (0, core_1.Inject)(default_options_1.MAT_SELECTSEARCH_DEFAULT_OPTIONS)),
    tslib_1.__metadata("design:paramtypes", [legacy_select_1.MatLegacySelect,
        legacy_core_1.MatLegacyOption,
        core_1.ChangeDetectorRef,
        scrolling_1.ViewportRuler, Object, Object])
], MatSelectSearchComponent);
exports.MatSelectSearchComponent = MatSelectSearchComponent;
//# sourceMappingURL=mat-select-search.component.js.map