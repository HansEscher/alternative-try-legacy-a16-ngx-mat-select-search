import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatLegacyOption } from '@angular/material/legacy-core';
import { MatLegacyFormField as MatFormField } from '@angular/material/legacy-form-field';
import { MatLegacySelect } from '@angular/material/legacy-select';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';
import { MatSelectSearchOptions } from './default-options';
import { MatSelectNoEntriesFoundDirective } from './mat-select-no-entries-found.directive';
export declare class MatSelectSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
    matSelect: MatLegacySelect;
    private matOption;
    changeDetectorRef: ChangeDetectorRef;
    private _viewportRuler;
    matFormField: MatFormField | null;
    /** Label of the search placeholder */
    placeholderLabel: string;
    /** Type of the search input field */
    type: string;
    /** Font-based icon used for displaying Close-Icon */
    closeIcon: string;
    /** Svg-based icon used for displaying Close-Icon. If set, closeIcon is overridden */
    closeSvgIcon?: string;
    /** Label to be shown when no entries are found. Set to null if no message should be shown. */
    noEntriesFoundLabel: string;
    /**
      * Whether or not the search field should be cleared after the dropdown menu is closed.
      * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
      */
    clearSearchInput: boolean;
    /** Whether to show the search-in-progress indicator */
    searching: boolean;
    /** Disables initial focusing of the input field */
    disableInitialFocus: boolean;
    /** Enable clear input on escape pressed */
    enableClearOnEscapePressed: boolean;
    /**
     * Prevents home / end key being propagated to mat-select,
     * allowing to move the cursor within the search input instead of navigating the options
     */
    preventHomeEndKeyPropagation: boolean;
    /** Disables scrolling to active options when option list changes. Useful for server-side search */
    disableScrollToActiveOnOptionsChanged: boolean;
    /** Adds 508 screen reader support for search box */
    ariaLabel: string;
    /** Whether to show Select All Checkbox (for mat-select[multi=true]) */
    showToggleAllCheckbox: boolean;
    /** select all checkbox checked state */
    toggleAllCheckboxChecked: boolean;
    /** select all checkbox indeterminate state */
    toggleAllCheckboxIndeterminate: boolean;
    /** Display a message in a tooltip on the toggle-all checkbox */
    toggleAllCheckboxTooltipMessage: string;
    /** Define the position of the tooltip on the toggle-all checkbox. */
    toggleAllCheckboxTooltipPosition: 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
    /** Show/Hide the search clear button of the search input */
    hideClearSearchButton: boolean;
    /**
     * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
     * Defaults to false, so selected options are only restored while filtering is active.
     */
    alwaysRestoreSelectedOptionsMulti: boolean;
    /** Output emitter to send to parent component with the toggle all boolean */
    toggleAll: EventEmitter<boolean>;
    /** Reference to the search input field */
    searchSelectInput: ElementRef;
    /** Reference to the search input field */
    innerSelectSearch: ElementRef;
    /** Reference to custom search input clear icon */
    clearIcon: MatSelectSearchClearDirective;
    /** Reference to custom no entries found element */
    noEntriesFound: MatSelectNoEntriesFoundDirective;
    /** Current search value */
    get value(): string;
    private _lastExternalInputValue;
    onTouched: Function;
    /** Reference to the MatLegacySelect options */
    set _options(_options: QueryList<MatLegacyOption> | null);
    get _options(): QueryList<MatLegacyOption> | null;
    _options$: BehaviorSubject<QueryList<MatLegacyOption> | null>;
    private optionsList$;
    private optionsLength$;
    /** Previously selected values when using <mat-select [multiple]="true">*/
    private previousSelectedValues;
    _formControl: FormControl<string>;
    /** whether to show the no entries found message */
    _showNoEntriesFound$: Observable<boolean>;
    /** Subject that emits when the component has been destroyed. */
    private _onDestroy;
    /** Reference to active descendant for ARIA Support. */
    private activeDescendant;
    constructor(matSelect: MatLegacySelect, matOption: MatLegacyOption, changeDetectorRef: ChangeDetectorRef, _viewportRuler: ViewportRuler, matFormField?: MatFormField | null, defaultOptions?: MatSelectSearchOptions);
    private applyDefaultOptions;
    ngOnInit(): void;
    _emitSelectAllBooleanToParent(state: boolean): void;
    ngOnDestroy(): void;
    _isToggleAllCheckboxVisible(): boolean;
    /**
     * Handles the key down event with MatLegacySelect.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Handles the key up event with MatLegacySelect.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event: KeyboardEvent): void;
    writeValue(value: string): void;
    onBlur(): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: Function): void;
    /**
     * Focuses the search input field
     */
    _focus(): void;
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus?: boolean): void;
    /**
     * Initializes handling <mat-select [multiple]="true">
     * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
     */
    private initMultipleHandling;
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth(): void;
    /**
     * Determine the offset to length that can be caused by the optional MatLegacyOption used as a search input.
     */
    private getOptionsLengthOffset;
    private unselectActiveDescendant;
}
