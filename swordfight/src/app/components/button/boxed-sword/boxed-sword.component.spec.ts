import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxedSwordComponent } from './boxed-sword.component';

describe('BoxedSwordComponent', () => {
  let component: BoxedSwordComponent;
  let fixture: ComponentFixture<BoxedSwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxedSwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxedSwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
