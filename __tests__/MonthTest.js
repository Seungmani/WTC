import Month from "../src/Model/Month";

describe("달 확인 클래스 테스트", () => {

  test("1~12가 아니면 에러", () => {
    expect(() => {
      new Month("13").setBonusNumber(48);
    }).toThrow("[ERROR] 1~12월 중 입력해주세요. 다시 입력");
  });

});
