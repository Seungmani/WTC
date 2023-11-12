class Date {
	#date;

	constructor(date) {
		const inputDate = this.#validateNumber(date);
		this.#validateRange(inputDate);
		this.#date = inputDate;
	}

	#validateNumber(date) {
		if(!Number(date)) throw new Error('[ERROR] 숫자를 입력해 주세요');
		return Number(date);
	}

	#validateRange(date) {
		if (1 > date || date > 31) {
			throw new Error('[ERROR] 날짜는 1~31일 사잇값을 입력해 주세요');
		}
	}

	getDate() {
		return this.#date;
	}
}

export default Date;