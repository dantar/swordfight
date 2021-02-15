import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePlaceholderComponent } from './feature-placeholder.component';

describe('FeaturePlaceholderComponent', () => {
  let component: FeaturePlaceholderComponent;
  let fixture: ComponentFixture<FeaturePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
