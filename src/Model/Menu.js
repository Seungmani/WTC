import MenuList from "../Constants/MenuList";
import Setting from "../Constants/Setting";
import Validate from "../Constants/Validate";

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


	#splitMenuAndCount(orderList) {
		const returnOrderList = {}
		Validate.validateNotOrder(orderList);
		orderList.forEach(order => {
			Validate.validateOrderFormSplitRest(order);
			const splitMenu = order.split(Setting.DELIMITER_HYPHEN);
			Validate.validateOrderFormSplitHyphen(splitMenu);
			Validate.validateIsMenu(splitMenu[0]);
			Validate.validateDuplicate(returnOrderList, splitMenu[0]);
      returnOrderList[splitMenu[0]] = splitMenu[1];
		});
    return returnOrderList;
	}

	#countMenu(menu) {
		const count = Object.entries(this.#orderList).reduce((accumulator, currentValue) => {
			if (menu.includes(currentValue[0])) {
				Validate.validateOderCountTrim(currentValue[1]);
				const addValue = Validate.validateNumberBiggerZero(currentValue[1]);
				Validate.validateZero(addValue);
				return accumulator + addValue;
			}
			return accumulator;
		}, 0);
    return count;
	}

	#countEachMenu() {
		const appetizerCount = this.#countMenu(Setting.MENU_APPETIZER);
		const mainMenuCount = this.#countMenu(Setting.MENU_MAIN);
		const dessertsCount = this.#countMenu(Setting.MENU_DESSERT);
		const drinksCount = this.#countMenu(Setting.MENU_DRINK);

		return [appetizerCount, mainMenuCount, dessertsCount, drinksCount];
	}

	#checkTotalCount() {
    const totalCount = this.#eachMenuCount.reduce((accumulator, currentValue) => accumulator+currentValue, 0)
    Validate.validateOnlyDrink(totalCount, this.#eachMenuCount[3]);
		Validate.validateTotalCount(totalCount);
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