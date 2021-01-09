import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelButtonsComponent } from './duel-buttons.component';

describe('DuelButtonsComponent', () => {
  let component: DuelButtonsComponent;
  let fixture: ComponentFixture<DuelButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
