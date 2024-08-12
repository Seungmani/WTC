import InputViews from "../VIews/InputViews";
import OutputViews from "../VIews/OutputViews";
import Days from "../Model/Days";
import Month from "../Model/Month";
import Worker from "../Model/Worker";
import { EOL as LINE_SEPARATOR } from "os";
class Controller {

	#month;
	#startDay;
	#weekDayWorker;
	#dayOffWorker;

	constructor() {
	}
	
	#validateMonthAnsStartDayIInputForm(input) {
		const reg = /^\d{1,2},{1}[ㄱ-ㅎ|가-힣]{1}$/; // 숫자 1~2자리 + ',' 한 자리 + 문자 한자리 검증
		if (!reg.test(input)) {
			throw new Error("[ERROR] 숫자 , 한글 형태로 입력해주세요. 다시 입력");
		}
	}

	async #inputMonthAndStartDay() {
		while(true) {
			try {
				const inputMonthAndStartDay = await InputViews.readMontAndStartDay();
				console.log(inputMonthAndStartDay);
				this.#validateMonthAnsStartDayIInputForm(inputMonthAndStartDay);
				this.#setMonthAndStartDay(inputMonthAndStartDay);
				break;
			} catch (error) {
				OutputViews.printError(error.message);
			}
		}
	}

	#setMonthAndStartDay(inputMonthAndStartDay) {
		const [month, startDay] = inputMonthAndStartDay.split(",");
		this.#month = new Month(month);
		this.#startDay = new Days(month, startDay);
	}

	async #setWeekDayWorker() {
		while(true) {
			try {
				const inputWorker = await InputViews.readWeekDayWorker();
				this.#weekDayWorker = new Worker(inputWorker, "day").getDayWorker();
				break;
			} catch(error) {
				OutputViews.printError(error.message);
			}
		}
	}

	async #setDayOffWorker() {
		while(true) {
			try {
				const inputWorker = await InputViews.readWeekDayWorker();
				this.#dayOffWorker = new Worker(inputWorker, "dayOff").getDayOffWorker();
				break;
			} catch(error) {
				OutputViews.printError(error.message);
			}
		}
	}

	printSchedule () {
		const month = this.#month.getMonth();
		const holiday = [...this.#startDay.getHoliday(), ...this.#startDay.getStatutoryHoliday()].flat();
		const statutoryHoliday = this.#startDay.getStatutoryHoliday();
		const allDayOfWeek = this.#startDay.getDayOfTheWeek();
		const lastDay = this.#startDay.getLastDay();
		const weekDayWorker = this.#weekDayWorker;
		const dayOffWorker = this.#dayOffWorker;

		let weekdayIndex = 0;
		let dayOffIndex = 0;
		let day = 1;

		const weekDaySchedule = this.#setWeekWorker (allDayOfWeek, holiday, weekDayWorker, weekdayIndex);
		const holiDaySchedule = this.#setDayOffSchedule (allDayOfWeek, holiday, dayOffWorker, dayOffIndex);

		this.#setWeekWorker (holiday, weekDayWorker, weekdayIndex)

		const schedule = this.setSchedule(
			day,
			lastDay,
			holiday,
			holiDaySchedule,
			weekDaySchedule
		); 

		for(let days of Object.entries(allDayOfWeek)) {
			OutputViews.printSchedule(`${month}월 ${days[0]}일 ${days[1]} ${statutoryHoliday}${schedule.shift()}`);
		}
	}

	#setDayOffSchedule(allDayOfWeek,holiday, dayOffWorker, dayOffIndex) {
		const holiDaySchedule = [];
		Object.entries(allDayOfWeek).map((value) => {
			if (holiday.includes(Number(value[0]))) {
				holiDaySchedule.push(dayOffWorker[dayOffIndex]);
				dayOffIndex++;
				if (dayOffIndex > dayOffWorker.length) {
					dayOffIndex = dayOffIndex % dayOffWorker.length;
				}
			}
		});
		return holiDaySchedule;
	}

	#setWeekWorker(allDayOfWeek, holiday, weekDayWorker, weekdayIndex) {
		const weekDaySchedule = [];
		Object.entries(allDayOfWeek).map((value) => {
			if (!holiday.includes(Number(value[0]))) {
				weekDaySchedule.push(weekDayWorker[weekdayIndex]);
				weekdayIndex++;
				if (weekdayIndex > weekDayWorker.length) {
					weekdayIndex = weekdayIndex % weekDayWorker.length;
				}
			};
		});

		return weekDaySchedule;
	}

	setSchedule(			
		day,
		lastDay,
		holiday,
		holiDaySchedule,
		weekDaySchedule) 
		{
		const schedule = []
		while(day <= lastDay) {
			if (holiday.includes(day)) {
				if (schedule[schedule.length - 1] === holiDaySchedule[0]) {
					holiDaySchedule.splice(1,1);
					schedule.push(holiDaySchedule.splice(1,1));
					continue;
				}
				schedule.push(holiDaySchedule.shift());
			}
			if (!holiday.includes(day)) {
				if (schedule[schedule.length-1] === weekDaySchedule[0]) {
					weekDaySchedule.splice(1,1);
					schedule.push(weekDaySchedule.splice(1,1));
					continue;
				}
				schedule.push(weekDaySchedule.shift());
			}
			day++;
		}
		return schedule;
	}

	async start() {
		await this.#inputMonthAndStartDay();
		await this.#setWeekDayWorker();
		await this.#setDayOffWorker();
		this.printSchedule();
	}
}

export default Controller;