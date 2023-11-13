import Setting from "../Constants/Setting";

class Event {
	#date;
	#menuCount;
	#totalPrice;
	#discountPrice;
	#totalDiscountPrice;

	constructor(date, menuCount, totalPrice) {
		this.#date = date;
		this.#menuCount = menuCount;
		this.#totalPrice = totalPrice;
		this.#discountPrice = {
			dateDiscount : 0,
			weekdayDiscount : 0,
			weekendDiscount : 0,
			starDiscount : 0,
			giveawayDiscount : 0,
		}
		this.#totalDiscountPrice = 0;
	}

	// 날짜 및 주문 수를 받으면 각 이벤트 유무 확인 함수

	// 증정 이벤트 12만원 이상, 없으면 없음
	checkGiveaway() {
		if (this.#totalPrice > Setting.GIVEAWAY_STANDARD_PRICE) {
			this.#discountPrice.giveawayDiscount = Setting.GIVEAWAY_PRICE;
			return true;
		}
		this.#discountPrice.giveawayDiscount = 0;
		return  false;
	}

	// 날짜를 받으면 이벤트 기간(1~25)에 맞는 할인 금액 출력, 없으면 없음
	checkDateDiscount() {
		if (Setting.FIRST_DAY <= this.#date && this.#date <= Setting.CHRISTMAS) {
			this.#discountPrice.dateDiscount = Setting.FIRST_DAY_DISCOUNT_PRICE + Setting.ADD_DAY_DISCOUNT_PRICE * (this.#date-Setting.FIRST_DAY);
		}
	}

		// 평일 할인-디저트 수*2023, 주말 할인-각 메인 수* 2023, 없으면 없음
	checkWeekendDiscount() {
		if (Setting.WEEKEND.includes(this.#date)) {
			this.#discountPrice.weekendDiscount = this.#menuCount[1] * Setting.WEEKEND_DAY_DISCOUNT_PRICE;
			return;
		}
		this.#discountPrice.weekdayDiscount = this.#menuCount[2] * Setting.WEEKEND_DAY_DISCOUNT_PRICE;
	}

	// 특별 할인, 총 금액에서 1000원 할인, 없으면 없음
	checkStarDiscount() {
		if (Setting.STAR_DISCOUNT_DAY.includes(this.#date)) {
			this.#discountPrice.starDiscount = Setting.STAR_DAY_DISCOUNT;
		}
	}

	// 배지 확인 5000 -> 별, 10000 -> 트리, 20000 -> 산타, 없으면 없음
}

export default Event;