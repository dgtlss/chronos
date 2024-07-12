// Chronos JS Library
// version: 1.1.0
// license: MIT
// author: Nathan Langer
// website: chronosjs.com

(function(global) {
  'use strict';

  class Chronos {
    constructor(input) {
      this._date = this._parseInput(input);
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
      const tokens = {
        YYYY: this.year(),
        YY: this.year() % 100,
        MMMM: this.getMonthName(),
        MMM: this.getMonthName().slice(0, 3),
        MM: String(this.month()).padStart(2, '0'),
        M: this.month(),
        DD: String(this.date()).padStart(2, '0'),
        D: this.date(),
        dddd: this.getDayName(),
        ddd: this.getDayName().slice(0, 3),
        HH: String(this.hours()).padStart(2, '0'),
        H: this.hours(),
        hh: String(this.hours() % 12 || 12).padStart(2, '0'),
        h: this.hours() % 12 || 12,
        mm: String(this.minutes()).padStart(2, '0'),
        m: this.minutes(),
        ss: String(this.seconds()).padStart(2, '0'),
        s: this.seconds(),
        SSS: String(this.milliseconds()).padStart(3, '0'),
        A: this.hours() < 12 ? 'AM' : 'PM',
        a: this.hours() < 12 ? 'am' : 'pm'
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

    // Static methods
    static now() {
      return new Chronos();
    }

    static parse(input) {
      return new Chronos(input);
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

      return new Chronos(new Date(year, month, day, hour, minute, second, millisecond));
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