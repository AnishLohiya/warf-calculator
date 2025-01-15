import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarfCalculatorComponent } from "./warf-calculator/warf-calculator.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WarfCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'warf-calculator';
}
