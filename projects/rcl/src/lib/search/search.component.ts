import { Component, OnInit, Input, ElementRef, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'rcl-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  hints = null;
  @Input() loading = false;
  @Input()
  set hintData(data) {
    this.hints = data;
  }
  @Output() search: EventEmitter<any> = new EventEmitter();
  private _input: HTMLInputElement = null;
  private _handler = this.onKeyUp.bind(this);
  constructor(private _elRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this._input = this._elRef.nativeElement.querySelector('input');
    this._input.addEventListener('keyup', this._handler);
  }
  isDataArray(data): boolean {
    return !!data && typeof data === 'object' && Array.isArray(data) && data.length > 0;
  }
  onSetValue({target, currentTarget}: MouseEvent, value: string) {
    if (target === currentTarget && this._input && value !== undefined && value !== null) {
      this.hints = null;
      this._input.value = value;
    }
    this._input.focus();
  }
  onSearch() {
    this.search.emit();
  }
  onKeyUp({ keyCode }: KeyboardEvent) {
    if (keyCode === 13) {
      this.onSearch();
    }
  }
  ngOnDestroy() {
    this._input.removeEventListener('keyup', this._handler);
  }
}
