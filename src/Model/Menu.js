import MenuList from "../Constants/MenuList";
import Setting from "../Constants/Setting";

class Menu {
	#orderList;
	#totalMenuCount;
	#totalPrice;
	#eachMenuCount;

	constructor(orderList) {
		this.#orderList = this.#splitMenuAndCount(orderList);
		this.#eachMenuCount = this.#countEachMenu();
		this.#totalMenuCount = this.#checkTotalCount();
		this.#totalPrice = this.#checkTotalPrice();
	}

	// 입력 받은 메뉴가 없으면 에러
	#validateNotOrder(order) {
		if (order[0] === Setting.NOT_INPUT_MENU) throw new Error('[ERROR] 메뉴를 입력해 주세요');
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
		if (order.length !== Setting.NORMAL_SPLIT_LENGTH) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	// [해산물파스타-2] => { '해산물파스타': '2' }
	#splitMenuAndCount(orderList) {
		const returnOrderList = {}
		this.#validateNotOrder(orderList);
		orderList.forEach(order => {
			const splitMenu = order.split(Setting.DELIMITER_HYPHEN);
			this.#validateOrderForm(splitMenu);
			this.#validateIsMenu(splitMenu[0]);
			this.#validateDuplicate(returnOrderList, splitMenu[0]);
      returnOrderList[splitMenu[0]] = splitMenu[1];
		});
    return returnOrderList;
	}

	#validateOnlyDrink(allMenu, drink=0) {
		if(allMenu.length === drink) throw new Error ('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.')
	}

	// 메뉴 구하는 함수
	#countMenu(menu) {
		const count = Object.entries(this.#orderList).reduce((accumulator, currentValue) => {
			if (menu.includes(currentValue[0])) {
				this.#validateTrim(currentValue[1]);
				const addValue = this.#validateNumber(currentValue[1]);
				this.#validateZero(addValue);
				return accumulator + addValue;
			}
			return accumulator;
		}, 0);
    return count;
	}

	// 메뉴 수 확인
	#countEachMenu() {
		const appetizerCount = this.#countMenu(Setting.MENU_APPETIZER);
		const mainMenuCount = this.#countMenu(Setting.MENU_MAIN);
		const dessertsCount = this.#countMenu(Setting.MENU_DESSERT);
		const drinksCount = this.#countMenu(Setting.MENU_DRINK);

		return [appetizerCount, mainMenuCount, dessertsCount, drinksCount];
	}
	
	#validateTotalCount(totalCount) {
		if (totalCount > 20) throw new Error('[ERROR] 총 메뉴 주문 수는 20개를 초과할 수 없습니다. 다시 입력해 주세요.');
	}

	#validateTrim(date) {
		if(date.length !== date.trim().length) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	#validateNumber(count) {
		if (Number(count) !==0 && !Number(count)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
		return Number(count);
	}

	#validateZero(count) {
		if (count === 0) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	}

	#checkTotalCount() {
    const totalCount = this.#eachMenuCount.reduce((accumulator, currentValue) => accumulator+currentValue, 0)
    this.#validateOnlyDrink(totalCount, this.#eachMenuCount[3]);
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

	getEachMenuCount() {
		return this.#eachMenuCount;
	}

}

export default Menu;