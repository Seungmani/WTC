import Static from "../Static/Static";

class Days {

	#lastDay;
	#dayOfTheWeek = {};
	#holiday = [];
	#weekTonumber;
	#statutoryHoliday = [];

	constructor(month, startDay) {
		this.#validateNormalDays(startDay);
		this.#setStatutoryHoliday(month);
		this.#lastDay = this.#setLastDay(month);
		this.#weekTonumber = this.#setWeekToNumber(startDay)
		this.#setDayOfTheWeek(this.#lastDay);
		this.#setHoliday();
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
			this.#statutoryHoliday.push(Static.STATUTORY_HOLIDAYS[month]);
		}
	}

	#setHoliday() {
		Object.entries(this.#dayOfTheWeek).map((day) => {
			const dayString = day[1]
			if (dayString=== "토" || dayString === "일") {
				this.#holiday.push(Number(day[0]));
			}
		});
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

		Static.DAYS.map((day, index) => {
			const week = index%7;
			weekTonumber[week] = days[dayIndex];
			dayIndex++;
		});
		return weekTonumber;
	}

	// 1-월 과 같이 요일 설정
	#setDayOfTheWeek(lastDay) {
		let index = 0;
		while(index <= lastDay) {
      Object.entries(this.#weekTonumber).filter((v) => {
        if(v[0] === String(index%7)) {
					this.#dayOfTheWeek[index+1] = v[1];
        } 
      });
			index++;
		}
	}

	getHoliday() {
		return this.#holiday;
	}

	getDayOfTheWeek() {
		return this.#dayOfTheWeek;
	}

	getLastDay() {
		return this.#lastDay;
	}

	getStatutoryHoliday() {
		return this.#statutoryHoliday;
	}
}

export default Days;