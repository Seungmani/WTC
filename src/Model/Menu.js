import MenuList from "../Constants/MenuList";

class Menu {
	#orderList;
	#totalMenuCount;
	#totalPrice;

	constructor(orderList) {
		this.#orderList = this.#splitMenuAndCount(orderList);
		this.#totalMenuCount = this.#checkTotalCount();
		this.#totalPrice = this.#checkTotalPrice();
	}

	// 입력 받은 메뉴가 없으면 에러
	#validateNotOrder(order) {
		if (order[0] === '') throw new Error('[ERROR] 메뉴를 입력해 주세요');
	}

	// 메뉴가 없는 종류면 에러
	#validateIsMenu(order) {
		if(!MenuList[order]) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	// 메뉴 중복 확인
	#validateDuplicate(orderList, order) {
    const arrayForCheckDuplicate = Object.keys(orderList);
    if (arrayForCheckDuplicate.includes(order)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.')
	}

	// 메뉴 형식 확인
	#validateOrderForm(order) {
		if (order.length !==2) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	// [해산물파스타-2] => { '해산물파스타': '2' }
	#splitMenuAndCount(orderList) {
		const returnOrderList = {}
		this.#validateNotOrder(orderList);
		orderList.forEach(order => {
			const splitMenu = order.split('-');
			this.#validateOrderForm(splitMenu);
			this.#validateIsMenu(splitMenu[0]);
			this.#validateDuplicate(returnOrderList, splitMenu[0]);
      returnOrderList[splitMenu[0]] = splitMenu[1];
		});
    return returnOrderList;
	}
	
	#validateTotalCount(totalCount) {
		if (totalCount > 20) throw new Error('[ERROR] 총 메뉴 주문 수는 20개를 초과할 수 없습니다. 다시 입력해 주세요.');
	}

	#validateNumber(count) {
		if (Number(count) !==0 && !Number(count)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
		return Number(count);
	}

	#validateZero(count) {
		if (count === 0) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	#checkTotalCount() {
    const totalCount = Object.values(this.#orderList).reduce((accumulator, currentValue) => {
			const addValue = this.#validateNumber(currentValue);
			this.#validateZero(addValue);
			return accumulator + addValue
		}, 0);
		this.#validateTotalCount(totalCount);
		return totalCount;
	}

	#checkTotalPrice() {
		const totalPrice = Object.entries(this.#orderList).reduce((accumulator, currentValue) => {
			return accumulator + currentValue[1]*MenuList[currentValue[0]];
		}, 0);
		return totalPrice;
	}

	getOrderList() {
		return this.#orderList;
	}

	getTotalMenuCount() {
		return this.#totalMenuCount;
	}

	getTotalPrice() {
		return this.#totalPrice;
	}

}

export default Menu;