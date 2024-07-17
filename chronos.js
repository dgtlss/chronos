// Chronos JS Library
// version: 1.1.0
// license: MIT
// author: Nathan Langer
// website: chronosjs.com

(function(global) {
  'use strict';

  class Chronos {
    constructor(input, timezone = 'UTC') {
      this._date = this._parseInput(input);
      this._timezone = timezone;
      this._locale = 'en-US'; // Default locale
    }

    _parseInput(input) {
      if (input instanceof Date) return new Date(input);
      if (typeof input === 'string') return new Date(input);
      if (typeof input === 'number') return new Date(input);
      return new Date();
    }

    // Getter methods
    year() { return this._date.getFullYear(); }
    month() { return this._date.getMonth() + 1; }
    date() { return this._date.getDate(); }
    day() { return this._date.getDay(); }
    hours() { return this._date.getHours(); }
    minutes() { return this._date.getMinutes(); }
    seconds() { return this._date.getSeconds(); }
    milliseconds() { return this._date.getMilliseconds(); }
    timestamp() { return Math.floor(this._date.getTime() / 1000); }

    // Manipulation methods
    add(value, unit) {
      const newDate = new Date(this._date);
      switch (unit) {
        case 'years': newDate.setFullYear(newDate.getFullYear() + value); break;
        case 'months': newDate.setMonth(newDate.getMonth() + value); break;
        case 'days': newDate.setDate(newDate.getDate() + value); break;
        case 'hours': newDate.setHours(newDate.getHours() + value); break;
        case 'minutes': newDate.setMinutes(newDate.getMinutes() + value); break;
        case 'seconds': newDate.setSeconds(newDate.getSeconds() + value); break;
        default: throw new Error('Invalid unit');
      }
      return new Chronos(newDate);
    }

    subtract(value, unit) {
      return this.add(-value, unit);
    }

    diffForHumans(other = null, options = {}) {
      const {
        absolute = false,
        short = false,
        parts = 1,
        threshold = 0.9
      } = options;
    
      const now = other ? Chronos.parse(other) : Chronos.now();
      const diff = Math.abs(this.valueOf() - now.valueOf());
      const isFuture = this.valueOf() > now.valueOf();
    
      const units = [
        { name: 'year', seconds: 31536000, short: 'y' },
        { name: 'month', seconds: 2592000, short: 'mo' },
        { name: 'week', seconds: 604800, short: 'w' },
        { name: 'day', seconds: 86400, short: 'd' },
        { name: 'hour', seconds: 3600, short: 'h' },
        { name: 'minute', seconds: 60, short: 'm' },
        { name: 'second', seconds: 1, short: 's' }
      ];
    
      let result = [];
      let remaining = diff / 1000;
    
      for (const unit of units) {
        const count = Math.floor(remaining / unit.seconds);
        if (count >= threshold || result.length > 0) {
          const unitName = count === 1 ? unit.name : `${unit.name}s`;
          const shortUnitName = short ? unit.short : unitName;
          result.push(`${count} ${shortUnitName}`);
          remaining %= unit.seconds;
        }
        if (result.length === parts) break;
      }
    
      if (result.length === 0) {
        return 'just now';
      }
    
      let output = result.join(short ? ' ' : ', ');
    
      if (!absolute) {
        output = isFuture ? `in ${output}` : `${output} ago`;
      }
    
      return output;
    }

    // Shorthand methods for adding and subtracting time
    addYears(years) { return this.add(years, 'years'); }
    addMonths(months) { return this.add(months, 'months'); }
    addDays(days) { return this.add(days, 'days'); }
    addHours(hours) { return this.add(hours, 'hours'); }
    addMinutes(minutes) { return this.add(minutes, 'minutes'); }
    addSeconds(seconds) { return this.add(seconds, 'seconds'); }
    subYears(years) { return this.subtract(years, 'years'); }
    subMonths(months) { return this.subtract(months, 'months'); }
    subDays(days) { return this.subtract(days, 'days'); }
    subHours(hours) { return this.subtract(hours, 'hours'); }
    subMinutes(minutes) { return this.subtract(minutes, 'minutes'); }
    subSeconds(seconds) { return this.subtract(seconds, 'seconds'); }

    // Formatting methods
    format(formatString) {
      const options = {
        timeZone: this._timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: formatString.includes('a') || formatString.includes('A')
      };

      const formatter = new Intl.DateTimeFormat(this._locale, options);
      const parts = formatter.formatToParts(this._date);

      const getPartValue = (type) => {
        const part = parts.find(p => p.type === type);
        return part ? part.value : '';
      };

      const tokens = {
        YYYY: getPartValue('year'),
        YY: getPartValue('year').slice(-2),
        MMMM: new Intl.DateTimeFormat(this._locale, { month: 'long' }).format(this._date),
        MMM: new Intl.DateTimeFormat(this._locale, { month: 'short' }).format(this._date),
        MM: getPartValue('month').padStart(2, '0'),
        M: getPartValue('month'),
        DD: getPartValue('day').padStart(2, '0'),
        D: getPartValue('day'),
        dddd: new Intl.DateTimeFormat(this._locale, { weekday: 'long' }).format(this._date),
        ddd: new Intl.DateTimeFormat(this._locale, { weekday: 'short' }).format(this._date),
        HH: getPartValue('hour').padStart(2, '0'),
        H: getPartValue('hour'),
        hh: (parseInt(getPartValue('hour')) % 12 || 12).toString().padStart(2, '0'),
        h: (parseInt(getPartValue('hour')) % 12 || 12).toString(),
        mm: getPartValue('minute').padStart(2, '0'),
        m: getPartValue('minute'),
        ss: getPartValue('second').padStart(2, '0'),
        s: getPartValue('second'),
        SSS: this.milliseconds().toString().padStart(3, '0'),
        A: getPartValue('dayPeriod').toUpperCase(),
        a: getPartValue('dayPeriod').toLowerCase()
      };

      return formatString.replace(/(\w+)/g, match => tokens[match] || match);
    }

    getMonthName() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[this._date.getMonth()];
    }

    getDayName() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[this._date.getDay()];
    }

    // Comparison methods
    isBefore(other) {
      return this._date < Chronos.parse(other)._date;
    }

    isAfter(other) {
      return this._date > Chronos.parse(other)._date;
    }

    isSame(other) {
      return this._date.getTime() === Chronos.parse(other)._date.getTime();
    }

    isBetween(start, end) {
      const startDate = Chronos.parse(start)._date;
      const endDate = Chronos.parse(end)._date;
      return this._date >= startDate && this._date <= endDate;
    }

    isSameDay(other) {
      const otherDate = Chronos.parse(other);
      return this.year() === otherDate.year() &&
             this.month() === otherDate.month() &&
             this.date() === otherDate.date();
    }

    isSameMonth(other) {
      const otherDate = Chronos.parse(other);
      return this.year() === otherDate.year() && this.month() === otherDate.month();
    }

    isSameYear(other) {
      return this.year() === Chronos.parse(other).year();
    }

    // Utility methods
    isWeekday() {
      const day = this.day();
      return day >= 1 && day <= 5;
    }

    isWeekend() {
      const day = this.day();
      return day === 0 || day === 6;
    }

    isToday() {
      return this.isSameDay(new Date());
    }

    isTomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return this.isSameDay(tomorrow);
    }

    isYesterday() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return this.isSameDay(yesterday);
    }

    isFuture() {
      return this._date > new Date();
    }

    isPast() {
      return this._date < new Date();
    }

    isLeapYear() {
      const year = this.year();
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    quarter() {
      return Math.floor((this.month() - 1) / 3) + 1;
    }

    toDate() {
      return new Date(this._date);
    }

    valueOf() {
      return this._date.getTime();
    }

    toString() {
      return this._date.toISOString();
    }

    toJSON() {
      return this._date.toJSON();
    }
    
    toArray() {
      const date = new Date(this._date.toLocaleString('en-US', { timeZone: this._timezone }));
      return [
        date.getFullYear(),
        date.getMonth() + 1, // JavaScript months are 0-indexed
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ];
    }

    toObject() {
      const date = new Date(this._date.toLocaleString('en-US', { timeZone: this._timezone }));
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript months are 0-indexed
        day: date.getDate(),
        dayOfWeek: date.getDay(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds(),
        timestamp: Math.floor(date.getTime() / 1000),
        timezone: this._timezone
      };
    }

    
    // Static methods
    static now() {
      return new Chronos();
    }

    static parse(input, locale = 'en-US') {
      const chronos = new Chronos(input);
      chronos.setLocale(locale);
      return chronos;
    }

    static closest(dates) {
      if (!Array.isArray(dates) || dates.length === 0) {
        throw new Error('Input must be a non-empty array of dates');
      }

      const now = Chronos.now();
      let closestDate = Chronos.parse(dates[0]);
      let smallestDiff = Math.abs(now.valueOf() - closestDate.valueOf());

      for (let i = 1; i < dates.length; i++) {
        const currentDate = Chronos.parse(dates[i]);
        const currentDiff = Math.abs(now.valueOf() - currentDate.valueOf());

        if (currentDiff < smallestDiff) {
          closestDate = currentDate;
          smallestDiff = currentDiff;
        }
      }

      return closestDate;
    }

    static farthest(dates) {
      if (!Array.isArray(dates) || dates.length === 0) {
        throw new Error('Input must be a non-empty array of dates');
      }

      const now = Chronos.now();
      let farthestDate = Chronos.parse(dates[0]);
      let largestDiff = Math.abs(now.valueOf() - farthestDate.valueOf());

      for (let i = 1; i < dates.length; i++) {
        const currentDate = Chronos.parse(dates[i]);
        const currentDiff = Math.abs(now.valueOf() - currentDate.valueOf());

        if (currentDiff > largestDiff) {
          farthestDate = currentDate;
          largestDiff = currentDiff;
        }
      }

      return farthestDate;
    }

    static today() {
      const now = new Date();
      return new Chronos(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    }

    static tomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return new Chronos(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()));
    }

    static yesterday() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return new Chronos(new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()));
    }

    setLocale(locale) {
      if (typeof locale !== 'string') {
        throw new Error('Locale must be a string');
      }
      try {
        // Test if the locale is valid
        new Intl.DateTimeFormat(locale);
        this._locale = locale;
        return this;
      } catch (e) {
        throw new Error('Invalid locale');
      }
    }

    next(day) {
      return this._moveToDayOfWeek(day, 1);
    }
  
    previous(day) {
      return this._moveToDayOfWeek(day, -1);
    }

    _moveToDayOfWeek(day, direction) {
      const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const targetDay = daysOfWeek.indexOf(day.toLowerCase());
      
      if (targetDay === -1) {
        throw new Error('Invalid day of week');
      }
  
      const currentDay = this._date.getDay();
      let daysToMove = (targetDay - currentDay + 7) % 7;
  
      if (daysToMove === 0) {
        daysToMove = 7; // Move to next week if it's the same day
      }
  
      if (direction === -1) {
        daysToMove = daysToMove === 7 ? 0 : 7 - daysToMove;
      }
  
      const newDate = new Date(this._date);
      newDate.setDate(newDate.getDate() + daysToMove * direction);
  
      return new Chronos(newDate, this._timezone);
    }

    static createFromFormat(format, dateString) {
      const formatTokens = {
        YYYY: '(\\d{4})',
        YY: '(\\d{2})',
        MM: '(\\d{2})',
        M: '(\\d{1,2})',
        DD: '(\\d{2})',
        D: '(\\d{1,2})',
        HH: '(\\d{2})',
        H: '(\\d{1,2})',
        hh: '(\\d{2})',
        h: '(\\d{1,2})',
        mm: '(\\d{2})',
        m: '(\\d{1,2})',
        ss: '(\\d{2})',
        s: '(\\d{1,2})',
        SSS: '(\\d{3})',
        S: '(\\d{1,3})',
        A: '(AM|PM)',
        a: '(am|pm)',
      };

      const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      let regexPattern = escapeRegExp(format);
      const matches = format.match(/\w+/g) || [];
      const parts = {};

      matches.forEach((match) => {
        if (formatTokens[match]) {
          regexPattern = regexPattern.replace(match, formatTokens[match]);
        }
      });

      const regex = new RegExp(`^${regexPattern}$`);
      const values = dateString.match(regex);

      if (!values) {
        throw new Error('Invalid date string for the given format');
      }

      values.shift(); // Remove the full match

      matches.forEach((match, index) => {
        parts[match] = values[index];
      });

      let year = parts.YYYY ? parseInt(parts.YYYY) :
                 parts.YY ? (parseInt(parts.YY) + 2000) : new Date().getFullYear();
      const month = parseInt(parts.MM || parts.M || 1) - 1;
      const day = parseInt(parts.DD || parts.D || 1);
      let hour = parseInt(parts.HH || parts.H || parts.hh || parts.h || 0);
      const minute = parseInt(parts.mm || parts.m || 0);
      const second = parseInt(parts.ss || parts.s || 0);
      const millisecond = parseInt(parts.SSS || parts.S || 0);

      // Adjust for AM/PM
      if ((parts.A === 'PM' || parts.a === 'pm') && hour < 12) {
        hour += 12;
      } else if ((parts.A === 'AM' || parts.a === 'am') && hour === 12) {
        hour = 0;
      }

      const chronos = new Chronos(new Date(year, month, day, hour, minute, second, millisecond));
      chronos.setLocale(locale);
      return chronos;
    }

    static createFromTimestamp(timestamp) {
      if (typeof timestamp !== 'number' || isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
      }
      return new Chronos(new Date(timestamp * 1000));
    }



    static createFromTimestampMs(timestampMs) {
      if (typeof timestampMs !== 'number' || isNaN(timestampMs)) {
        throw new Error('Invalid timestamp');
      }
      return new Chronos(new Date(timestampMs));
    }

    static makeDateTimeString(timestamp) {
      return new Chronos(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
  }

  // Make Chronos available globally
  global.Chronos = Chronos;

})(typeof window !== 'undefined' ? window : this);