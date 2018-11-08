import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachNotesComponent } from './serach-notes.component';

describe('SerachNotesComponent', () => {
  let component: SerachNotesComponent;
  let fixture: ComponentFixture<SerachNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerachNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
