import Worker from "../src/Model/Worker";

describe("요일 확인 클래스 테스트", () => {

  test("중복 에러", () => {
    expect(() => {
      new Worker("수아, 루루, 글로, 솔로스타, 수아, 슬링키, 참새, 도리, 준팍, 도밥, 고니");
    }).toThrow("[ERROR] 이름에 중복이 있습니다.");
  });

	test("인원 수 에러", () => {
    expect(() => {
      new Worker("수아, 루루, 글로");
    }).toThrow("[ERROR] 인원은 최소 5명 이상을 입력하세요");
  });

});