import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStoneComponent } from './feature-stone.component';

describe('FeatureStoneComponent', () => {
  let component: FeatureStoneComponent;
  let fixture: ComponentFixture<FeatureStoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureStoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
