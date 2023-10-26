export default class TimeUtil{
    static dateToYMD(date:Date) {
        const d = date.getDate();
        const m = date.getMonth() + 1; //Month from 0 to 11
        const y = date.getFullYear();
        return y + '-' + this.leadingZero(m) + '-' + this.leadingZero(d);
    }

    static dateToDateOfYearAndTimeString(dateStr:string){
        return this.dateToDateOfYearAndTime(new Date(dateStr));
    }

    static dateToTime(date:Date){
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return this.leadingZero(hours) + ':' + this.leadingZero(minutes);
    }

    static dateToDateOfYearAndTime(date:Date){
        const day = date.getDate();
        const month = date.getMonth() + 1; //Month from 0 to 11
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return this.leadingZero(hours)+':'+this.leadingZero(minutes)+" "+this.leadingZero(day)+'.'+this.leadingZero(month);
    }

    static leadingZero(num:number){
        return num < 10 ? '0' + num : '' + num;
    }
}