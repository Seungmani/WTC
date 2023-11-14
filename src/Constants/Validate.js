import Setting from "./Setting";
import MenuList from "./MenuList";

const Validate = {
	validateDateNumber(date) {
		if (!Number(date)) throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
		return Number(date);
	},

	validateDateTrim(date) {
		if (date.length !== date.trim().length) throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
	},

	validateDateRange(date) {
		if (Setting.FIRST_DAY > date || date > Setting.LAST_DAY) throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
	},

	validateNotOrder(order) {
		if (order[0] === Setting.NOT_INPUT_MENU) throw new Error('[ERROR] 메뉴를 입력해 주세요');
	},

	validateIsMenu(order) {
		if(!MenuList[order]) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	},

	validateDuplicate(orderList, order) {
		const arrayForCheckDuplicate = Object.keys(orderList);
		if (arrayForCheckDuplicate.includes(order)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	},

	validateOrderFormSplitRest(order) {
		const regForm = /^[ㄱ-ㅎ가-힣]+-\d{1,2}$/;
		if (!regForm.test(order)) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	},

	validateOnlyDrink(allMenu, drink=0) {
		if(allMenu === drink) throw new Error ('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
	},

	validateTotalCount(totalCount) {
		if (totalCount > 20) throw new Error('[ERROR] 총 메뉴 주문 수는 20개를 초과할 수 없습니다. 다시 입력해 주세요.');
	},
	
	validateZero(count) {
		if (Number(count) === 0) throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
		return Number(count);
	}
};

export default Validate;