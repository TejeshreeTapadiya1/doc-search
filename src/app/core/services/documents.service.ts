import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinct, map, toArray } from 'rxjs/operators';
import Document from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private _localUrl = 'assets/documents-data.json';
  private allDocuments: Document[] = [];
  filteredDocuments = new BehaviorSubject<Document[]>(this.allDocuments);

  set documents(documents: Document[]) {
    this.allDocuments.push(...documents);
  }

  get documents() {
    return this.allDocuments;
  }

  constructor(private http: HttpClient) {}

  fetchDocuments() {
    return this.http.get<any>(this._localUrl);
  }

  getAllCategories(): Observable<string[]> {
    return from([{ name: '', type: 'All' }, ...this.allDocuments]).pipe(
      map((document: Document) => document.type),
      distinct(),
      toArray()
    );
  }

  search(kind: 'name' | 'type', query: string) {
    let result = this.allDocuments
      .filter((item: Document) =>
        item[kind].toLowerCase().match(query.toLowerCase())
      )
      .slice();
    if (!result.length && (kind === 'type')) {
      this.filteredDocuments.next(this.allDocuments);
    } else {
      this.filteredDocuments.next(result);
    }
  }
}
