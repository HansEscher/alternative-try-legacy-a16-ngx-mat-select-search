"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatSelectNoEntriesFoundDirective = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const i0 = tslib_1.__importStar(require("@angular/core"));
/**
 * Directive for providing a custom no entries found element.
 * e.g.
 * <ngx-mat-select-search [formControl]="bankFilterCtrl">
 *   <span ngxMatSelectNoEntriesFound>
 *     No entries found <button>Add</button>
 *   </span>
 * </ngx-mat-select-search>
 */
class MatSelectNoEntriesFoundDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: MatSelectNoEntriesFoundDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.4", type: MatSelectNoEntriesFoundDirective, selector: "[ngxMatSelectNoEntriesFound]", ngImport: i0 }); }
}
exports.MatSelectNoEntriesFoundDirective = MatSelectNoEntriesFoundDirective;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.4", ngImport: i0, type: MatSelectNoEntriesFoundDirective, decorators: [{
            type: core_1.Directive,
            args: [{
                    selector: '[ngxMatSelectNoEntriesFound]'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1uby1lbnRyaWVzLWZvdW5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXQtc2VsZWN0LW5vLWVudHJpZXMtZm91bmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx3Q0FBMEM7O0FBRTFDOzs7Ozs7OztHQVFHO0FBQ0gsTUFHYSxnQ0FBZ0M7OEdBQWhDLGdDQUFnQztrR0FBaEMsZ0NBQWdDOztBQUg3Qyw0RUFHZ0Q7MkZBQW5DLGdDQUFnQztrQkFINUMsZ0JBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgZm9yIHByb3ZpZGluZyBhIGN1c3RvbSBubyBlbnRyaWVzIGZvdW5kIGVsZW1lbnQuXHJcbiAqIGUuZy5cclxuICogPG5neC1tYXQtc2VsZWN0LXNlYXJjaCBbZm9ybUNvbnRyb2xdPVwiYmFua0ZpbHRlckN0cmxcIj5cclxuICogICA8c3BhbiBuZ3hNYXRTZWxlY3ROb0VudHJpZXNGb3VuZD5cclxuICogICAgIE5vIGVudHJpZXMgZm91bmQgPGJ1dHRvbj5BZGQ8L2J1dHRvbj5cclxuICogICA8L3NwYW4+XHJcbiAqIDwvbmd4LW1hdC1zZWxlY3Qtc2VhcmNoPlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmd4TWF0U2VsZWN0Tm9FbnRyaWVzRm91bmRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0Tm9FbnRyaWVzRm91bmREaXJlY3RpdmUge31cclxuIl19