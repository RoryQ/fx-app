import { Component } from '@angular/core';

@Component({
  selector: 'source-panel',
  templateUrl: './source-panel.component.html',
  styleUrls: ['./source-panel.component.scss']
})
export class SourcePanelComponent {
    public source: Array<{ text: string, code: string }> = [
        { text: "Euro - EUR", code: "EUR" },
        { text: "Pounds Sterling - GBP", code: "GBP" },
        { text: "US Dollars - USD", code: "USD" }
    ];

    public label: string = "Amount:";
    
    public data: Array<{ text: string, code: string}>;

    constructor() {
        this.data = this.source.slice();
    }

    handleFilter(value) {
        this.data = this.source.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}
