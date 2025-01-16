import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CLOFund } from '../fund.model';
import { WarfCalculatorService } from '../warf-calculator.service';

@Component({
  selector: 'app-warf-calculator',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './warf-calculator.component.html',
  styleUrl: './warf-calculator.component.scss',
})
export class WarfCalculatorComponent {
  funds: CLOFund[] = [];

  constructor(private warfService: WarfCalculatorService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData();
  }

  fundColumns = ['WAS', 'Diversity', 'WARF', 'MRR'];
  selectedFund!: CLOFund | null;
  selectedFundData!: {
   Result: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    Limit: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    Cushion: {
      WAS: number;
      Diversity: number;
      WARF: number;
      MRR: number;
    };
    result: {
      WAS: string;
      Diversity: string;
      WARF: string;
      MRR: string;
    }
  }

  loadData() {
    this.warfService.getCLOFunds().subscribe({
      next: (funds: CLOFund[]) => {
        this.funds = funds;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  adjustments = {
    Result: {
      WAS: 0,
      Diversity: 0,
      MRR: 0,
    },
  };

  adjustedValues = {
    Result: {
      WAS: 0,
      Diversity: 0,
      MRR: 0,
    },
  };

 onFundSelect(event: Event): void {
  const selectedFundName = (event.target as HTMLSelectElement).value;
  this.selectedFund =
    this.funds.find((fund) => fund.fund === selectedFundName) || null;

  if (this.selectedFund?.Results?.Result) {
    this.selectedFundData = this.selectedFund.Results;
  }

  console.log(this.selectedFundData);

  if (this.selectedFund) {
    this.adjustments.Result.WAS = 0;
    this.adjustments.Result.Diversity = 0;
    this.adjustments.Result.MRR = 0;
    this.updateAdjustedValues();
  }
}


  updateAdjustedValues(): void {
    if (this.selectedFund) {
      this.adjustedValues.Result.WAS = this.selectedFundData.Result.WAS + this.adjustments.Result.WAS;
      this.adjustedValues.Result.Diversity = this.selectedFundData.Result.Diversity + this.adjustments.Result.Diversity;
      this.adjustedValues.Result.MRR = this.selectedFundData.Result.MRR + this.adjustments.Result.MRR;
    }
  }
}
