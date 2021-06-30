import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DocumentsService } from '../core/services/documents.service';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      providers: [{
        provide: DocumentsService,
        useValue: {
          documents: jasmine.createSpy('documents'),
          search: jasmine.createSpy('search'),
          filteredDocuments: new BehaviorSubject([
            {
              name: 'Terminal instructables',
              type: 'Technical',
            },
          ])
        },
      },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
