import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import Document from '../core/interfaces';
import { DocumentsService } from '../core/services/documents.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  search: FormControl = new FormControl();
  results: Document[] | undefined;
  subscription$: Subscription = new Subscription();

  constructor(private readonly _service: DocumentsService) {}

  ngOnInit(): void {
    this._service.filteredDocuments.subscribe(
      (results) => (this.results = results)
    );
    this.subscription$ = this.search.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((query) => this._service.search('name', query))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
