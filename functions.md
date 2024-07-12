# Chronos Library Function Checklist

- [ ] Constructor
```javascript
const date = new Chronos('2023-07-12');
console.log(date.toString());
```

- [ ] year()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.year());
```

- [ ] month()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.month());
```

- [ ] date()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.date());
```

- [ ] day()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.day());
```

- [ ] hours()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.hours());
```

- [ ] minutes()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.minutes());
```

- [ ] seconds()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.seconds());
```

- [ ] milliseconds()
```javascript
const date = new Chronos('2023-07-12T15:30:45.123');
console.log(date.milliseconds());
```

- [ ] timestamp()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.timestamp());
```

- [ ] add()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.add(1, 'days').toString());
```

- [ ] subtract()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.subtract(1, 'months').toString());
```

- [ ] addYears()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.addYears(1).toString());
```

- [ ] addMonths()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.addMonths(1).toString());
```

- [ ] addDays()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.addDays(1).toString());
```

- [ ] addHours()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.addHours(2).toString());
```

- [ ] addMinutes()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.addMinutes(30).toString());
```

- [ ] addSeconds()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.addSeconds(15).toString());
```

- [ ] subYears()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.subYears(1).toString());
```

- [ ] subMonths()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.subMonths(1).toString());
```

- [ ] subDays()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.subDays(1).toString());
```

- [ ] subHours()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.subHours(2).toString());
```

- [ ] subMinutes()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.subMinutes(30).toString());
```

- [ ] subSeconds()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.subSeconds(15).toString());
```

- [ ] format()
```javascript
const date = new Chronos('2023-07-12T15:30:45');
console.log(date.format('YYYY-MM-DD HH:mm:ss'));
```

- [ ] getMonthName()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.getMonthName());
```

- [ ] getDayName()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.getDayName());
```

- [ ] isBefore()
```javascript
const date1 = new Chronos('2023-07-12');
const date2 = new Chronos('2023-07-13');
console.log(date1.isBefore(date2));
```

- [ ] isAfter()
```javascript
const date1 = new Chronos('2023-07-12');
const date2 = new Chronos('2023-07-11');
console.log(date1.isAfter(date2));
```

- [ ] isSame()
```javascript
const date1 = new Chronos('2023-07-12');
const date2 = new Chronos('2023-07-12');
console.log(date1.isSame(date2));
```

- [ ] isBetween()
```javascript
const date = new Chronos('2023-07-12');
const start = new Chronos('2023-07-01');
const end = new Chronos('2023-07-31');
console.log(date.isBetween(start, end));
```

- [ ] isSameDay()
```javascript
const date1 = new Chronos('2023-07-12T10:00:00');
const date2 = new Chronos('2023-07-12T15:30:00');
console.log(date1.isSameDay(date2));
```

- [ ] isSameMonth()
```javascript
const date1 = new Chronos('2023-07-12');
const date2 = new Chronos('2023-07-25');
console.log(date1.isSameMonth(date2));
```

- [ ] isSameYear()
```javascript
const date1 = new Chronos('2023-07-12');
const date2 = new Chronos('2023-12-31');
console.log(date1.isSameYear(date2));
```

- [ ] isWeekday()
```javascript
const date = new Chronos('2023-07-12'); // A Wednesday
console.log(date.isWeekday());
```

- [ ] isWeekend()
```javascript
const date = new Chronos('2023-07-15'); // A Saturday
console.log(date.isWeekend());
```

- [ ] isToday()
```javascript
const date = Chronos.now();
console.log(date.isToday());
```

- [ ] isTomorrow()
```javascript
const tomorrow = Chronos.now().addDays(1);
console.log(tomorrow.isTomorrow());
```

- [ ] isYesterday()
```javascript
const yesterday = Chronos.now().subDays(1);
console.log(yesterday.isYesterday());
```

- [ ] isFuture()
```javascript
const futureDate = Chronos.now().addDays(1);
console.log(futureDate.isFuture());
```

- [ ] isPast()
```javascript
const pastDate = Chronos.now().subDays(1);
console.log(pastDate.isPast());
```

- [ ] isLeapYear()
```javascript
const leapYear = new Chronos('2024-01-01');
const nonLeapYear = new Chronos('2023-01-01');
console.log(leapYear.isLeapYear(), nonLeapYear.isLeapYear());
```

- [ ] quarter()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.quarter());
```

- [ ] toDate()
```javascript
const chronosDate = new Chronos('2023-07-12');
const jsDate = chronosDate.toDate();
console.log(jsDate instanceof Date);
```

- [ ] valueOf()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.valueOf());
```

- [ ] toString()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.toString());
```

- [ ] toJSON()
```javascript
const date = new Chronos('2023-07-12');
console.log(date.toJSON());
```

- [ ] Chronos.now()
```javascript
const now = Chronos.now();
console.log(now.toString());
```

- [ ] Chronos.parse()
```javascript
const date = Chronos.parse('2023-07-12');
console.log(date.toString());
```

- [ ] Chronos.today()
```javascript
const today = Chronos.today();
console.log(today.toString());
```

- [ ] Chronos.tomorrow()
```javascript
const tomorrow = Chronos.tomorrow();
console.log(tomorrow.toString());
```

- [ ] Chronos.yesterday()
```javascript
const yesterday = Chronos.yesterday();
console.log(yesterday.toString());
```

- [ ] Chronos.createFromFormat()
```javascript
const date = Chronos.createFromFormat('YYYY-MM-DD', '2023-07-12');
console.log(date.toString());
```

- [ ] Chronos.createFromTimestamp()
```javascript
const date = Chronos.createFromTimestamp(1689163845); // 2023-07-12 15:30:45 UTC
console.log(date.toString());
```

- [ ] Chronos.createFromTimestampMs()
```javascript
const date = Chronos.createFromTimestampMs(1689163845000); // 2023-07-12 15:30:45 UTC
console.log(date.toString());
```

- [ ] Chronos.makeDateTimeString()
```javascript
const dateString = Chronos.makeDateTimeString(1689163845000);
console.log(dateString);
```