import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentsService } from '../core/services/documents.service';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ],
      providers: [{
        provide: DocumentsService,
        useValue: {
          search: jasmine.createSpy('search')
        },
      },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
