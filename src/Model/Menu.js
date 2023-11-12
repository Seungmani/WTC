import MenuList from "../Constants/MenuList";

class Menu {
	#orderList;
	#totalMenuCount;
	#totalPrice;

	constructor(order) {
		this.#orderList = this.#validateOrder(order);
		this.#totalMenuCount = this.#checkTotalCount();
		this.#totalPrice = this.#checkTotalPrice();
	}

	// [해산물파스타-2] => [ '해산물파스타', '2' ]
	#splitMenuAndCount(order) {
		const menuAndCount = [];
		order.forEach(menu => {
			const x = menu.split('-');
			menuAndCount.push(x);
		});
    return menuAndCount;
	}

	// 입력 받은 메뉴가 없으면 에러
	#validateNotOrder(order) {
		if (order[0] === '') throw new Error('[ERROR] 메뉴를 입력해 주세요');
	}

	// 메뉴가 없는 종류면 에러
	#validateIsMenu(order) {
		order.forEach((menu) => {
			if(!MenuList[menu[0]]) throw new Error(`[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.`)
		})
	}

	#validateOrder(order) {
		this.#validateNotOrder(order);
		const orderList = this.#splitMenuAndCount(order);
		this.#validateIsMenu(orderList);
		return orderList;
	}
	
	// 메뉴 총 합이 20보다 크면 에러
	#validateTotalCount(totalCount) {
		if (totalCount > 20) throw new Error('[ERROR] 총 메뉴 주문 수는 20개를 초과할 수 없습니다. 다시 입력해 주세요.');
	}

	// count가 숫자가 아니면 에러, 0보다 크고
	#validateNumber(count) {
		if (Number(count) !==0 && !Number(count)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
		return Number(count);
	}

	#validateZero(count) {
		if (count === 0) throw new Error('[ERROR] 메뉴는 1개 이상 주문해야 합니다. 다시 입력해 주세요.');
	}

	#checkTotalCount() {
		const totalCount = this.#orderList.reduce((accumulator, currentValue) => {
			const addValue = this.#validateNumber(currentValue[1]);
			this.#validateZero(addValue);
			return accumulator + addValue
		}, 0);
		this.#validateTotalCount(totalCount);
		return totalCount;
	}

	#checkTotalPrice() {
		const totalPrice = this.#orderList.reduce((accumulator, currentValue) => {
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