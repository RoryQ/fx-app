import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { Currency } from './currency';

@Component({
  selector: 'fx-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
    @Input() availableRates: Array<Currency> = [];

    public dropdownItems: Array<Currency>;

    private _selectedCurrencyCode:string;
    @Input() set selectedCurrencyCode(val: string) {
        this._selectedCurrencyCode = val;
        this.handleFilter(val || "");
        this.changed.emit(val);
    }

    get selectedCurrencyCode() {
        return this._selectedCurrencyCode;
    }

    @Output() changed:  EventEmitter<any> = new EventEmitter();

    @Input() amountValue: number;

    ngOnInit() {
        this.dropdownItems = this.availableRates.slice();
    }

    handleFilter(value) {
        this.dropdownItems = this.availableRates.filter((s) => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}
