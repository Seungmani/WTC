import InputViews from "../VIews/InputViews";
import OutputViews from "../VIews/OutputViews";
import Days from "../Model/Days";
import Month from "../Model/Month";

class Controller {

	#month;
	#startDay;

	constructor() {
	}
	
	#validateMonthAnsStartDayIInputForm(input) {
		const reg = /^\d{1,2},{1}[ㄱ-ㅎ|가-힣]{1}$/; // 숫자 1~2자리 + ',' 한 자리 + 문자 한자리 검증
		if (!reg.test(input)) {
			throw new Error("[ERROR] 숫자 , 한글 형태로 입력해주세요. 디시 입력");
		}
	}

	#inputMonthAndStartDay() {
		while(true) {
			try {
				const inputMonthAndStartDay = InputViews.readMontAndStartDay();
				this.#validateMonthAnsStartDayIInputForm(inputMonthAndStartDay);
				this.#setMonthAndStartDay(inputMonthAndStartDay);
				break;
			} catch(error) {
				OutputViews.printError(error.message);
			}
		}
	}

	#setMonthAndStartDay(inputMonthAndStartDay) {
		const [month, startDay] = inputMonthAndStartDay.split(",");
		this.#month = new Month(month);
		this.#startDay = new Days(startDay);
	}

	async start() {

	}
}

export default Controller;