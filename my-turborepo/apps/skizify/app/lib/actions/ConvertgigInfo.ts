import { GigsInterface } from "../../(dashboard)/explore/page";

export interface Datetimepackage {
  startDATEmonth: string | undefined;
  startDATEday: number | undefined;
  endDATEmonth: string | undefined;
  endDATEday: number | undefined;
  sessionTime: string;
  startTime: string;
  endTime: string;
  timeneeded: number | undefined;
}

//BEFORE UPDATING FUNCTION or DB UPDATE GigsInterface and Datetimepackage

export function Month(date : Date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }
export function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  }

export function SessionTime(timeneeded: number ) {
  return timeneeded === 30 ? "30 min" :
         timeneeded === 45 ? "45 min" : 
         "1 Hr";
}
