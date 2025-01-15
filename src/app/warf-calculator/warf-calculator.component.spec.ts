import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarfCalculatorComponent } from './warf-calculator.component';

describe('WarfCalculatorComponent', () => {
  let component: WarfCalculatorComponent;
  let fixture: ComponentFixture<WarfCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarfCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarfCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
