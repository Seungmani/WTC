import Days from "../src/Model/Days";

describe("요일 확인 클래스 테스트", () => {

  test("요일이 이상하면 에러", () => {
    expect(() => {
      new Days("5", "황").setBonusNumber(48);
    }).toThrow("[ERROR] 월, 화, 수, 목, 금, 토, 일 중 입력하세요");
  });

});