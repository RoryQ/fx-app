import { Component } from '@angular/core';
import { Currency } from './currency';

@Component({
  selector: 'sources-panel',
  template: `
  <div>
    <fx-source [availableRates]="availableRates" [(amountValue)]="leftAmount" [(selectedCurrencyCode)]="leftCurrencyCode" (changed)="recalcRates($event)" > </fx-source> 
    <fx-source [availableRates]="availableRates" [(amountValue)]="rightAmount" [(selectedCurrencyCode)]="rightCurrencyCode" (changed)="recalcRates($event)" > </fx-source> 
  </div>
  `,
  styles: [`
  `]
})
export class SourcesPanelComponent {
    public availableRates: Array<Currency> = [
        new Currency("Euro", "EUR" ),
        new Currency("Pounds Sterling", "GBP"), 
        new Currency("US Dollars", "USD" )
    ];

    public leftAmount: number = 100;
    public rightAmount: number;

    public leftCurrencyCode: string = "EUR";
    public rightCurrencyCode: string = "GBP";

    public exchangeRates = {
      "EUR": 1,
      "GBP": 0.86218,
      "USD": 1.0629
    }
    
    private validCode(code): boolean {
      return code != null && this.exchangeRates[code] != null;
    }

    public recalcRates(value){
      if (this.validCode(this.leftCurrencyCode) && this.validCode(this.rightCurrencyCode)){
        console.log(this.leftCurrencyCode);
      }
    }
}
