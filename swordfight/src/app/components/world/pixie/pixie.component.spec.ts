import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixieComponent } from './pixie.component';

describe('PixieComponent', () => {
  let component: PixieComponent;
  let fixture: ComponentFixture<PixieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
