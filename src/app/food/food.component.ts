import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SearchService } from '../search.service';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SearchHintGroup, SearchHintItem, SearchHintAction } from '../search-model';
const STORE_KEY = 'RECENT_SEARCHES';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit, AfterViewInit {
  @ViewChild('input') _input: ElementRef<HTMLInputElement>;
  hints = null;
  loading = false;
  constructor(private _ss: SearchService) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    fromEvent(this._input.nativeElement, 'input')
    .pipe(debounceTime(500)).subscribe(() => {
      this.updateHints();
    });
  }
  onSearch() {
    const value = this._input.nativeElement.value;
    this._ss.setAsRecentSearch(value).subscribe((status: boolean) => {
      if (status) {
        this.hints = null;
        alert('Your search is registered as recent search');
      }
    });
  }
  updateHints() {
    const value = this._input.nativeElement.value;
      if (value.trim() === '') {
        return this.hints = null;
      }
      this._ss.search(value).subscribe((res: any) => {
        const searchHints = [];
        if (res.recent.length > 0) {
          searchHints.push(
            new SearchHintGroup(
              'Recent Searches',
              res.recent.map(s => new SearchHintItem(s, [new SearchHintAction('x', () => {
                this._ss.clearRecentSearch([s]).subscribe(status => {
                  if (status) {
                    this.updateHints();
                  }
                });
              })])),
              [
                new SearchHintAction('clear', () => {
                  this._ss.clearRecentSearch(res.recent).subscribe(status => {
                    if (status) {
                      this.updateHints();
                    }
                  });
                })
              ]
            )
          );
        }
        if (res.popular.length > 0) {
          searchHints.push(
            new SearchHintGroup(
              'Popular Searches',
              res.popular.map(s => new SearchHintItem(s))
            )
          );
        }
        this.hints = searchHints;
      });
  }
}

