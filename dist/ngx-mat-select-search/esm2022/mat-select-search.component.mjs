"use strict";
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
const i0 = tslib_1.__importStar(require("@angular/core"));
const i1 = tslib_1.__importStar(require("@angular/material/legacy-core"));
const i2 = tslib_1.__importStar(require("@angular/cdk/scrolling"));
const i3 = tslib_1.__importStar(require("@angular/common"));
const i4 = tslib_1.__importStar(require("@angular/forms"));
const i5 = tslib_1.__importStar(require("@angular/material/legacy-button"));
const i6 = tslib_1.__importStar(require("@angular/material/legacy-checkbox"));
const i7 = tslib_1.__importStar(require("@angular/material/icon"));
const i8 = tslib_1.__importStar(require("@angular/material/legacy-progress-spinner"));
const i9 = tslib_1.__importStar(require("@angular/material/legacy-tooltip"));
const i10 = tslib_1.__importStar(require("@angular/material/divider"));
const i11 = tslib_1.__importStar(require("@angular/material/legacy-select"));
const i12 = tslib_1.__importStar(require("@angular/material/legacy-form-field"));
class MatSelectSearchComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: MatSelectSearchComponent, deps: [{ token: legacy_select_1.MatLegacySelect }, { token: i1.MatLegacyOption, host: true, optional: true, skipSelf: true }, { token: i0.ChangeDetectorRef }, { token: i2.ViewportRuler }, { token: legacy_form_field_1.MatLegacyFormField, optional: true }, { token: default_options_1.MAT_SELECTSEARCH_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.4", type: MatSelectSearchComponent, selector: "ngx-mat-select-search", inputs: { placeholderLabel: "placeholderLabel", type: "type", closeIcon: "closeIcon", closeSvgIcon: "closeSvgIcon", noEntriesFoundLabel: "noEntriesFoundLabel", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toggleAllCheckboxTooltipPosition: "toggleAllCheckboxTooltipPosition", hideClearSearchButton: "hideClearSearchButton", alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti" }, outputs: { toggleAll: "toggleAll" }, providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: (0, core_1.forwardRef)(() => MatSelectSearchComponent),
                multi: true
            }
        ], queries: [{ propertyName: "clearIcon", first: true, predicate: mat_select_search_clear_directive_1.MatSelectSearchClearDirective, descendants: true }, { propertyName: "noEntriesFound", first: true, predicate: mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective, descendants: true }], viewQueries: [{ propertyName: "searchSelectInput", first: true, predicate: ["searchSelectInput"], descendants: true, read: core_1.ElementRef, static: true }, { propertyName: "innerSelectSearch", first: true, predicate: ["innerSelectSearch"], descendants: true, read: core_1.ElementRef, static: true }], ngImport: i0, template: "<!--\r\nCopyright (c) 2018 Bithost GmbH All Rights Reserved.\r\n\r\nUse of this source code is governed by an MIT-style license that can be\r\nfound in the LICENSE file at https://angular.io/license\r\n-->\r\n<!-- Placeholder to adjust vertical offset of the mat-option elements -->\r\n<input matInput class=\"mat-select-search-input mat-select-search-hidden\"/>\r\n\r\n<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->\r\n<div\r\n      #innerSelectSearch\r\n      class=\"mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header\"\r\n      [ngClass]=\"{'mat-select-search-inner-multiple': matSelect.multiple, 'mat-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\r\n\r\n  <mat-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\r\n                [color]=\"matFormField?.color\"\r\n                class=\"mat-select-search-toggle-all-checkbox\"\r\n                [checked]=\"toggleAllCheckboxChecked\"\r\n                [indeterminate]=\"toggleAllCheckboxIndeterminate\"\r\n                [matTooltip]=\"toggleAllCheckboxTooltipMessage\"\r\n                matTooltipClass=\"ngx-mat-select-search-toggle-all-tooltip\"\r\n                [matTooltipPosition]=\"toggleAllCheckboxTooltipPosition\"\r\n                (change)=\"_emitSelectAllBooleanToParent($event.checked)\"\r\n  ></mat-checkbox>\r\n\r\n  <input class=\"mat-select-search-input\"\r\n         autocomplete=\"off\"\r\n         [type]=\"type\"\r\n         [formControl]=\"_formControl\"\r\n         #searchSelectInput\r\n         (keydown)=\"_handleKeydown($event)\"\r\n         (keyup)=\"_handleKeyup($event)\"\r\n         (blur)=\"onBlur()\"\r\n         [placeholder]=\"placeholderLabel\"\r\n         [attr.aria-label]=\"ariaLabel\"\r\n  />\r\n  <mat-spinner *ngIf=\"searching\"\r\n          class=\"mat-select-search-spinner\"\r\n          diameter=\"16\"></mat-spinner>\r\n\r\n  <button *ngIf=\"!hideClearSearchButton && value && !searching\"\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          (click)=\"_reset(true)\"\r\n          class=\"mat-select-search-clear\">\r\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[ngxMatSelectSearchClear]\"></ng-content>\r\n    <ng-template #defaultIcon>\r\n      <mat-icon [svgIcon]=\"closeSvgIcon ?? ''\">\r\n        {{!closeSvgIcon ? closeIcon : null}}\r\n      </mat-icon>\r\n    </ng-template>\r\n  </button>\r\n\r\n  <ng-content select=\".mat-select-search-custom-header-content\"></ng-content>\r\n\r\n  <mat-divider></mat-divider>\r\n</div>\r\n\r\n<div *ngIf=\"_showNoEntriesFound$ | async\"\r\n     class=\"mat-select-search-no-entries-found\">\r\n  <ng-content *ngIf=\"noEntriesFound; else defaultNoEntriesFound\"\r\n              select=\"[ngxMatSelectNoEntriesFound]\"></ng-content>\r\n  <ng-template #defaultNoEntriesFound>{{noEntriesFoundLabel}}</ng-template>\r\n</div>\r\n", styles: [".mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all{display:flex;align-items:center}.mat-select-search-input{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background:none;padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}:host-context([dir=rtl]) .mat-select-search-input{padding-right:16px;padding-left:44px}.mat-select-search-inner-toggle-all .mat-select-search-input{padding-left:5px}.mat-select-search-no-entries-found{padding-top:8px}.mat-select-search-clear{position:absolute;right:4px;top:0}:host-context([dir=rtl]) .mat-select-search-clear{right:auto;left:4px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .mat-select-search-spinner{right:auto;left:16px}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox{padding-left:5px}:host-context([dir=rtl]) .mat-select-search-toggle-all-checkbox{padding-left:0;padding-right:5px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5.MatLegacyButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatLegacyCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8.MatLegacyProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }, { kind: "directive", type: i9.MatLegacyTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "component", type: i10.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
exports.MatSelectSearchComponent = MatSelectSearchComponent;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: MatSelectSearchComponent, decorators: [{
            type: core_1.Component,
            args: [{ selector: 'ngx-mat-select-search', providers: [
                        {
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: (0, core_1.forwardRef)(() => MatSelectSearchComponent),
                            multi: true
                        }
                    ], changeDetection: core_1.ChangeDetectionStrategy.OnPush, template: "<!--\r\nCopyright (c) 2018 Bithost GmbH All Rights Reserved.\r\n\r\nUse of this source code is governed by an MIT-style license that can be\r\nfound in the LICENSE file at https://angular.io/license\r\n-->\r\n<!-- Placeholder to adjust vertical offset of the mat-option elements -->\r\n<input matInput class=\"mat-select-search-input mat-select-search-hidden\"/>\r\n\r\n<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->\r\n<div\r\n      #innerSelectSearch\r\n      class=\"mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header\"\r\n      [ngClass]=\"{'mat-select-search-inner-multiple': matSelect.multiple, 'mat-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\r\n\r\n  <mat-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\r\n                [color]=\"matFormField?.color\"\r\n                class=\"mat-select-search-toggle-all-checkbox\"\r\n                [checked]=\"toggleAllCheckboxChecked\"\r\n                [indeterminate]=\"toggleAllCheckboxIndeterminate\"\r\n                [matTooltip]=\"toggleAllCheckboxTooltipMessage\"\r\n                matTooltipClass=\"ngx-mat-select-search-toggle-all-tooltip\"\r\n                [matTooltipPosition]=\"toggleAllCheckboxTooltipPosition\"\r\n                (change)=\"_emitSelectAllBooleanToParent($event.checked)\"\r\n  ></mat-checkbox>\r\n\r\n  <input class=\"mat-select-search-input\"\r\n         autocomplete=\"off\"\r\n         [type]=\"type\"\r\n         [formControl]=\"_formControl\"\r\n         #searchSelectInput\r\n         (keydown)=\"_handleKeydown($event)\"\r\n         (keyup)=\"_handleKeyup($event)\"\r\n         (blur)=\"onBlur()\"\r\n         [placeholder]=\"placeholderLabel\"\r\n         [attr.aria-label]=\"ariaLabel\"\r\n  />\r\n  <mat-spinner *ngIf=\"searching\"\r\n          class=\"mat-select-search-spinner\"\r\n          diameter=\"16\"></mat-spinner>\r\n\r\n  <button *ngIf=\"!hideClearSearchButton && value && !searching\"\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          (click)=\"_reset(true)\"\r\n          class=\"mat-select-search-clear\">\r\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[ngxMatSelectSearchClear]\"></ng-content>\r\n    <ng-template #defaultIcon>\r\n      <mat-icon [svgIcon]=\"closeSvgIcon ?? ''\">\r\n        {{!closeSvgIcon ? closeIcon : null}}\r\n      </mat-icon>\r\n    </ng-template>\r\n  </button>\r\n\r\n  <ng-content select=\".mat-select-search-custom-header-content\"></ng-content>\r\n\r\n  <mat-divider></mat-divider>\r\n</div>\r\n\r\n<div *ngIf=\"_showNoEntriesFound$ | async\"\r\n     class=\"mat-select-search-no-entries-found\">\r\n  <ng-content *ngIf=\"noEntriesFound; else defaultNoEntriesFound\"\r\n              select=\"[ngxMatSelectNoEntriesFound]\"></ng-content>\r\n  <ng-template #defaultNoEntriesFound>{{noEntriesFoundLabel}}</ng-template>\r\n</div>\r\n", styles: [".mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all{display:flex;align-items:center}.mat-select-search-input{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background:none;padding:0 44px 0 16px;height:calc(3em - 1px);line-height:calc(3em - 1px)}:host-context([dir=rtl]) .mat-select-search-input{padding-right:16px;padding-left:44px}.mat-select-search-inner-toggle-all .mat-select-search-input{padding-left:5px}.mat-select-search-no-entries-found{padding-top:8px}.mat-select-search-clear{position:absolute;right:4px;top:0}:host-context([dir=rtl]) .mat-select-search-clear{right:auto;left:4px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .mat-select-search-spinner{right:auto;left:16px}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox{padding-left:5px}:host-context([dir=rtl]) .mat-select-search-toggle-all-checkbox{padding-left:0;padding-right:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: i11.MatLegacySelect, decorators: [{
                    type: core_1.Inject,
                    args: [legacy_select_1.MatLegacySelect]
                }] }, { type: i1.MatLegacyOption, decorators: [{
                    type: core_1.Optional
                }, {
                    type: core_1.SkipSelf
                }, {
                    type: core_1.Host
                }] }, { type: i0.ChangeDetectorRef }, { type: i2.ViewportRuler }, { type: i12.MatLegacyFormField, decorators: [{
                    type: core_1.Optional
                }, {
                    type: core_1.Inject,
                    args: [legacy_form_field_1.MatLegacyFormField]
                }] }, { type: undefined, decorators: [{
                    type: core_1.Optional
                }, {
                    type: core_1.Inject,
                    args: [default_options_1.MAT_SELECTSEARCH_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { placeholderLabel: [{
                type: core_1.Input
            }], type: [{
                type: core_1.Input
            }], closeIcon: [{
                type: core_1.Input
            }], closeSvgIcon: [{
                type: core_1.Input
            }], noEntriesFoundLabel: [{
                type: core_1.Input
            }], clearSearchInput: [{
                type: core_1.Input
            }], searching: [{
                type: core_1.Input
            }], disableInitialFocus: [{
                type: core_1.Input
            }], enableClearOnEscapePressed: [{
                type: core_1.Input
            }], preventHomeEndKeyPropagation: [{
                type: core_1.Input
            }], disableScrollToActiveOnOptionsChanged: [{
                type: core_1.Input
            }], ariaLabel: [{
                type: core_1.Input
            }], showToggleAllCheckbox: [{
                type: core_1.Input
            }], toggleAllCheckboxChecked: [{
                type: core_1.Input
            }], toggleAllCheckboxIndeterminate: [{
                type: core_1.Input
            }], toggleAllCheckboxTooltipMessage: [{
                type: core_1.Input
            }], toggleAllCheckboxTooltipPosition: [{
                type: core_1.Input
            }], hideClearSearchButton: [{
                type: core_1.Input
            }], alwaysRestoreSelectedOptionsMulti: [{
                type: core_1.Input
            }], toggleAll: [{
                type: core_1.Output
            }], searchSelectInput: [{
                type: core_1.ViewChild,
                args: ['searchSelectInput', { read: core_1.ElementRef, static: true }]
            }], innerSelectSearch: [{
                type: core_1.ViewChild,
                args: ['innerSelectSearch', { read: core_1.ElementRef, static: true }]
            }], clearIcon: [{
                type: core_1.ContentChild,
                args: [mat_select_search_clear_directive_1.MatSelectSearchClearDirective]
            }], noEntriesFound: [{
                type: core_1.ContentChild,
                args: [mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uL3NyYy9tYXQtc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7O0dBS0c7QUFDSCxvREFBZ0g7QUFDaEgsc0RBQXVEO0FBQ3ZELHdDQWtCdUI7QUFDdkIsMENBQXNGO0FBQ3RGLCtEQUFnRTtBQUdoRSx3R0FBd0c7QUFDeEcsMkVBQXlGO0FBQ3pGLG1FQUFtRTtBQUVuRSwrQkFBK0U7QUFDL0UsOENBQWdHO0FBQ2hHLDJGQUFvRjtBQUNwRix1REFBeUg7QUFDekgsbUdBQTJGOzs7Ozs7Ozs7Ozs7OztBQUUzRixNQWFhLHdCQUF3QjtJQW1GbkMsMkJBQTJCO0lBQzNCLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQU1ELCtDQUErQztJQUMvQyxJQUFXLFFBQVEsQ0FBQyxRQUEyQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBcUNELGdDQUFnQztJQUVoQyxZQUNrQyxTQUEwQixFQUNsQixTQUEwQixFQUMzRCxpQkFBb0MsRUFDbkMsY0FBNkIsRUFDSSxlQUFvQyxJQUFJLEVBQzNCLGNBQXVDO1FBTDdELGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzNELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbkMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDSSxpQkFBWSxHQUFaLFlBQVks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QUMsaUVBQTZCO2dCQUdLLGNBQWM7c0JBQTdELG1CQUFZO3VCQUFDLHdFQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQml0aG9zdCBHbWJIIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7IEEsIERPV05fQVJST1csIEVORCwgRU5URVIsIEVTQ0FQRSwgSE9NRSwgTklORSwgU1BBQ0UsIFVQX0FSUk9XLCBaLCBaRVJPIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBIb3N0LFxyXG4gIFNraXBTZWxmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1hdExlZ2FjeU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1jb3JlJztcclxuXHJcblxyXG4vLyBpbXBvcnQgeyBNYXRMZWdhY3lGb3JtRmllbGRNb2R1bGUgYXMgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWZvcm0tZmllbGQnO1xyXG5pbXBvcnQgeyBNYXRMZWdhY3lGb3JtRmllbGQgYXMgTWF0Rm9ybUZpZWxkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWZvcm0tZmllbGQnO1xyXG5pbXBvcnQgeyBNYXRMZWdhY3lTZWxlY3QgIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LXNlbGVjdCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNYXRTZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSB9IGZyb20gJy4vbWF0LXNlbGVjdC1zZWFyY2gtY2xlYXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgY29uZmlndXJhYmxlRGVmYXVsdE9wdGlvbnMsIE1BVF9TRUxFQ1RTRUFSQ0hfREVGQVVMVF9PUFRJT05TLCBNYXRTZWxlY3RTZWFyY2hPcHRpb25zIH0gZnJvbSAnLi9kZWZhdWx0LW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBNYXRTZWxlY3ROb0VudHJpZXNGb3VuZERpcmVjdGl2ZSB9IGZyb20gJy4vbWF0LXNlbGVjdC1uby1lbnRyaWVzLWZvdW5kLmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1tYXQtc2VsZWN0LXNlYXJjaCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYXQtc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VsZWN0U2VhcmNoQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAvKiogTGFiZWwgb2YgdGhlIHNlYXJjaCBwbGFjZWhvbGRlciAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyTGFiZWwgPSAnU3VjaGUnO1xyXG5cclxuICAvKiogVHlwZSBvZiB0aGUgc2VhcmNoIGlucHV0IGZpZWxkICovXHJcbiAgQElucHV0KCkgdHlwZSA9ICd0ZXh0JztcclxuXHJcbiAgLyoqIEZvbnQtYmFzZWQgaWNvbiB1c2VkIGZvciBkaXNwbGF5aW5nIENsb3NlLUljb24gKi9cclxuICBASW5wdXQoKSBjbG9zZUljb24gPSAnY2xvc2UnO1xyXG5cclxuICAvKiogU3ZnLWJhc2VkIGljb24gdXNlZCBmb3IgZGlzcGxheWluZyBDbG9zZS1JY29uLiBJZiBzZXQsIGNsb3NlSWNvbiBpcyBvdmVycmlkZGVuICovXHJcbiAgQElucHV0KCkgY2xvc2VTdmdJY29uPzogc3RyaW5nO1xyXG5cclxuICAvKiogTGFiZWwgdG8gYmUgc2hvd24gd2hlbiBubyBlbnRyaWVzIGFyZSBmb3VuZC4gU2V0IHRvIG51bGwgaWYgbm8gbWVzc2FnZSBzaG91bGQgYmUgc2hvd24uICovXHJcbiAgQElucHV0KCkgbm9FbnRyaWVzRm91bmRMYWJlbCA9ICdLZWluZSBPcHRpb25lbiBnZWZ1bmRlbic7XHJcblxyXG4gIC8qKlxyXG4gICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VhcmNoIGZpZWxkIHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZSBkcm9wZG93biBtZW51IGlzIGNsb3NlZC5cclxuICAgICogVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBmaWx0ZXJpbmcuIFNlZSBbIzNdKGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRob3N0LWdtYmgvbmd4LW1hdC1zZWxlY3Qtc2VhcmNoL2lzc3Vlcy8zKVxyXG4gICAgKi9cclxuICBASW5wdXQoKSBjbGVhclNlYXJjaElucHV0ID0gdHJ1ZTtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2VhcmNoLWluLXByb2dyZXNzIGluZGljYXRvciAqL1xyXG4gIEBJbnB1dCgpIHNlYXJjaGluZyA9IGZhbHNlO1xyXG5cclxuICAvKiogRGlzYWJsZXMgaW5pdGlhbCBmb2N1c2luZyBvZiB0aGUgaW5wdXQgZmllbGQgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlSW5pdGlhbEZvY3VzID0gZmFsc2U7XHJcblxyXG4gIC8qKiBFbmFibGUgY2xlYXIgaW5wdXQgb24gZXNjYXBlIHByZXNzZWQgKi9cclxuICBASW5wdXQoKSBlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQcmV2ZW50cyBob21lIC8gZW5kIGtleSBiZWluZyBwcm9wYWdhdGVkIHRvIG1hdC1zZWxlY3QsXHJcbiAgICogYWxsb3dpbmcgdG8gbW92ZSB0aGUgY3Vyc29yIHdpdGhpbiB0aGUgc2VhcmNoIGlucHV0IGluc3RlYWQgb2YgbmF2aWdhdGluZyB0aGUgb3B0aW9uc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHByZXZlbnRIb21lRW5kS2V5UHJvcGFnYXRpb24gPSBmYWxzZTtcclxuXHJcbiAgLyoqIERpc2FibGVzIHNjcm9sbGluZyB0byBhY3RpdmUgb3B0aW9ucyB3aGVuIG9wdGlvbiBsaXN0IGNoYW5nZXMuIFVzZWZ1bCBmb3Igc2VydmVyLXNpZGUgc2VhcmNoICovXHJcbiAgQElucHV0KCkgZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAvKiogQWRkcyA1MDggc2NyZWVuIHJlYWRlciBzdXBwb3J0IGZvciBzZWFyY2ggYm94ICovXHJcbiAgQElucHV0KCkgYXJpYUxhYmVsID0gJ2Ryb3Bkb3duIHNlYXJjaCc7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgU2VsZWN0IEFsbCBDaGVja2JveCAoZm9yIG1hdC1zZWxlY3RbbXVsdGk9dHJ1ZV0pICovXHJcbiAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbENoZWNrYm94ID0gZmFsc2U7XHJcblxyXG4gIC8qKiBzZWxlY3QgYWxsIGNoZWNrYm94IGNoZWNrZWQgc3RhdGUgKi9cclxuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveENoZWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqIHNlbGVjdCBhbGwgY2hlY2tib3ggaW5kZXRlcm1pbmF0ZSBzdGF0ZSAqL1xyXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG5cclxuICAvKiogRGlzcGxheSBhIG1lc3NhZ2UgaW4gYSB0b29sdGlwIG9uIHRoZSB0b2dnbGUtYWxsIGNoZWNrYm94ICovXHJcbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hUb29sdGlwTWVzc2FnZSA9ICcnO1xyXG5cclxuICAvKiogRGVmaW5lIHRoZSBwb3NpdGlvbiBvZiB0aGUgdG9vbHRpcCBvbiB0aGUgdG9nZ2xlLWFsbCBjaGVja2JveC4gKi9cclxuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveFRvb2x0aXBQb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdhYm92ZScgfCAnYmVsb3cnIHwgJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2JlbG93JztcclxuXHJcbiAgLyoqIFNob3cvSGlkZSB0aGUgc2VhcmNoIGNsZWFyIGJ1dHRvbiBvZiB0aGUgc2VhcmNoIGlucHV0ICovXHJcbiAgQElucHV0KCkgaGlkZUNsZWFyU2VhcmNoQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsd2F5cyByZXN0b3JlIHNlbGVjdGVkIG9wdGlvbnMgb24gc2VsZWN0aW9uQ2hhbmdlIGZvciBtb2RlIG11bHRpIChlLmcuIGZvciBsYXp5IGxvYWRpbmcvaW5maW5pdHkgc2Nyb2xsaW5nKS5cclxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSwgc28gc2VsZWN0ZWQgb3B0aW9ucyBhcmUgb25seSByZXN0b3JlZCB3aGlsZSBmaWx0ZXJpbmcgaXMgYWN0aXZlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFsd2F5c1Jlc3RvcmVTZWxlY3RlZE9wdGlvbnNNdWx0aSA9IGZhbHNlO1xyXG5cclxuICAvKiogT3V0cHV0IGVtaXR0ZXIgdG8gc2VuZCB0byBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHRvZ2dsZSBhbGwgYm9vbGVhbiAqL1xyXG4gIEBPdXRwdXQoKSB0b2dnbGVBbGwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaFNlbGVjdElucHV0JywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgc2VhcmNoU2VsZWN0SW5wdXQhOiBFbGVtZW50UmVmO1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWFyY2ggaW5wdXQgZmllbGQgKi9cclxuICBAVmlld0NoaWxkKCdpbm5lclNlbGVjdFNlYXJjaCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGlubmVyU2VsZWN0U2VhcmNoITogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byBjdXN0b20gc2VhcmNoIGlucHV0IGNsZWFyIGljb24gKi9cclxuICBAQ29udGVudENoaWxkKE1hdFNlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlKSBjbGVhckljb24hOiBNYXRTZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byBjdXN0b20gbm8gZW50cmllcyBmb3VuZCBlbGVtZW50ICovXHJcbiAgQENvbnRlbnRDaGlsZChNYXRTZWxlY3ROb0VudHJpZXNGb3VuZERpcmVjdGl2ZSkgbm9FbnRyaWVzRm91bmQhOiBNYXRTZWxlY3ROb0VudHJpZXNGb3VuZERpcmVjdGl2ZTtcclxuXHJcbiAgLyoqIEN1cnJlbnQgc2VhcmNoIHZhbHVlICovXHJcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm9ybUNvbnRyb2wudmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xhc3RFeHRlcm5hbElucHV0VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG4gIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoXzogYW55KSA9PiB7IH07XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdExlZ2FjeVNlbGVjdCBvcHRpb25zICovXHJcbiAgcHVibGljIHNldCBfb3B0aW9ucyhfb3B0aW9uczogUXVlcnlMaXN0PE1hdExlZ2FjeU9wdGlvbj4gfCBudWxsKSB7XHJcbiAgICB0aGlzLl9vcHRpb25zJC5uZXh0KF9vcHRpb25zKTtcclxuICB9XHJcbiAgcHVibGljIGdldCBfb3B0aW9ucygpOiBRdWVyeUxpc3Q8TWF0TGVnYWN5T3B0aW9uPiB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMkLmdldFZhbHVlKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBfb3B0aW9ucyQ6IEJlaGF2aW9yU3ViamVjdDxRdWVyeUxpc3Q8TWF0TGVnYWN5T3B0aW9uPnxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UXVlcnlMaXN0PE1hdExlZ2FjeU9wdGlvbj58bnVsbD4obnVsbCk7XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uc0xpc3QkOiBPYnNlcnZhYmxlPE1hdExlZ2FjeU9wdGlvbltdPiA9IHRoaXMuX29wdGlvbnMkLnBpcGUoXHJcbiAgICBzd2l0Y2hNYXAoX29wdGlvbnMgPT4gX29wdGlvbnMgP1xyXG4gICAgICBfb3B0aW9ucy5jaGFuZ2VzLnBpcGUoXHJcbiAgICAgICAgbWFwKG9wdGlvbnMgPT4gb3B0aW9ucy50b0FycmF5KCkpLFxyXG4gICAgICAgIHN0YXJ0V2l0aDxNYXRMZWdhY3lPcHRpb25bXT4oX29wdGlvbnMudG9BcnJheSgpKSxcclxuICAgICAgKSA6IG9mKFtdKVxyXG4gICAgKVxyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uc0xlbmd0aCQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMub3B0aW9uc0xpc3QkLnBpcGUoXHJcbiAgICBtYXAob3B0aW9ucyA9PiBvcHRpb25zID8gb3B0aW9ucy5sZW5ndGggOiAwKVxyXG4gICk7XHJcblxyXG4gIC8qKiBQcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyB3aGVuIHVzaW5nIDxtYXQtc2VsZWN0IFttdWx0aXBsZV09XCJ0cnVlXCI+Ki9cclxuICBwcml2YXRlIHByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMhOiBhbnlbXTtcclxuXHJcbiAgcHVibGljIF9mb3JtQ29udHJvbDogRm9ybUNvbnRyb2w8c3RyaW5nPiA9IG5ldyBGb3JtQ29udHJvbDxzdHJpbmc+KCcnLCB7bm9uTnVsbGFibGU6IHRydWV9KTtcclxuXHJcbiAgLyoqIHdoZXRoZXIgdG8gc2hvdyB0aGUgbm8gZW50cmllcyBmb3VuZCBtZXNzYWdlICovXHJcbiAgcHVibGljIF9zaG93Tm9FbnRyaWVzRm91bmQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gY29tYmluZUxhdGVzdChbXHJcbiAgICB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMsXHJcbiAgICB0aGlzLm9wdGlvbnNMZW5ndGgkXHJcbiAgXSkucGlwZShcclxuICAgIG1hcCgoW3ZhbHVlLCBvcHRpb25zTGVuZ3RoXSkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQ6IGJvb2xlYW4gPSAoISF0aGlzLm5vRW50cmllc0ZvdW5kTGFiZWwpICYmICghIXZhbHVlKSAmJiBvcHRpb25zTGVuZ3RoID09PSB0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0pXHJcbiAgKTtcclxuXHJcbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xyXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gYWN0aXZlIGRlc2NlbmRhbnQgZm9yIEFSSUEgU3VwcG9ydC4gKi9cclxuICBwcml2YXRlIGFjdGl2ZURlc2NlbmRhbnQhOiBIVE1MRWxlbWVudDtcclxuICAvLyBwcml2YXRlIGhvc3RFbGVtZW50OiBFbGVtZW50LFxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoTWF0TGVnYWN5U2VsZWN0KSBwdWJsaWMgbWF0U2VsZWN0OiBNYXRMZWdhY3lTZWxlY3QsXHJcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBASG9zdCgpIHByaXZhdGUgbWF0T3B0aW9uOiBNYXRMZWdhY3lPcHRpb24sXHJcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0Rm9ybUZpZWxkKSBwdWJsaWMgbWF0Rm9ybUZpZWxkOiBNYXRGb3JtRmllbGQgfCBudWxsID0gbnVsbCxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1NFTEVDVFNFQVJDSF9ERUZBVUxUX09QVElPTlMpIGRlZmF1bHRPcHRpb25zPzogTWF0U2VsZWN0U2VhcmNoT3B0aW9uc1xyXG4gICkge1xyXG4gICAgdGhpcy5hcHBseURlZmF1bHRPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlEZWZhdWx0T3B0aW9ucyhkZWZhdWx0T3B0aW9ucz86IE1hdFNlbGVjdFNlYXJjaE9wdGlvbnMpIHtcclxuICAgIGlmICghZGVmYXVsdE9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgY29uZmlndXJhYmxlRGVmYXVsdE9wdGlvbnMpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xyXG4gICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICh0aGlzW2tleV0gYXMgYW55KSA9IGRlZmF1bHRPcHRpb25zW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gc2V0IGN1c3RvbSBtYXQtb3B0aW9uIGNsYXNzIGlmIHRoZSBjb21wb25lbnQgd2FzIHBsYWNlZCBpbnNpZGUgYSBtYXQtb3B0aW9uXHJcbiAgICBpZiAodGhpcy5tYXRPcHRpb24pIHtcclxuICAgICAgdGhpcy5tYXRPcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLm1hdE9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdjb250YWlucy1tYXQtc2VsZWN0LXNlYXJjaCcpO1xyXG4gICAgICB0aGlzLm1hdE9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJzxuZ3gtbWF0LXNlbGVjdC1zZWFyY2g+IG11c3QgYmUgcGxhY2VkIGluc2lkZSBhIDxtYXQtb3B0aW9uPiBlbGVtZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiB0aGUgc2VsZWN0IGRyb3Bkb3duIHBhbmVsIGlzIG9wZW5lZCBvciBjbG9zZWRcclxuICAgIHRoaXMubWF0U2VsZWN0Lm9wZW5lZENoYW5nZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWxheSgxKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKG9wZW5lZCkgPT4ge1xyXG4gICAgICAgIGlmIChvcGVuZWQpIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xyXG4gICAgICAgICAgLy8gZm9jdXMgdGhlIHNlYXJjaCBmaWVsZCB3aGVuIG9wZW5pbmdcclxuICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlSW5pdGlhbEZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIGNsZWFyIGl0IHdoZW4gY2xvc2luZ1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2xlYXJTZWFyY2hJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNldCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBmaXJzdCBpdGVtIGFjdGl2ZSBhZnRlciB0aGUgb3B0aW9ucyBjaGFuZ2VkXHJcbiAgICB0aGlzLm1hdFNlbGVjdC5vcGVuZWRDaGFuZ2VcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBzd2l0Y2hNYXAoKF8pID0+IHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5tYXRTZWxlY3Qub3B0aW9ucztcclxuXHJcbiAgICAgICAgLy8gQ2xvc3VyZSB2YXJpYWJsZSBmb3IgdHJhY2tpbmcgdGhlIG1vc3QgcmVjZW50IGZpcnN0IG9wdGlvbi5cclxuICAgICAgICAvLyBJbiBvcmRlciB0byBhdm9pZCBhdm9pZCBjYXVzaW5nIHRoZSBsaXN0IHRvXHJcbiAgICAgICAgLy8gc2Nyb2xsIHRvIHRoZSB0b3Agd2hlbiBvcHRpb25zIGFyZSBhZGRlZCB0byB0aGUgYm90dG9tIG9mXHJcbiAgICAgICAgLy8gdGhlIGxpc3QgKGVnOiBpbmZpbml0ZSBzY3JvbGwpLCB3ZSBjb21wYXJlIG9ubHlcclxuICAgICAgICAvLyB0aGUgY2hhbmdlcyB0byB0aGUgZmlyc3Qgb3B0aW9ucyB0byBkZXRlcm1pbmUgaWYgd2VcclxuICAgICAgICAvLyBzaG91bGQgc2V0IHRoZSBmaXJzdCBpdGVtIGFzIGFjdGl2ZS5cclxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHVubmVjZXNzYXJ5IHNjcm9sbGluZyB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XHJcbiAgICAgICAgLy8gd2hlbiBvcHRpb25zIGFyZSBhcHBlbmRlZCwgYnV0IGFsbG93cyB0aGUgZmlyc3QgaXRlbVxyXG4gICAgICAgIC8vIGluIHRoZSBsaXN0IHRvIGJlIHNldCBhcyBhY3RpdmUgYnkgZGVmYXVsdCB3aGVuIHRoZXJlXHJcbiAgICAgICAgLy8gaXMgbm8gYWN0aXZlIHNlbGVjdGlvblxyXG4gICAgICAgIGxldCBwcmV2aW91c0ZpcnN0T3B0aW9uID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KClbdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCldO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy5jaGFuZ2VzXHJcbiAgICAgICAgICAucGlwZSh0YXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBhdm9pZCBcImV4cHJlc3Npb24gaGFzIGJlZW4gY2hhbmdlZFwiIGVycm9yXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIFF1ZXJ5TGlzdCB0byBhbiBhcnJheVxyXG4gICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zPy50b0FycmF5KCkgPz8gW107XHJcblxyXG4gICAgICAgICAgICAgIC8vIFRoZSB0cnVlIGZpcnN0IGl0ZW0gaXMgb2Zmc2V0IGJ5IDFcclxuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rmlyc3RPcHRpb24gPSBvcHRpb25zW3RoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpXTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc3Qga2V5TWFuYWdlciA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyO1xyXG4gICAgICAgICAgICAgIGlmIChrZXlNYW5hZ2VyICYmIHRoaXMubWF0U2VsZWN0LnBhbmVsT3Blbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHNldCBmaXJzdCBpdGVtIGFjdGl2ZSBhbmQgaW5wdXQgd2lkdGhcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGVzZSBjaGFuZ2VzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cy5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uSXNDaGFuZ2VkID0gIXRoaXMubWF0U2VsZWN0LmNvbXBhcmVXaXRoKHByZXZpb3VzRmlyc3RPcHRpb24sIGN1cnJlbnRGaXJzdE9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ0FTRTogVGhlIGZpcnN0IG9wdGlvbiBpcyBkaWZmZXJlbnQgbm93LlxyXG4gICAgICAgICAgICAgICAgLy8gSW5kaWNpYXRlcyB3ZSBzaG91bGQgc2V0IGl0IGFzIGFjdGl2ZSBhbmQgc2Nyb2xsIHRvIHRoZSB0b3AuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RPcHRpb25Jc0NoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgfHwgIWtleU1hbmFnZXIuYWN0aXZlSXRlbVxyXG4gICAgICAgICAgICAgICAgICB8fCAhb3B0aW9ucy5maW5kKG9wdGlvbiA9PiB0aGlzLm1hdFNlbGVjdC5jb21wYXJlV2l0aChvcHRpb24sIGtleU1hbmFnZXIuYWN0aXZlSXRlbSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd2FpdCBmb3IgcGFuZWwgd2lkdGggY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyBVcGRhdGUgb3VyIHJlZmVyZW5jZVxyXG4gICAgICAgICAgICAgIHByZXZpb3VzRmlyc3RPcHRpb24gPSBjdXJyZW50Rmlyc3RPcHRpb247XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAvLyBhZGQgb3IgcmVtb3ZlIGNzcyBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciB0byBzaG93IHRoZSBubyBlbnRyaWVzIGZvdW5kIG1lc3NhZ2VcclxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcclxuICAgIHRoaXMuX3Nob3dOb0VudHJpZXNGb3VuZCQucGlwZShcclxuICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcclxuICAgICkuc3Vic2NyaWJlKHNob3dOb0VudHJpZXNGb3VuZCA9PiB7XHJcbiAgICAgIC8vIHNldCBubyBlbnRyaWVzIGZvdW5kIGNsYXNzIG9uIG1hdCBvcHRpb25cclxuICAgICAgaWYgKHRoaXMubWF0T3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKHNob3dOb0VudHJpZXNGb3VuZCkge1xyXG4gICAgICAgICAgdGhpcy5tYXRPcHRpb24uX2dldEhvc3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCgnbWF0LXNlbGVjdC1zZWFyY2gtbm8tZW50cmllcy1mb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm1hdE9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKCdtYXQtc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyByZXNpemUgdGhlIGlucHV0IHdpZHRoIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHJlc2l6ZWQsIGkuZS4gdGhlIHRyaWdnZXIgd2lkdGggY291bGQgcG90ZW50aWFsbHkgYmUgcmVzaXplZFxyXG4gICAgdGhpcy5fdmlld3BvcnRSdWxlci5jaGFuZ2UoKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0U2VsZWN0LnBhbmVsT3Blbikge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmluaXRNdWx0aXBsZUhhbmRsaW5nKCk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zTGlzdCQucGlwZShcclxuICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcclxuICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgLy8gdXBkYXRlIHZpZXcgd2hlbiBhdmFpbGFibGUgb3B0aW9ucyBjaGFuZ2VcclxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2VtaXRTZWxlY3RBbGxCb29sZWFuVG9QYXJlbnQoc3RhdGU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudG9nZ2xlQWxsLmVtaXQoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHRoaXMubWF0U2VsZWN0Py5tdWx0aXBsZSkgJiYgdGhpcy5zaG93VG9nZ2xlQWxsQ2hlY2tib3g7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHRoZSBrZXkgZG93biBldmVudCB3aXRoIE1hdExlZ2FjeVNlbGVjdC5cclxuICAgKiBBbGxvd3MgZS5nLiBzZWxlY3Rpbmcgd2l0aCBlbnRlciBrZXksIG5hdmlnYXRpb24gd2l0aCBhcnJvdyBrZXlzLCBldGMuXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIFByZXZlbnQgcHJvcGFnYXRpb24gZm9yIGFsbCBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBpbiBvcmRlciB0byBhdm9pZCBzZWxlY3Rpb24gaXNzdWVzXHJcbiAgICBpZiAoKGV2ZW50LmtleSAmJiBldmVudC5rZXkubGVuZ3RoID09PSAxKSB8fFxyXG4gICAgICAoZXZlbnQua2V5Q29kZSA+PSBBICYmIGV2ZW50LmtleUNvZGUgPD0gWikgfHxcclxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gWkVSTyAmJiBldmVudC5rZXlDb2RlIDw9IE5JTkUpIHx8XHJcbiAgICAgIChldmVudC5rZXlDb2RlID09PSBTUEFDRSlcclxuICAgICAgfHwgKHRoaXMucHJldmVudEhvbWVFbmRLZXlQcm9wYWdhdGlvbiAmJiAoZXZlbnQua2V5Q29kZSA9PT0gSE9NRSB8fCBldmVudC5rZXlDb2RlID09PSBFTkQpKVxyXG4gICAgKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy5tYXRTZWxlY3Q/Lm11bHRpcGxlKSAmJiBldmVudC5rZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcclxuICAgICAgLy8gUmVnYWluIGZvY3VzIGFmdGVyIG11bHRpc2VsZWN0LCBzbyB3ZSBjYW4gZnVydGhlciB0eXBlXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm9jdXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3BlY2lhbCBjYXNlIGlmIGNsaWNrIEVzY2FwZSwgaWYgaW5wdXQgaXMgZW1wdHksIGNsb3NlIHRoZSBkcm9wZG93biwgaWYgbm90LCBlbXB0eSBvdXQgdGhlIHNlYXJjaCBmaWVsZFxyXG4gICAgaWYgKHRoaXMuZW5hYmxlQ2xlYXJPbkVzY2FwZVByZXNzZWQgPT09IHRydWUgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5fcmVzZXQodHJ1ZSk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyB0aGUga2V5IHVwIGV2ZW50IHdpdGggTWF0TGVnYWN5U2VsZWN0LlxyXG4gICAqIEFsbG93cyBlLmcuIHRoZSBhbm5vdW5jaW5nIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlRGVzY2VuZGFudCBieSBzY3JlZW4gcmVhZGVycy5cclxuICAgKi9cclxuICBfaGFuZGxlS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVyB8fCBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XHJcbiAgICAgIGNvbnN0IGFyaWFBY3RpdmVEZXNjZW5kYW50SWQgPSB0aGlzLm1hdFNlbGVjdC5fZ2V0QXJpYUFjdGl2ZURlc2NlbmRhbnQoKTtcclxuICAgICAgY29uc3Qgb3B0aW9uQXJyYXkgPSB0aGlzLl9vcHRpb25zPy50b0FycmF5KCkgPz8gW107XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gb3B0aW9uQXJyYXkuZmluZEluZGV4KGl0ZW0gPT4gaXRlbSAmJiBpdGVtWydpZCddICYmIGl0ZW1bJ2lkJ10gPT09IGFyaWFBY3RpdmVEZXNjZW5kYW50SWQpO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy51bnNlbGVjdEFjdGl2ZURlc2NlbmRhbnQoKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBvcHRpb25BcnJheVtpbmRleF0uX2dldEhvc3RFbGVtZW50KCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hTZWxlY3RJbnB1dC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgYXJpYUFjdGl2ZURlc2NlbmRhbnRJZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMudW5zZWxlY3RBY3RpdmVEZXNjZW5kYW50KCk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxyXG4gICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09IHRoaXMuX2xhc3RFeHRlcm5hbElucHV0VmFsdWUpLFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSA9IHVuZGVmaW5lZCksXHJcbiAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXHJcbiAgICApLnN1YnNjcmliZShmbik7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvY3VzZXMgdGhlIHNlYXJjaCBpbnB1dCBmaWVsZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBfZm9jdXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VhcmNoU2VsZWN0SW5wdXQgfHwgIXRoaXMubWF0U2VsZWN0LnBhbmVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIHNhdmUgYW5kIHJlc3RvcmUgc2Nyb2xsVG9wIG9mIHBhbmVsLCBzaW5jZSBpdCB3aWxsIGJlIHJlc2V0IGJ5IGZvY3VzKClcclxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcclxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5tYXRTZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHBhbmVsLnNjcm9sbFRvcDtcclxuXHJcbiAgICAvLyBmb2N1c1xyXG4gICAgdGhpcy5zZWFyY2hTZWxlY3RJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcblxyXG4gICAgcGFuZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSBjdXJyZW50IHNlYXJjaCB2YWx1ZVxyXG4gICAqIEBwYXJhbSBmb2N1cyB3aGV0aGVyIHRvIGZvY3VzIGFmdGVyIHJlc2V0dGluZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyBfcmVzZXQoZm9jdXM/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9mb3JtQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgdGhpcy5fZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBoYW5kbGluZyA8bWF0LXNlbGVjdCBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxyXG4gICAqIE5vdGU6IHRvIGltcHJvdmUgdGhpcyBjb2RlLCBtYXQtc2VsZWN0IHNob3VsZCBiZSBleHRlbmRlZCB0byBhbGxvdyBkaXNhYmxpbmcgcmVzZXR0aW5nIHRoZSBzZWxlY3Rpb24gd2hpbGUgZmlsdGVyaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdE11bHRpcGxlSGFuZGxpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5tYXRTZWxlY3QubmdDb250cm9sID09PSBudWxsKSB7XHJcbiAgICAgIGlmICh0aGlzLm1hdFNlbGVjdD8ubXVsdGlwbGUpIHtcclxuICAgICAgICAvLyBub3RlOiB0aGUgYWNjZXNzIHRvIE1hdExlZ2FjeVNlbGVjdC5uZ0NvbnRyb2wgKGluc3RlYWQgb2YgTWF0TGVnYWN5U2VsZWN0LnZhbHVlIC8gTWF0TGVnYWN5U2VsZWN0LnZhbHVlQ2hhbmdlcylcclxuICAgICAgICAvLyBpcyBuZWNlc3NhcnkgdG8gcHJvcGVybHkgd29yayBpbiBtdWx0aS1zZWxlY3Rpb24gbW9kZS5cclxuICAgICAgICBjb25zb2xlLmVycm9yKCd0aGUgbWF0LXNlbGVjdCBjb250YWluaW5nIG5neC1tYXQtc2VsZWN0LXNlYXJjaCBtdXN0IGhhdmUgYSBuZ01vZGVsIG9yIGZvcm1Db250cm9sIGRpcmVjdGl2ZSB3aGVuIG11bHRpcGxlPXRydWUnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZUNoYW5nZXMgPSB0aGlzLm1hdFNlbGVjdC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzO1xyXG4gICAgaWYgKHZhbHVlQ2hhbmdlcyA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIGlmIDxtYXQtc2VsZWN0IFttdWx0aXBsZV09XCJ0cnVlXCI+XHJcbiAgICAvLyBzdG9yZSBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyBhbmQgcmVzdG9yZSB0aGVtIHdoZW4gdGhleSBhcmUgZGVzZWxlY3RlZFxyXG4gICAgLy8gYmVjYXVzZSB0aGUgb3B0aW9uIGlzIG5vdCBhdmFpbGFibGUgd2hpbGUgd2UgYXJlIGN1cnJlbnRseSBmaWx0ZXJpbmdcclxuICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcyA9IHRoaXMubWF0U2VsZWN0Lm5nQ29udHJvbC52YWx1ZTtcclxuXHJcbiAgICB2YWx1ZUNoYW5nZXNcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlcykgPT4ge1xyXG4gICAgICAgIGxldCByZXN0b3JlU2VsZWN0ZWRWYWx1ZXMgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tYXRTZWxlY3Q/Lm11bHRpcGxlKSB7XHJcbiAgICAgICAgICBpZiAoKHRoaXMuYWx3YXlzUmVzdG9yZVNlbGVjdGVkT3B0aW9uc011bHRpIHx8ICh0aGlzLl9mb3JtQ29udHJvbC52YWx1ZSAmJiB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZS5sZW5ndGgpKVxyXG4gICAgICAgICAgICAmJiB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMpKSB7XHJcbiAgICAgICAgICAgIGlmICghdmFsdWVzIHx8ICFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcclxuICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLm1hdFNlbGVjdC5vcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcy5mb3JFYWNoKHByZXZpb3VzVmFsdWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgIGlmICghdmFsdWVzLnNvbWUoKHY6IGFueSkgPT4gdGhpcy5tYXRTZWxlY3QuY29tcGFyZVdpdGgodiwgcHJldmlvdXNWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAmJiAhb3B0aW9uVmFsdWVzLnNvbWUodiA9PiB0aGlzLm1hdFNlbGVjdC5jb21wYXJlV2l0aCh2LCBwcmV2aW91c1ZhbHVlKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBhIHZhbHVlIHRoYXQgd2FzIHNlbGVjdGVkIGJlZm9yZSBpcyBkZXNlbGVjdGVkIGFuZCBub3QgZm91bmQgaW4gdGhlIG9wdGlvbnMsIGl0IHdhcyBkZXNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAvLyBkdWUgdG8gdGhlIGZpbHRlcmluZywgc28gd2UgcmVzdG9yZSBpdC5cclxuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgPSB2YWx1ZXM7XHJcblxyXG4gICAgICAgIGlmIChyZXN0b3JlU2VsZWN0ZWRWYWx1ZXMpIHtcclxuICAgICAgICAgIHRoaXMubWF0U2VsZWN0Ll9vbkNoYW5nZSh2YWx1ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAgU2V0IHRoZSB3aWR0aCBvZiB0aGUgaW5uZXJTZWxlY3RTZWFyY2ggdG8gZml0IGV2ZW4gY3VzdG9tIHNjcm9sbGJhcnNcclxuICAgKiAgQW5kIHN1cHBvcnQgYWxsIE9wZXJhdGlvbiBTeXN0ZW1zXHJcbiAgICovXHJcbiAgcHVibGljIHVwZGF0ZUlucHV0V2lkdGgoKSB7XHJcbiAgICBpZiAoIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2ggfHwgIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHBhbmVsRWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Py5wYXJlbnRFbGVtZW50ID8/IG51bGwpICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWF0LXNlbGVjdC1wYW5lbCcpKSB7XHJcbiAgICAgICAgcGFuZWxFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhbmVsRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBwYW5lbEVsZW1lbnQuY2xpZW50V2lkdGggKyAncHgnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lIHRoZSBvZmZzZXQgdG8gbGVuZ3RoIHRoYXQgY2FuIGJlIGNhdXNlZCBieSB0aGUgb3B0aW9uYWwgTWF0TGVnYWN5T3B0aW9uIHVzZWQgYXMgYSBzZWFyY2ggaW5wdXQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5tYXRPcHRpb24pIHtcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5zZWxlY3RBY3RpdmVEZXNjZW5kYW50KCkge1xyXG4gICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50Py5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcclxuICAgIHRoaXMuc2VhcmNoU2VsZWN0SW5wdXQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPCEtLVxyXG5Db3B5cmlnaHQgKGMpIDIwMTggQml0aG9zdCBHbWJIIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcblxyXG5Vc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG5mb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbi0tPlxyXG48IS0tIFBsYWNlaG9sZGVyIHRvIGFkanVzdCB2ZXJ0aWNhbCBvZmZzZXQgb2YgdGhlIG1hdC1vcHRpb24gZWxlbWVudHMgLS0+XHJcbjxpbnB1dCBtYXRJbnB1dCBjbGFzcz1cIm1hdC1zZWxlY3Qtc2VhcmNoLWlucHV0IG1hdC1zZWxlY3Qtc2VhcmNoLWhpZGRlblwiLz5cclxuXHJcbjwhLS0gTm90ZTogdGhlICBtYXQtZGF0ZXBpY2tlci1jb250ZW50IG1hdC10YWItaGVhZGVyIGFyZSBuZWVkZWQgdG8gaW5oZXJpdCB0aGUgbWF0ZXJpYWwgdGhlbWUgY29sb3JzLCBzZWUgUFIgIzIyIC0tPlxyXG48ZGl2XHJcbiAgICAgICNpbm5lclNlbGVjdFNlYXJjaFxyXG4gICAgICBjbGFzcz1cIm1hdC1zZWxlY3Qtc2VhcmNoLWlubmVyIG1hdC10eXBvZ3JhcGh5IG1hdC1kYXRlcGlja2VyLWNvbnRlbnQgbWF0LXRhYi1oZWFkZXJcIlxyXG4gICAgICBbbmdDbGFzc109XCJ7J21hdC1zZWxlY3Qtc2VhcmNoLWlubmVyLW11bHRpcGxlJzogbWF0U2VsZWN0Lm11bHRpcGxlLCAnbWF0LXNlbGVjdC1zZWFyY2gtaW5uZXItdG9nZ2xlLWFsbCc6IF9pc1RvZ2dsZUFsbENoZWNrYm94VmlzaWJsZSgpIH1cIj5cclxuXHJcbiAgPG1hdC1jaGVja2JveCAqbmdJZj1cIl9pc1RvZ2dsZUFsbENoZWNrYm94VmlzaWJsZSgpXCJcclxuICAgICAgICAgICAgICAgIFtjb2xvcl09XCJtYXRGb3JtRmllbGQ/LmNvbG9yXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwibWF0LXNlbGVjdC1zZWFyY2gtdG9nZ2xlLWFsbC1jaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJ0b2dnbGVBbGxDaGVja2JveENoZWNrZWRcIlxyXG4gICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwidG9nZ2xlQWxsQ2hlY2tib3hJbmRldGVybWluYXRlXCJcclxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRvZ2dsZUFsbENoZWNrYm94VG9vbHRpcE1lc3NhZ2VcIlxyXG4gICAgICAgICAgICAgICAgbWF0VG9vbHRpcENsYXNzPVwibmd4LW1hdC1zZWxlY3Qtc2VhcmNoLXRvZ2dsZS1hbGwtdG9vbHRpcFwiXHJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cInRvZ2dsZUFsbENoZWNrYm94VG9vbHRpcFBvc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwiX2VtaXRTZWxlY3RBbGxCb29sZWFuVG9QYXJlbnQoJGV2ZW50LmNoZWNrZWQpXCJcclxuICA+PC9tYXQtY2hlY2tib3g+XHJcblxyXG4gIDxpbnB1dCBjbGFzcz1cIm1hdC1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcclxuICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgICAgW3R5cGVdPVwidHlwZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbF09XCJfZm9ybUNvbnRyb2xcIlxyXG4gICAgICAgICAjc2VhcmNoU2VsZWN0SW5wdXRcclxuICAgICAgICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXHJcbiAgICAgICAgIChrZXl1cCk9XCJfaGFuZGxlS2V5dXAoJGV2ZW50KVwiXHJcbiAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcclxuICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyTGFiZWxcIlxyXG4gICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXHJcbiAgLz5cclxuICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJzZWFyY2hpbmdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJtYXQtc2VsZWN0LXNlYXJjaC1zcGlubmVyXCJcclxuICAgICAgICAgIGRpYW1ldGVyPVwiMTZcIj48L21hdC1zcGlubmVyPlxyXG5cclxuICA8YnV0dG9uICpuZ0lmPVwiIWhpZGVDbGVhclNlYXJjaEJ1dHRvbiAmJiB2YWx1ZSAmJiAhc2VhcmNoaW5nXCJcclxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIkNsZWFyXCJcclxuICAgICAgICAgIChjbGljayk9XCJfcmVzZXQodHJ1ZSlcIlxyXG4gICAgICAgICAgY2xhc3M9XCJtYXQtc2VsZWN0LXNlYXJjaC1jbGVhclwiPlxyXG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCJjbGVhckljb247IGVsc2UgZGVmYXVsdEljb25cIiBzZWxlY3Q9XCJbbmd4TWF0U2VsZWN0U2VhcmNoQ2xlYXJdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0SWNvbj5cclxuICAgICAgPG1hdC1pY29uIFtzdmdJY29uXT1cImNsb3NlU3ZnSWNvbiA/PyAnJ1wiPlxyXG4gICAgICAgIHt7IWNsb3NlU3ZnSWNvbiA/IGNsb3NlSWNvbiA6IG51bGx9fVxyXG4gICAgICA8L21hdC1pY29uPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L2J1dHRvbj5cclxuXHJcbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hdC1zZWxlY3Qtc2VhcmNoLWN1c3RvbS1oZWFkZXItY29udGVudFwiPjwvbmctY29udGVudD5cclxuXHJcbiAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiAqbmdJZj1cIl9zaG93Tm9FbnRyaWVzRm91bmQkIHwgYXN5bmNcIlxyXG4gICAgIGNsYXNzPVwibWF0LXNlbGVjdC1zZWFyY2gtbm8tZW50cmllcy1mb3VuZFwiPlxyXG4gIDxuZy1jb250ZW50ICpuZ0lmPVwibm9FbnRyaWVzRm91bmQ7IGVsc2UgZGVmYXVsdE5vRW50cmllc0ZvdW5kXCJcclxuICAgICAgICAgICAgICBzZWxlY3Q9XCJbbmd4TWF0U2VsZWN0Tm9FbnRyaWVzRm91bmRdXCI+PC9uZy1jb250ZW50PlxyXG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE5vRW50cmllc0ZvdW5kPnt7bm9FbnRyaWVzRm91bmRMYWJlbH19PC9uZy10ZW1wbGF0ZT5cclxuPC9kaXY+XHJcbiJdfQ==