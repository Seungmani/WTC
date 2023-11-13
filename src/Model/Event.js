import Setting from "../Constants/Setting";

class Event {
	#date;
	#menuCount;
	#totalPrice;
	#totalDiscountPrice;

	constructor(date, menuCount, totalPrice) {
		this.#date = date;
		this.#menuCount = menuCount;
		this.#totalPrice = totalPrice;
		this.#totalDiscountPrice = 0;
		console.log(this.#date, this.#menuCount, this.#totalPrice, this.#totalDiscountPrice);
	}

	// 날짜 및 주문 수를 받으면 각 이벤트 유무 확인 함수

	// 증정 이벤트 12만원 이상, 없으면 없음
	checkGiveaway() {
		return this.#totalPrice > Setting.GIVEAWAY_PRICE ? true : false;
	}

	// 날짜를 받으면 이벤트 기간(1~25)에 맞는 할인 금액 출력, 없으면 없음
	// 평일 할인-디저트 수*2023, 주말 할인-각 메인 수* 2023, 없으면 없음
	// 특별 할인, 총 금액에서 1000원 할인, 없으면 없음
	// 증정 이벤트 12만원 이상, 없으면 없음
	// 배지 확인 5000 -> 별, 10000 -> 트리, 20000 -> 산타, 없으면 없음
}

export default Event;