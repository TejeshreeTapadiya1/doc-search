import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { DocumentsService } from '../core/services/documents.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input('categories') categories$!: Observable<string[]>;
  selectedCategory = 'All';

  constructor(private readonly _service: DocumentsService) {}

  selectCategory(type: string) {
    this._service.search('type', type);
    this.selectedCategory = type;
  }

}
