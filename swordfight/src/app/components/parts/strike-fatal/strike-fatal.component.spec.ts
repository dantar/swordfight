import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeFatalComponent } from './strike-fatal.component';

describe('StrikeFatalComponent', () => {
  let component: StrikeFatalComponent;
  let fixture: ComponentFixture<StrikeFatalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrikeFatalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikeFatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
