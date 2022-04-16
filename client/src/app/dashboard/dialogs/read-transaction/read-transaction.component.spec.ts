import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTransactionComponent } from './read-transaction.component';

describe('ReadTransactionComponent', () => {
  let component: ReadTransactionComponent;
  let fixture: ComponentFixture<ReadTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
