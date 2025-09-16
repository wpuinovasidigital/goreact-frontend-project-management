import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const TZ_ASIA_JAKARTA = 'Asia/Jakarta';

dayjs.extend(utc);
dayjs.extend(timezone);

const datetime = {
  format(dateValue, format = 'DD/MM/YYYY') {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).format(format);
  },
  getIsoString(dateValue) {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).toISOString();
  },
};

export default datetime;
