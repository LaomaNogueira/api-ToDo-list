export function datePrototypeConfig() {

    Date.prototype.toISOString = function(): string {
        const addZero = (n: number) => n < 10 ? ('0' + n) : n;

        const year = this.getFullYear();
        const month = addZero(this.getMonth() + 1);
        const date = addZero(this.getDate());
        const hour = addZero(this.getHours());
        const minute = addZero(this.getMinutes());
        const second = addZero(this.getSeconds());
        const millisecond = this.getMilliseconds();

        return `${year}-${month}-${date}T${hour}:${minute}:${second}.${millisecond}`;
    };
}
