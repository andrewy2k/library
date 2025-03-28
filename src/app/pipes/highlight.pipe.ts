import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private readonly sanitizer: DomSanitizer) {}
  transform(value: string, searchValue: string, highlightClass: string = 'highlight'): SafeHtml {
    if (!searchValue || !value) return this.sanitizer.bypassSecurityTrustHtml(value);

    const regex = new RegExp(`(${searchValue})`, 'gi');
    const highlighted = value.replace(regex, `<span class="${highlightClass}">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
