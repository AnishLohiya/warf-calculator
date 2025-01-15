import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CLOFund } from '../fund.model';
import { WarfCalculatorService } from '../warf-calculator.service';

@Component({
  selector: 'app-warf-calculator',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './warf-calculator.component.html',
  styleUrl: './warf-calculator.component.scss'
})
export class WarfCalculatorComponent {
  funds: CLOFund[] = [];

  constructor(private warfService: WarfCalculatorService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData();
  }

  selectedFund!: CLOFund | null;

  loadData() {
    this.warfService.getCLOFunds().subscribe({
      next: (funds: CLOFund[]) => {
        this.funds = funds;
        console.log(funds);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

 adjustments = {
    WAS: 0,
    Diversity: 0,
    MRR: 0
  };

  adjustedValues = {
    WAS: 0,
    Diversity: 0,
    MRR: 0
  };

  onFundSelect(event: Event): void {
    const selectedFundName = (event.target as HTMLSelectElement).value;
    this.selectedFund = this.funds.find(fund => fund.fund === selectedFundName) || null;

    // Reset adjustments
    if (this.selectedFund) {
      this.adjustments = { WAS: 0, Diversity: 0, MRR: 0 };
      this.updateAdjustedValues();
    }
  }

  updateAdjustedValues(): void {
    if (this.selectedFund) {
      this.adjustedValues.WAS = this.selectedFund.WAS + this.adjustments.WAS;
      this.adjustedValues.Diversity = this.selectedFund.Diversity + this.adjustments.Diversity;
      this.adjustedValues.MRR = this.selectedFund.MRR + this.adjustments.MRR;
    }
  }
}
