export class Currency {
    constructor(
        public name: string,
        public code: string ) {}

    get displayName(): string {
        return `${this.name} - ${this.code}`;
    }
}