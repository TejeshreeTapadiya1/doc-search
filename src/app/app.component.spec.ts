import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DocumentsService } from './core/services/documents.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent, SearchResultsComponent, SideMenuComponent],
      providers: [
        {
          provide: DocumentsService,
          useValue: {
            fetchDocuments: jasmine.createSpy('fetchDocuments').and.returnValue(
              of({
                documents: [
                  {
                    name: 'Terminal instructables',
                    type: 'Technical',
                  },
                ],
              })
            ),
            documents: jasmine.createSpy('documents'),
            getAllCategories: jasmine
              .createSpy('getAllCategories')
              .and.returnValue(of(['Technical'])),
            search: jasmine.createSpy('search'),
            filteredDocuments: new BehaviorSubject([
              {
                name: 'Terminal instructables',
                type: 'Technical',
              },
            ])
          },
        }
      ],
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render search results and side menu component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-side-menu')).toBeDefined();
  });
});
