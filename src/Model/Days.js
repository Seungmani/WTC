import Static from "../Static/Static";

class Days {

	#lastDay;
	#dayOfTheWeek = {};
	#statutoryHoliday;
	#weekTonumber;

	constructor(month, startDay) {
		this.#validateNormalDays(startDay);
		this.#setStatutoryHoliday(month);
		this.#lastDay = this.#setLastDay(month);
		this.#weekTonumber = this.#setWeekToNumber(startDay)
		this.#setDayOfTheWeek(this.#lastDay);;
	}

	// 요일이 정상인가?
	#validateNormalDays(startDay) {
		if (!Static.DAYS.includes(startDay)) {
			throw new Error("[ERROR] 월, 화, 수, 목, 금, 토, 일 중 입력하세요");
		}
	}

	// 법정 공휴일 지정
	#setStatutoryHoliday(month) {
		const containHolidayMonth = Object.keys(Static.STATUTORY_HOLIDAYS)
		if (containHolidayMonth.includes(month)) {
			this.#statutoryHoliday = Static.STATUTORY_HOLIDAYS.month
		}
	}

	// 마지막 날 정함
	#setLastDay(month) {
		return Static.EACH_MONTH_DAY[month-1];
	}

	// 요일을 숫자로 저장
	#setWeekToNumber(startDay) {
		const days = [...Static.DAYS, ...Static.DAYS];
		const weekTonumber = {}
    let dayIndex = days.indexOf(startDay);

		for(let i=1; i<=7; i++) {
			const x = i%7;
			weekTonumber[x] = days[dayIndex];
			dayIndex++;
		}
		return weekTonumber;
	}

	// 1-월 과 같이 요일 설정
	#setDayOfTheWeek(lastDay) {
		let index = 1;
		while(index <= lastDay) {
      Object.entries(this.#weekTonumber).filter((v) => {
        if(v[0] === String(index%7)) {
					this.#dayOfTheWeek[index]= v[1];
        } 
      });
			index++;
		}
	}

	getStatutoryHoliday() {
		return this.#statutoryHoliday;
	}

	getDayOfTheWeek() {
		return this.#dayOfTheWeek;
	}
}

export default Days;