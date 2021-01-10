import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadswordComponent } from './broadsword.component';

describe('BroadswordComponent', () => {
  let component: BroadswordComponent;
  let fixture: ComponentFixture<BroadswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
