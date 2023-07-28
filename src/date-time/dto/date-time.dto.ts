export class DateTimeDto {
  constructor(timestamp: number | undefined) {
    this.timestamp = timestamp ? timestamp : new Date().getTime();
  }
  strTime: string;

  static timestampToDateTime(
    timestamp: number,
    timezone = 'America/Monterrey',
  ): DateTimeDto {
    const date = new Date(timestamp);
    const offset = DateTimeDto.timezoneOffsetMap[timezone];
    const tzDifference = offset * 60 + date.getTimezoneOffset();
    const d = new Date(date.getTime() + tzDifference * 60 * 1000),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    const dateTime = new DateTimeDto(timestamp);
    dateTime.strDate = `${year}-${this.prependZero(month)}-${this.prependZero(
      day,
    )}`;
    dateTime.strTime = d.toLocaleTimeString('en-US');
    dateTime.offset = offset;
    dateTime.timezone = timezone;
    dateTime.dayOfWeek = d
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    return dateTime;
  }

  static DateToTimestamp(strDate: string, timezone: string){
    const date = new Date(strDate);
    const offset = DateTimeDto.timezoneOffsetMap[timezone];
    const tzDifference = offset * 60 + date.getTimezoneOffset();
    const d = new Date(date.getTime() + tzDifference * 60 * 1000);
    return d.getTime();
  }
  strDate: string;
  offset: number;
  timezone: string;
  timestamp: number;
  dayOfWeek: string;

  static timezoneOffsetMap = {
    'America/Monterrey': -6,
    'America/Chicago': -5,
    'America/New_York': -4,
    'America/Los_Angeles': -7,
    'America/Phoenix': -7,
    'America/Denver': -6,
    'America/Anchorage': -8,
    'America/Adak': -9,
    'Pacific/Honolulu': -10,
    'Pacific/Guam': 10,
    'America/Cancun': -5,
  };

  static prependZero(time) {
    return time < 10 ? `0${time}` : time;
  }
}
