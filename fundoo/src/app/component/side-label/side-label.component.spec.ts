import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLabelComponent } from './side-label.component';

describe('SideLabelComponent', () => {
  let component: SideLabelComponent;
  let fixture: ComponentFixture<SideLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
