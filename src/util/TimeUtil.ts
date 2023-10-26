export default class TimeUtil{
    static dateToYMD(date:Date) {
        const d = date.getDate();
        const m = date.getMonth() + 1; //Month from 0 to 11
        const y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    static dateToDateOfYearAndTimeString(dateStr:string){
        return this.dateToDateOfYearAndTime(new Date(dateStr));
    }

    static dateToDateOfYearAndTime(date:Date){
        const day = date.getDate();
        const month = date.getMonth() + 1; //Month from 0 to 11
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return this.leadingZero(hours)+':'+this.leadingZero(minutes)+" "+this.leadingZero(day)+'.'+this.leadingZero(month);
    }

    static leadingZero(num:number){
        return num<10 ? '0'+num : ''+num;
    }
}