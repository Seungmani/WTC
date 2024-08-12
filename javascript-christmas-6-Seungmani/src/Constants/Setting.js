const Setting = Object.freeze({
	DELIMITER_REST: ',',
	DELIMITER_HYPHEN: '-',
	NORMAL_SPLIT_LENGTH: 2,
	NOT_INPUT_MENU: '',
	FIRST_DAY: 1,
	LAST_DAY: 31,
  FIRST_DAY_DISCOUNT_PRICE: 1000,
  ADD_DAY_DISCOUNT_PRICE: 100,
  CHRISTMAS: 25,
  WEEKEND: [1, 2, 8, 9, 15, 16, 22, 23, 29, 20],
	WEEKEND_DAY_DISCOUNT_PRICE: 2023,
	STAR_DISCOUNT_DAY: [3, 10, 17, 24, 25, 31],
	STAR_DAY_DISCOUNT: 1000,
	GIVEAWAY_STANDARD_PRICE: 120000,
	GIVEAWAY_PRICE: 25000,
	BADGE: ['별', '트리', '산타'],
	BADGE_PRICE: [5000, 10000, 20000],
	MENU_APPETIZER: ['양송이수프', '타파스', '시저샐러드'],
	MENU_MAIN: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
	MENU_DESSERT: ['초코케이크', '아이스크림'],
	MENU_DRINK: ['제로콜라', '레드와인', '샴페인'],
	LIMIT_PRICE: 10000,
});

function deepFreeze(target) {
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    Object.keys(target).map((item) => deepFreeze(target[item]));
  }
  return target;
}

deepFreeze(Setting);

export default Setting;