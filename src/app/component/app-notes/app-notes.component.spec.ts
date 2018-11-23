import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNotesComponent } from './app-notes.component';

describe('AppNotesComponent', () => {
  let component: AppNotesComponent;
  let fixture: ComponentFixture<AppNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
