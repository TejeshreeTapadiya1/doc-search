import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './core/services/documents.service';
import Document from './core/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories$!: Observable<string[]>;

  constructor(private readonly _service: DocumentsService) {}

  ngOnInit() {
    this._service.fetchDocuments().subscribe((response) => {
      this._service.documents = response.documents; // set all documents in service
      this.categories$ = this._service.getAllCategories(); // get categories
    });
  }

}
