import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentosComponent } from './fundamentos.component';

describe('FundamentosComponent', () => {
  let component: FundamentosComponent;
  let fixture: ComponentFixture<FundamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
