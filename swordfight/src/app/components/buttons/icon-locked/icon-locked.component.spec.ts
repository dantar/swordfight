import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLockedComponent } from './icon-locked.component';

describe('IconLockedComponent', () => {
  let component: IconLockedComponent;
  let fixture: ComponentFixture<IconLockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconLockedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
