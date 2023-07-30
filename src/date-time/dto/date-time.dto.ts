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

  static getTimezoneOffset(timezone: string): number {
    return DateTimeDto.timezoneOffsetMap[timezone];
  }

  static getTimeZoneList(): string[] {
    return Object.keys(DateTimeDto.timezoneOffsetMap);
  }

  strDate: string;
  offset: number;
  timezone: string;
  timestamp: number;
  dayOfWeek: string;

  static timezoneOffsetMap = {
    'America/Bahia_Banderas': -6, // Update the offset as needed
    'America/Cancun': -5,
    'America/Chihuahua': -6,
    'America/Ciudad_Juarez': -6,
    'America/Ensenada': -7,
    'America/Hermosillo': -7,
    'America/Matamoros': -5,
    'America/Mazatlan': -6,
    'America/Merida': -6,
    'America/Mexico_City': -6,
    'America/Monterrey': -6,
    'America/Ojinaga': -6,
    'America/Santa_Isabel': -8,
    'America/Tijuana': -7,
  };

  static prependZero(time) {
    return time < 10 ? `0${time}` : time;
  }
}
