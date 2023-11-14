import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("기능 테스트", () => {
  test("모든 타이틀 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
			"티본스테이크 1개",
			"바비큐립 1개",
			"초코케이크 2개",
			"제로콜라 1개",
      "<할인 전 총주문 금액>",
			"142,000원",
      "<증정 메뉴>",
			"샴페인 1개",
      "<혜택 내역>",
			"크리스마스 디데이 할인: -1,200원",
			"평일 할인: -4,046원",
			"특별 할인: -1,000원",
			"증정 이벤트: -25,000원",
      "<총혜택 금액>",
			"-31,246원",
      "<할인 후 예상 결제 금액>",
			"135,754원",
      "<12월 이벤트 배지>",
			"산타",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

	test("금액이 만원 이하인 경우", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "타파스-1,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
			"타파스 1개",
			"제로콜라 1개",
      "<할인 전 총주문 금액>",
			"8,500원",
      "<증정 메뉴>",
			"없음",
      "<혜택 내역>",
			"없음",
      "<총혜택 금액>",
			"0원",
      "<할인 후 예상 결제 금액>",
			"8,500원",
      "<12월 이벤트 배지>",
			"없음",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

	test("주말 테스트", async () => {
    // given
    const logSpy = getLogSpy();
		mockQuestions(["2", "티본스테이크-1,바비큐립-1,초코케이크-3,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
			"티본스테이크 1개",
			"바비큐립 1개",
			"초코케이크 3개",
			"제로콜라 1개",
      "<할인 전 총주문 금액>",
			"157,000원",
      "<증정 메뉴>",
			"샴페인 1개",
      "<혜택 내역>",
			"크리스마스 디데이 할인: -1,100원",
			"주말 할인: -4,046원",
			"증정 이벤트: -25,000원",
      "<총혜택 금액>",
			"-30,146원",
      "<할인 후 예상 결제 금액>",
			"151,854원",
      "<12월 이벤트 배지>",
			"산타",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

	test("25일 이후", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["27", "티본스테이크-1,바비큐립-1,초코케이크-3,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
			"티본스테이크 1개",
			"바비큐립 1개",
			"초코케이크 3개",
			"제로콜라 1개",
      "<할인 전 총주문 금액>",
			"157,000원",
      "<증정 메뉴>",
			"샴페인 1개",
      "<혜택 내역>",
			"평일 할인: -6,069원",
			"증정 이벤트: -25,000원",
      "<총혜택 금액>",
			"-31,069원",
      "<할인 후 예상 결제 금액>",
			"150,931원",
      "<12월 이벤트 배지>",
			"산타",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

	test("12만원 미만", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["27", "티본스테이크-1,바비큐립-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
			"티본스테이크 1개",
			"바비큐립 1개",
      "<할인 전 총주문 금액>",
			"109,000원",
      "<증정 메뉴>",
			"없음",
      "<혜택 내역>",
			"없음",
      "<총혜택 금액>",
			"0원",
      "<할인 후 예상 결제 금액>",
			"109,000원",
      "<12월 이벤트 배지>",
			"없음",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });
});
