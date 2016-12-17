import { Input, Component, Output, EventEmitter} from '@angular/core';
import { Currency } from './currency';

@Component({
  selector: 'fx-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent {
    private _availableCurrencies: Currency[];

    @Input()
    public set availableCurrencies(val: Array<Currency>){
        this._availableCurrencies = val || new Array<Currency>(0);
        this.dropdownItems = this._availableCurrencies.slice();
    }

    public dropdownItems: Array<Currency>;

    private _selectedCurrencyCode: string;
    public get selectedCurrencyCode(): string {
        return this._selectedCurrencyCode;
    }

    @Output() selectedCurrencyCodeChange2: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public set selectedCurrencyCode(val: string) {
        this._selectedCurrencyCode = val;
        this.selectedCurrencyCodeChange2.emit(val);
    }

    @Input()
    amountValue: number;

    handleFilter(value) {
        this.dropdownItems = this._availableCurrencies.filter((s) => s.displayName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}
