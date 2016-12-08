import { Component, OnInit} from '@angular/core';
import { Currency } from './currency';
import { FxRatesService } from './fx-rates.service';
import {Dictionary} from './util-types';
import './rxjs-operators';

@Component({
  selector: 'sources-panel',
  templateUrl: 'sources-panel.component.html',
  styles: [`
  `]
})
export class SourcesPanelComponent implements OnInit {
    public availableCurrencies: Currency[];
    public spotRates: Dictionary<number>;
    public errorMessage: string;
    private _leftAmount: number = 100;
    private _rightAmount: number = 100;

    public leftCurrencyCode: string;
    public rightCurrencyCode: string;

    constructor(private fxService: FxRatesService){}

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

    private get ltrRate(): number {
      if (this.leftCurrencyCode === this.fxService.base){
        return this.spotRates[this.rightCurrencyCode];
      }

      if (this.rightCurrencyCode === this.fxService.base){
        return 1.0 / this.spotRates[this.leftCurrencyCode];
      }

      return 1.0 / this.spotRates[this.leftCurrencyCode] * this.spotRates[this.rightCurrencyCode];
    }

    private get rtlRate(): number {
      return 1.0 / this.ltrRate;
    }

    private validCode(code): boolean {
      return code != null && this.spotRates[code] != null;
    }

    public setAmount(value, direction) {
      if (isNaN(Number(value))) {
        return;
      }

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

    private getRatesAndCurrencies() {
      this.fxService.getRates().subscribe(
        ratesTuple => {
          this.spotRates = ratesTuple[0];
          this.availableCurrencies = ratesTuple[1];
        },
        error => this.errorMessage = <any>error
        );
    }

    public ngOnInit() {
      this.getRatesAndCurrencies();
      this.recalcRates('from');
    }
}
