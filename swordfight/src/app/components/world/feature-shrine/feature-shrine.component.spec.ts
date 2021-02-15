import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureShrineComponent } from './feature-shrine.component';

describe('FeatureShrineComponent', () => {
  let component: FeatureShrineComponent;
  let fixture: ComponentFixture<FeatureShrineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureShrineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureShrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
