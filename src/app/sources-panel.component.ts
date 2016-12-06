import { Component, OnInit } from '@angular/core';
import { Currency } from './currency';

@Component({
  selector: 'sources-panel',
  templateUrl: 'sources-panel.component.html',
  styles: [`
  `]
})
export class SourcesPanelComponent implements OnInit {
    public availableRates: Array<Currency> = [
        new Currency('Euro', 'EUR' ),
        new Currency('Pounds Sterling', 'GBP'),
        new Currency('US Dollars', 'USD' )
    ];

    private _leftAmount: number = 100;
    private _rightAmount: number = 0;


    public get leftAmount(): number{
      return +this._leftAmount.toFixed(2);
    }
    public set leftAmount(val: number){
      this._leftAmount = val;
    }

    public get rightAmount(): number{
      return +this._rightAmount.toFixed(2);
    }

    public set rightAmount(val: number){
      this._rightAmount = val;
    }

    public leftCurrencyCode: string = 'EUR';
    public rightCurrencyCode: string = 'GBP';

    public exchangeRates = {
      'EUR': 1,
      'GBP': 0.85250,
      'USD': 1.0635,
      base: 'EUR'
    };

    private get ltrRate(): number {
      if (this.leftCurrencyCode === this.exchangeRates.base){
        return this.exchangeRates[this.rightCurrencyCode];
      }

      if (this.rightCurrencyCode === this.exchangeRates.base){
        return 1.0 / this.exchangeRates[this.leftCurrencyCode];
      }

      return 1.0 / this.exchangeRates[this.leftCurrencyCode] * this.exchangeRates[this.rightCurrencyCode];
    }

    private get rtlRate(): number {
      return 1.0 / this.ltrRate;
    }

    private validCode(code): boolean {
      return code != null && this.exchangeRates[code] != null;
    }

    public setAmount(value, direction) {
      if (direction === 'from') {
        this.leftAmount = parseFloat(value);
      }

      if (direction === 'to') {
        this.rightAmount = parseFloat(value);
      }
    }

    public recalcRates(direction) {
      if (this.validCode(this.leftCurrencyCode) && this.validCode(this.rightCurrencyCode)) {
        if (direction === 'from') {
          this.rightAmount = this.leftAmount * this.ltrRate;
        }
        if (direction === 'to') {
          this.leftAmount = this.rightAmount * this.rtlRate;
        }
      }
    }

    public ngOnInit() {
      this.recalcRates('from');
    }
}
