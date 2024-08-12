const Static = {
	MIN_NAME_LENGTH: 1,
	MAX_NAME_LENGTH: 5,
	MINIMUM_EMERGENCY_NUMBER: 5,
	MAXIMUM_EMERGENCY_NUMBER: 35,
	FIRST_MONTH: 1,
	LAST_MONTH: 12,
	DAYS: ["일", "월", "화" ,"수" ,"목", "금", "토"],
	EACH_MONTH_DAY: [31, 28, 31, 30, 31, 30, 31, 31, 30 ,31, 30, 31],
	STATUTORY_HOLIDAYS: {
		1: 1,
		5: 5,
		6: 6,
		8: 15,
		10: [3, 9],
		12: 25,
	}
}

export default Static;