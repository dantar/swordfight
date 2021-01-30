import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsCogComponent } from './options-cog.component';

describe('OptionsCogComponent', () => {
  let component: OptionsCogComponent;
  let fixture: ComponentFixture<OptionsCogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsCogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsCogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
