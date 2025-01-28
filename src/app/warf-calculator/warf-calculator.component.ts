import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CLOFund } from '../fund.model';
import { WarfCalculatorService } from '../warf-calculator.service';

@Component({
  selector: 'app-warf-calculator',
  imports: [NgFor, NgIf, FormsModule, NgClass],
  templateUrl: './warf-calculator.component.html',
  styleUrl: './warf-calculator.component.scss',
})
export class WarfCalculatorComponent {
  funds: CLOFund[] = [];  
  fundColumns = ['WAS', 'Diversity', 'WARF', 'MRR'];
  selectedFund!: CLOFund | null;
  selectedFundData!: CLOFund["Results"];

  constructor(private warfService: WarfCalculatorService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData();
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

  resetSliders(): void {
    this.adjustments.Result.WAS = 0;
    this.adjustments.Result.Diversity = 0;
    this.adjustments.Result.MRR = 0;
    this.updateAdjustedValues();
  }

  resultColorClass(value: string): string {
    return value === 'PASS' ? 'text-green-500' : 'text-red-500';
  }

  sliderColorClass(value: number): string {
    return value == 0 ? 'text-gray-400' : value > 0 ? 'text-green-500' : 'text-red-500';
  }
}
