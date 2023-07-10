"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgxMatSelectSearchModule = exports.MatSelectNoEntriesFoundDirective = exports.MatSelectSearchClearDirective = exports.MatSelectSearchVersion = void 0;
const tslib_1 = require("tslib");
/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
const i0 = tslib_1.__importStar(require("@angular/core"));
exports.MatSelectSearchVersion = '6.0.5';
class NgxMatSelectSearchModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: NgxMatSelectSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.4", ngImport: i0, type: NgxMatSelectSearchModule, declarations: [mat_select_search_component_1.MatSelectSearchComponent,
            mat_select_search_clear_directive_1.MatSelectSearchClearDirective,
            mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective], imports: [common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            legacy_button_1.MatLegacyButtonModule,
            legacy_checkbox_1.MatLegacyCheckboxModule,
            icon_1.MatIconModule,
            legacy_progress_spinner_1.MatLegacyProgressSpinnerModule,
            legacy_tooltip_1.MatLegacyTooltipModule,
            legacy_select_1.MatLegacySelectModule,
            divider_1.MatDividerModule], exports: [mat_select_search_component_1.MatSelectSearchComponent,
            mat_select_search_clear_directive_1.MatSelectSearchClearDirective,
            mat_select_no_entries_found_directive_1.MatSelectNoEntriesFoundDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: NgxMatSelectSearchModule, imports: [common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            legacy_button_1.MatLegacyButtonModule,
            legacy_checkbox_1.MatLegacyCheckboxModule,
            icon_1.MatIconModule,
            legacy_progress_spinner_1.MatLegacyProgressSpinnerModule,
            legacy_tooltip_1.MatLegacyTooltipModule,
            legacy_select_1.MatLegacySelectModule,
            divider_1.MatDividerModule] }); }
}
exports.NgxMatSelectSearchModule = NgxMatSelectSearchModule;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: NgxMatSelectSearchModule, decorators: [{
            type: core_1.NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1zZWxlY3Qtc2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZ3gtbWF0LXNlbGVjdC1zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7R0FLRztBQUVILHdDQUF5QztBQUN6QywrRUFBeUU7QUFDekUsbUVBQTJGO0FBQzNGLHVFQUFpRztBQUNqRyx1RkFBdUg7QUFDdkgscUVBQThGO0FBQzlGLG1FQUF3RTtBQUN4RSw0Q0FBK0M7QUFDL0MsaURBQXVEO0FBRXZELDJGQUFvRjtBQU0zRSw4R0FOQSxpRUFBNkIsT0FNQTtBQUx0QywwQ0FBcUQ7QUFDckQsbUdBQTJGO0FBS2xGLGlIQUxBLHdFQUFnQyxPQUtBO0FBSnpDLHVEQUE2RDs7QUFFaEQsUUFBQSxzQkFBc0IsR0FBRyxPQUFPLENBQUM7QUFJOUMsTUF1QmEsd0JBQXdCOzhHQUF4Qix3QkFBd0I7K0dBQXhCLHdCQUF3QixpQkFWakMsc0RBQXdCO1lBQ3hCLGlFQUE2QjtZQUM3Qix3RUFBZ0MsYUFiaEMscUJBQVk7WUFDWiwyQkFBbUI7WUFDbkIscUNBQWU7WUFDZix5Q0FBaUI7WUFDakIsb0JBQWE7WUFDYix3REFBd0I7WUFDeEIsdUNBQWdCO1lBQ2hCLHFDQUFxQjtZQUNyQiwwQkFBZ0IsYUFRaEIsc0RBQXdCO1lBQ3hCLGlFQUE2QjtZQUM3Qix3RUFBZ0M7K0dBR3ZCLHdCQUF3QixZQXJCakMscUJBQVk7WUFDWiwyQkFBbUI7WUFDbkIscUNBQWU7WUFDZix5Q0FBaUI7WUFDakIsb0JBQWE7WUFDYix3REFBd0I7WUFDeEIsdUNBQWdCO1lBQ2hCLHFDQUFxQjtZQUNyQiwwQkFBZ0I7O0FBVnBCLDREQXdCQzsyRkFEWSx3QkFBd0I7a0JBdkJwQyxlQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxxQkFBWTt3QkFDWiwyQkFBbUI7d0JBQ25CLHFDQUFlO3dCQUNmLHlDQUFpQjt3QkFDakIsb0JBQWE7d0JBQ2Isd0RBQXdCO3dCQUN4Qix1Q0FBZ0I7d0JBQ2hCLHFDQUFxQjt3QkFDckIsMEJBQWdCO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osc0RBQXdCO3dCQUN4QixpRUFBNkI7d0JBQzdCLHdFQUFnQztxQkFDakM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNEQUF3Qjt3QkFDeEIsaUVBQTZCO3dCQUM3Qix3RUFBZ0M7cUJBQ2pDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxOCBCaXRob3N0IEdtYkggQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNlbGVjdFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vbWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0TGVnYWN5QnV0dG9uTW9kdWxlIGFzIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1idXR0b24nO1xyXG5pbXBvcnQgeyBNYXRMZWdhY3lDaGVja2JveE1vZHVsZSBhcyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1jaGVja2JveCc7XHJcbmltcG9ydCB7IE1hdExlZ2FjeVByb2dyZXNzU3Bpbm5lck1vZHVsZSBhcyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktcHJvZ3Jlc3Mtc3Bpbm5lcic7XHJcbmltcG9ydCB7IE1hdExlZ2FjeVRvb2x0aXBNb2R1bGUgYXMgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS10b29sdGlwJztcclxuaW1wb3J0IHsgTWF0TGVnYWN5U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LXNlbGVjdCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuXHJcbmltcG9ydCB7IE1hdFNlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXQtc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRTZWxlY3ROb0VudHJpZXNGb3VuZERpcmVjdGl2ZSB9IGZyb20gJy4vbWF0LXNlbGVjdC1uby1lbnRyaWVzLWZvdW5kLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1hdERpdmlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBNYXRTZWxlY3RTZWFyY2hWZXJzaW9uID0gJzYuMC41JztcclxuZXhwb3J0IHsgTWF0U2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmUgfTtcclxuZXhwb3J0IHsgTWF0U2VsZWN0Tm9FbnRyaWVzRm91bmREaXJlY3RpdmUgfTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRMZWdhY3lTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQsXHJcbiAgICBNYXRTZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSxcclxuICAgIE1hdFNlbGVjdE5vRW50cmllc0ZvdW5kRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQsXHJcbiAgICBNYXRTZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSxcclxuICAgIE1hdFNlbGVjdE5vRW50cmllc0ZvdW5kRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0U2VsZWN0U2VhcmNoTW9kdWxlIHtcclxufVxyXG4iXX0=