import Date from "../src/Model/Date";

describe("Date 클래스 테스트", () =>{
	test.each(["1 ", " 1", " ", " 1 "])("날짜 입력 시 공백이 있으면 에러", (input) => {
		expect(() => {
			new Date(input);
		}).toThrow("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
	});
	test.each(["ㅁ", "#", "31!", ""])("날짜 입력 시 숫자가 아니면 에러", (input) => {
		expect(() => {
			new Date(input);
		}).toThrow("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
	});
	test.each(["34", "0", "-3"])("날짜 입력 시 범위를 벗어나면 에러", (input) => {
		expect(() => {
			new Date(input);
		}).toThrow("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
	});
})