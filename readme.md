# Chronos

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)


Chronos is a lightweight, timezone-aware date and time manipulation library for JavaScript. It provides an intuitive API for parsing, manipulating, and formatting dates and times.

## Features

- Timezone support
- Date parsing and formatting
- Date manipulation (add, subtract)
- Date comparison
- Support for various date units (years, months, days, hours, minutes, seconds)
- Chainable methods for fluent API
- Static methods for common operations
- Translated date formatting

## Installation

You can include Chronos in your project by copying the `chronos.js` file into your project directory.

```html
<script src="path/to/chronos.js"></script>
```

## Usage

### Creating a Chronos instance

```javascript
// Current date and time in UTC
const now = new Chronos();

// From a date string
const date = new Chronos('2023-05-15T12:00:00Z');

// From a timestamp
const timestamp = new Chronos(1684152000000);

// With a specific timezone
const tokyoDate = new Chronos('2023-05-15T12:00:00Z', 'Asia/Tokyo');
```

### Getters

```javascript
const date = new Chronos('2023-05-15T12:30:45Z');

console.log(date.year());    // 2023
console.log(date.month());   // 5
console.log(date.date());    // 15
console.log(date.day());     // 1 (Monday)
console.log(date.hours());   // 12
console.log(date.minutes()); // 30
console.log(date.seconds()); // 45
```

### Modifiers

```javascript
const date = new Chronos('2023-05-15T12:00:00Z');

console.log(date.firstOfMonth().format('YYYY-MM-DD')); // 2023-05-01
console.log(date.lastOfMonth().format('YYYY-MM-DD'));  // 2023-05-31
console.log(date.nthOfMonth(3, 1).format('YYYY-MM-DD')); // 2023-05-15 (3rd Monday)

console.log(date.firstOfQuarter().format('YYYY-MM-DD')); // 2023-04-01
console.log(date.lastOfQuarter().format('YYYY-MM-DD'));  // 2023-06-30

console.log(date.firstOfYear().format('YYYY-MM-DD')); // 2023-01-01
console.log(date.lastOfYear().format('YYYY-MM-DD'));  // 2023-12-31
```

### Formatting

```javascript
const date = new Chronos('2023-05-15T12:30:45Z');
console.log(date.format('YYYY-MM-DD HH:mm:ss')); // 2023-05-15 12:30:45
```

### Translated Formatting

Chronos supports translated date formatting through the `translatedFormat()` method. This allows you to display dates in different languages or custom formats.

```javascript
const date = new Chronos('2023-05-15T14:30:45Z');

// Default formatting (English)
console.log(date.translatedFormat('dddd, MMMM D, YYYY')); // Monday, May 15, 2023

// Custom translations (French)
const frenchTranslations = {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  monthsShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  weekdaysShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  meridiem: (hours, minutes, isLower) => hours < 12 ? (isLower ? 'am' : 'AM') : (isLower ? 'pm' : 'PM')
};

console.log(date.translatedFormat('dddd, D MMMM YYYY', frenchTranslations)); // lundi, 15 mai 2023

// Using various format tokens
console.log(date.translatedFormat('YYYY YY MMMM MMM MM M DD D dddd ddd HH H hh h mm m ss s A a', frenchTranslations));
// 2023 23 mai mai 05 5 15 15 lundi lun. 14 14 02 2 30 30 45 45 PM pm

// Using literals (text within square brackets is not translated)
console.log(date.translatedFormat('[Le] DD MMMM YYYY [à] HH:mm', frenchTranslations)); // Le 15 mai 2023 à 14:30
```

Format tokens:
- `YYYY`: 4-digit year
- `YY`: 2-digit year
- `MMMM`: Full month name
- `MMM`: Short month name
- `MM`: 2-digit month (01-12)
- `M`: 1 or 2-digit month (1-12)
- `DD`: 2-digit day of month (01-31)
- `D`: 1 or 2-digit day of month (1-31)
- `dddd`: Full weekday name
- `ddd`: Short weekday name
- `HH`: 2-digit hour in 24-hour format (00-23)
- `H`: 1 or 2-digit hour in 24-hour format (0-23)
- `hh`: 2-digit hour in 12-hour format (01-12)
- `h`: 1 or 2-digit hour in 12-hour format (1-12)
- `mm`: 2-digit minutes (00-59)
- `m`: 1 or 2-digit minutes (0-59)
- `ss`: 2-digit seconds (00-59)
- `s`: 1 or 2-digit seconds (0-59)
- `A`: Uppercase meridiem (AM/PM)
- `a`: Lowercase meridiem (am/pm)

### Manipulation

```javascript
const date = new Chronos('2023-05-15T12:00:00Z');

console.log(date.add(1, 'day').format('YYYY-MM-DD')); // 2023-05-16
console.log(date.subtract(1, 'month').format('YYYY-MM-DD')); // 2023-04-15
```

### Comparison

```javascript
const date1 = new Chronos('2023-05-15T12:00:00Z');
const date2 = new Chronos('2023-05-16T12:00:00Z');

console.log(date1.isBefore(date2)); // true
console.log(date1.isAfter(date2));  // false
console.log(date1.isSame(date2));   // false
```

### Static Methods

```javascript
// Current date and time
const now = Chronos.now();

// Parse a date string
const parsed = Chronos.parse('2023-05-15T12:00:00Z');
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
