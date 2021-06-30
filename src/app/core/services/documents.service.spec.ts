import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', {
            get: () => of({
                documents: [
                  {
                    name: 'Terminal instructables',
                    type: 'Technical',
                  },
                ],
              })
          },)
        }
      ],
    });
    service = TestBed.inject(DocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
