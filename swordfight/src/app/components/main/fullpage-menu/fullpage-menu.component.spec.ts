import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpageMenuComponent } from './fullpage-menu.component';

describe('FullpageMenuComponent', () => {
  let component: FullpageMenuComponent;
  let fixture: ComponentFixture<FullpageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullpageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullpageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
