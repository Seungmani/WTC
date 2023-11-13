import MenuList from "../Constants/MenuList";
import Setting from "../Constants/Setting";

class Menu {
	#orderList;
	#totalMenuCount;
	#totalPrice;
	#eachMenuCount;

	constructor(orderList) {
		this.#orderList = this.#splitMenuAndCount(orderList);
		this.#eachMenuCount = this.#countEachMenu(this.#orderList);
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

	// 메뉴 수 확인
	#countEachMenu(orderList) {
		const arrayForCheckMenu = Object.keys(orderList);
		const mainMenuCount = arrayForCheckMenu.filter((menu) => Setting.MENU_MAIN.includes(menu)).length;
		const dessertsCount = arrayForCheckMenu.filter((menu) => Setting.MENU_DESSERT.includes(menu)).length;
		const drinksCount = arrayForCheckMenu.filter((menu) => Setting.MENU_DRINK.includes(menu)).length;

		this.#validateOnlyDrink(arrayForCheckMenu, drinksCount);

		return [mainMenuCount, dessertsCount, drinksCount];
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
    const totalCount = Object.values(this.#orderList).reduce((accumulator, currentValue) => {
			this.#validateTrim(currentValue)
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

	getEachMenuCount() {
		return this.#eachMenuCount;
	}

}

export default Menu;