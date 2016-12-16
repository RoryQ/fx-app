import {Injectable} from '@angular/core';
import {Currency} from './currency';
import {Observable} from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import {Dictionary} from './util-types';

const parseString = require('xml2js').parseString;
const cc = require('currency-codes');

@Injectable()
export class FxRatesService {
    _ecbUrl: string = './eurofxref-daily.xml';

    constructor(private http: Http) { }

    getRates(): Observable<[Dictionary<number>, Currency[]]> {
        return this.http.get(this._ecbUrl)
            .map(this.dailyRatesXmlToRates)
            .catch(this.handleError);
    }

    dailyRatesXmlToRates(xmlString): [Dictionary<number>, Currency[]] {
        const currencies: Currency[] = new Array<Currency>();
        const rates = {'EUR': 1};
        currencies.push(new Currency(cc.code('EUR').currency, 'EUR'));

        parseString(xmlString.text(), function XmlToRates(err, result){
            const xmlRates = result['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'];

            for (let rate of xmlRates){
                let ccode = rate['$']['currency']
                rates[ccode] = +rate['$']['rate'];
                currencies.push(new Currency(cc.code(ccode).currency, ccode));
            }
        });
    return [rates, currencies];
    }

    resolveCurrencies(currencies: Currency[]){};

    getAvailableCurrencies(): Promise<Currency[]> {
        return new Promise<Currency[]>((resolve, reject) => {
            resolve = this.resolveCurrencies;
        });
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    get base(): string {
        return 'EUR';
    }
}