import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPopupComponent } from './currency-popup.component';

describe('CurrencyPopupComponent', () => {
  let component: CurrencyPopupComponent;
  let fixture: ComponentFixture<CurrencyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
