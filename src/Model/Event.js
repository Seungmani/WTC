import Setting from "../Constants/Setting";

class Event {
	#date;
	#menuCount;
	#totalPrice;
	#promotionDiscountPrice;
	#totalDiscountPrice;

	constructor(date, menuCount, totalPrice) {
		this.#date = date;
		this.#menuCount = menuCount;
		this.#totalPrice = totalPrice;
		this.#promotionDiscountPrice = {
			dateDiscount : 0,
			weekdayDiscount : 0,
			weekendDiscount : 0,
			starDiscount : 0,
			giveawayDiscount : 0,
		}
		this.#totalDiscountPrice = 0;
	}

	// 날짜 및 주문 수를 받으면 각 이벤트 유무 확인 함수
	checkAllDiscount() {
		this.#checkDateDiscount();
		this.#checkWeekendDiscount();
		this.#checkStarDiscount();
	}

	#addDiscountPrice(price=0) {
		this.#totalDiscountPrice += price;
	}

	// 증정 이벤트 12만원 이상, 없으면 없음
	checkGiveaway() {
		if (this.#totalPrice > Setting.GIVEAWAY_STANDARD_PRICE) {
			this.#promotionDiscountPrice.giveawayDiscount = Setting.GIVEAWAY_PRICE;
			this.#addDiscountPrice(Setting.GIVEAWAY_PRICE);
			return true;
		}
		this.#promotionDiscountPrice.giveawayDiscount = 0;
		return  false;
	}

	// 날짜를 받으면 이벤트 기간(1~25)에 맞는 할인 금액 출력, 없으면 없음
	#checkDateDiscount() {
		if (Setting.FIRST_DAY <= this.#date && this.#date <= Setting.CHRISTMAS) {
			this.#promotionDiscountPrice.dateDiscount = Setting.FIRST_DAY_DISCOUNT_PRICE + Setting.ADD_DAY_DISCOUNT_PRICE * (this.#date-Setting.FIRST_DAY);
			this.#addDiscountPrice(this.#promotionDiscountPrice.dateDiscount);
		}
	}

		// 평일 할인-디저트 수*2023, 주말 할인-각 메인 수* 2023, 없으면 없음
	#checkWeekendDiscount() {
		if (Setting.WEEKEND.includes(this.#date)) {
			this.#promotionDiscountPrice.weekendDiscount = this.#menuCount[1] * Setting.WEEKEND_DAY_DISCOUNT_PRICE;
			this.#addDiscountPrice(this.#promotionDiscountPrice.weekendDiscount);
			return;
		}
		this.#promotionDiscountPrice.weekdayDiscount = this.#menuCount[2] * Setting.WEEKEND_DAY_DISCOUNT_PRICE;
		this.#addDiscountPrice(this.#promotionDiscountPrice.weekdayDiscount);
	}

	// 특별 할인, 총 금액에서 1000원 할인, 없으면 없음
	#checkStarDiscount() {
		if (Setting.STAR_DISCOUNT_DAY.includes(this.#date)) {
			this.#promotionDiscountPrice.starDiscount = Setting.STAR_DAY_DISCOUNT;
			this.#addDiscountPrice(Setting.STAR_DAY_DISCOUNT);
		}
	}

	// 배지 확인 5000 -> 별, 10000 -> 트리, 20000 -> 산타, 없으면 없음
	checkBadge() {
		if (this.#totalDiscountPrice >= Setting.BADGE_PRICE[2]) {
			return Setting.BADGE[2];
		}
		if (this.#totalDiscountPrice >= Setting.BADGE_PRICE[1]) {
			return Setting.BADGE[1];
		}
		if (this.#totalDiscountPrice >= Setting.BADGE_PRICE[0]) {
			return Setting.BADGE[0]
		}
		return '';
	}

	getPromotionDiscountPrice() {
		return this.#promotionDiscountPrice;
	}

	getTotalDiscountPrice() {
		return this.#totalDiscountPrice;
	}

	getCalculatedAmount() {
		return this.#totalPrice - this.#totalDiscountPrice;
	}

}

export default Event;