import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysface: document.querySelector('span[data-days]'),
  hoursface: document.querySelector('span[data-hours]'),
  minutesface: document.querySelector('span[data-minutes]'),
  secondsface: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.input.addEventListener('click', flatpickr);
refs.startBtn.addEventListener('click', () => timer.start());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.init({
        clickToClose: true,
        useIcon: false,
      });
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const ms = fp.selectedDates[0] - currentTime;
      const timer = convertMs(ms);
      if (ms <= 0) {
        clearInterval(intervalId);
      }
      updateTimer(timer);
    }, 1000);
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysface.textContent = `${days}`;
  refs.hoursface.textContent = `${hours}`;
  refs.minutesface.textContent = `${minutes}`;
  refs.secondsface.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
