import { MissionUtils } from "@woowacourse/mission-utils";
const { Console } = MissionUtils;

const InputViews = {
	async readMontAndStartDay() {
		const inputSting = await Console.readLineAsync('비상 근무를 배정할 월과 시작 요일을 입력하세요>');
		const [month, startDay]  = inputSting.split(',');
		return [month, startDay];
	},
	async readWeekDayWorker() {
		const inputWeekDayWorker = await Console.readLineAsync('평일 비상 근무 순번대로 사원 닉네임을 입력하세요>');
		return inputWeekDayWorker;
	},
	async readDayOffWorker() {
		const DayOffWorker = await Console.readLineAsync('휴일 비상 근무 순번대로 사원 닉네임을 입력하세요>');
		return DayOffWorker;
	}
}

export default InputViews;