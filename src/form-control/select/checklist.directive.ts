import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[checklist]',
})
export class ChecklistDirective {
  el: ElementRef;

  @Input('checklist')
  checklist: any[];

  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('change', ['$event.target']) onChange(checkbox: any) {
    console.log('change', this.checklist);
    if (checkbox.checked) {
      this.checklist.push(checkbox.value);
    }
    else {
      this.checklist.splice(this.checklist.indexOf(this.el.nativeElement.value), 1);
    }
  }
}