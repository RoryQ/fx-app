import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from './currency';

@Component({
  selector: 'fx-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
    @Input()
    availableRates: Array<Currency> = [];

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

    ngOnInit() {
        this.dropdownItems = this.availableRates.slice();
    }

    handleFilter(value) {
        this.dropdownItems = this.availableRates.filter((s) => s.displayName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}
