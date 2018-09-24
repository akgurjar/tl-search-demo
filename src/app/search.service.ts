import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http: HttpClient) {
    console.log('search service is started');
  }
  search(value: string) {
    return this._http.get('/api/search', {
      params: {
        query: value
      }
    });
  }
  setAsRecentSearch(query: string) {
    return this._http.post('/api/search', {query}).pipe(map((res: any) => res.success));
  }
  clearRecentSearch(data: string[]) {
    return this._http.delete('/api/search', {
      params: {
        data: JSON.stringify(data)
      }
    }).pipe(map((res: any) => res.success));
  }
}
