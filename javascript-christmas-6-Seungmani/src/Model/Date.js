import Validate from "../Constants/Validate";

class Date {
	#date;

	constructor(date) {
		Validate.validateDateTrim(date);
		const inputDate = Validate.validateDateNumber(date);
		Validate.validateDateRange(inputDate);
		this.#date = inputDate;
	}

	getDate() {
		return this.#date;
	}
}

export default Date;