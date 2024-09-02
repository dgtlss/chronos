# Chronos

Chronos is a powerful and user-friendly JavaScript library for working with dates and times. It provides an intuitive API for parsing, manipulating, and formatting dates, making it easier to handle complex date-related operations in your projects.

## Getting Started

To use Chronos in your project, include the `chronos.js` file in your HTML:

```html
<script src="path/to/chronos.js"></script>
```

## Creating a Chronos Object

You can create a new Chronos object in several ways:

```javascript
// Current date and time
const now = new Chronos();

// From a date string
const date = new Chronos('2023-05-15T12:00:00Z');

// From a timestamp (milliseconds since epoch)
const timestamp = new Chronos(1684152000000);

// With a specific timezone
const tokyoDate = new Chronos('2023-05-15T12:00:00Z', 'Asia/Tokyo');
```

## Core Methods

### Getter Methods

These methods return specific parts of the date:

- `year()`: Returns the year (e.g., 2023)
- `month()`: Returns the month (1-12)
- `date()`: Returns the day of the month (1-31)
- `day()`: Returns the day of the week (0-6, where 0 is Sunday)
- `hours()`: Returns the hour (0-23)
- `minutes()`: Returns the minutes (0-59)
- `seconds()`: Returns the seconds (0-59)
- `milliseconds()`: Returns the milliseconds (0-999)
- `timestamp()`: Returns the Unix timestamp (seconds since epoch)

Example:
```javascript
const date = new Chronos('2023-05-15T12:30:45Z');
console.log(date.year());  // 2023
console.log(date.month()); // 5
console.log(date.date());  // 15
```

### Manipulation Methods

These methods allow you to modify the date:

- `add(value, unit)`: Adds a specified amount of time
- `subtract(value, unit)`: Subtracts a specified amount of time

Units can be: 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'

Example:
```javascript
const date = new Chronos('2023-05-15T12:00:00Z');
console.log(date.add(1, 'day').format('YYYY-MM-DD')); // 2023-05-16
console.log(date.subtract(2, 'hours').format('YYYY-MM-DD HH:mm')); // 2023-05-15 10:00
```

### Formatting Methods

- `format(formatString)`: Formats the date according to the specified format string
- `translatedFormat(formatString, translations)`: Formats the date with translated month and day names

Format tokens:
- `YYYY`: 4-digit year
- `MM`: 2-digit month
- `DD`: 2-digit day of month
- `HH`: 2-digit hour (24-hour format)
- `mm`: 2-digit minutes
- `ss`: 2-digit seconds

Example:
```javascript
const date = new Chronos('2023-05-15T12:30:45Z');
console.log(date.format('YYYY-MM-DD HH:mm:ss')); // 2023-05-15 12:30:45
```

### Comparison Methods

These methods allow you to compare dates:

- `isBefore(other)`: Checks if the date is before another date
- `isAfter(other)`: Checks if the date is after another date
- `isSame(other)`: Checks if the date is the same as another date
- `isBetween(start, end)`: Checks if the date is between two other dates
- `isSameDay(other)`: Checks if the date is on the same day as another date
- `isSameMonth(other)`: Checks if the date is in the same month as another date
- `isSameYear(other)`: Checks if the date is in the same year as another date

Example:
```javascript
const date1 = new Chronos('2023-05-15T12:00:00Z');
const date2 = new Chronos('2023-05-16T12:00:00Z');
console.log(date1.isBefore(date2)); // true
console.log(date1.isSameDay(date2)); // false
```

### Utility Methods

These methods provide additional information about the date:

- `isWeekday()`: Checks if the date is a weekday (Monday-Friday)
- `isWeekend()`: Checks if the date is a weekend (Saturday or Sunday)
- `isToday()`: Checks if the date is today
- `isTomorrow()`: Checks if the date is tomorrow
- `isYesterday()`: Checks if the date is yesterday
- `isFuture()`: Checks if the date is in the future
- `isPast()`: Checks if the date is in the past
- `isLeapYear()`: Checks if the year is a leap year
- `quarter()`: Returns the quarter of the year (1-4)

Example:
```javascript
const date = new Chronos('2023-05-15T12:00:00Z');
console.log(date.isWeekday()); // true
console.log(date.isLeapYear()); // false
```

### Conversion Methods

These methods convert the Chronos object to other formats:

- `toDate()`: Converts to a JavaScript Date object
- `valueOf()`: Returns the timestamp in milliseconds
- `toString()`: Returns the date as an ISO string
- `toJSON()`: Returns the date in JSON format
- `toArray()`: Returns the date components as an array
- `toObject()`: Returns the date components as an object

Example:
```javascript
const date = new Chronos('2023-05-15T12:00:00Z');
console.log(date.toArray()); // [2023, 5, 15, 12, 0, 0, 0]
console.log(date.toObject()); // { year: 2023, month: 5, day: 15, ... }
```

### Advanced Methods

- `diffForHumans(other, options)`: Returns a human-readable difference between dates
- `duration(other)`: Calculates the duration between two dates
- `addBusinessDays(days)`: Adds a number of business days to the date
- `startOf(unit)`: Returns the start of a unit of time (year, month, day, hour)
- `endOf(unit)`: Returns the end of a unit of time (year, month, day, hour)

Example:
```javascript
const date1 = new Chronos('2023-05-15T12:00:00Z');
const date2 = new Chronos('2023-05-20T12:00:00Z');
console.log(date1.diffForHumans(date2)); // 5 days ago
console.log(date1.duration(date2)); // { days: 5, hours: 0, minutes: 0, seconds: 0 }
```

## Static Methods

These methods are called on the Chronos class itself:

- `Chronos.now(timezone)`: Returns a Chronos object for the current date and time
- `Chronos.parse(input, timezone)`: Parses a date string or timestamp
- `Chronos.createFromFormat(format, dateString)`: Creates a Chronos object from a specific date format
- `Chronos.createFromTimestamp(timestamp)`: Creates a Chronos object from a Unix timestamp
- `Chronos.createFromTimestampMs(timestampMs)`: Creates a Chronos object from a timestamp in milliseconds
- `Chronos.generateCalendar(year, month)`: Generates a calendar array for a given year and month

Example:
```javascript
const now = Chronos.now();
const parsed = Chronos.parse('2023-05-15T12:00:00Z');
const calendar = Chronos.generateCalendar(2023, 5);
```

## Contributing

We welcome contributions to Chronos! If you have any suggestions or improvements, please feel free to submit a pull request.
