import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appToday]',
})
export class TodayDirective {
  @Input('appToday') public date: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    if (today === this.date) {
      this.renderer.setStyle(this.element.nativeElement, 'background', '#dedede');
    }
  }
}
