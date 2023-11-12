import { MissionUtils } from "@woowacourse/mission-utils";

const { Console } = MissionUtils;

const OutputView = {
	printWelcome(){
		Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
	},
  printMenu(menuList) {
    Console.print("<주문 메뉴>");
    menuList.forEach((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },
  printEvent(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },
	printPrice(price) {
		Console.print("<할인 전 총주문 금액>");
		Console.print(`${price}원`)
	},
  printGiveawayMenu(given) {
		Console.print("<증정 메뉴>");
    if (given) {
      Console.print("샴페인 1개");
			return;
    }
		Console.print('없음');
  },
	printBenefitDetails(christmasDiscount, weekdayDiscount, weekendDiscount, giveawayDiscount) {
		Console.print("<혜택 내역>");
		if (christmasDiscount !== 0) Console.price(`크리스마스 디데이 할인: ${christmasDiscount}원`);
		if (weekdayDiscount !== 0) Console.price(`평일 할인: ${weekdayDiscount}원`);
		if (weekendDiscount !== 0) Console.price(`주말 할인: ${weekendDiscount}원`);
		if (giveawayDiscount !== 0) Console.price(`증정 이벤트: ${giveawayDiscount}원`);
	},
	printTotalBenefitPrice(totalBenefitPrice) {
		Console.print("<총혜택 금액>");
		Console.print(`${totalBenefitPrice}원`);
	},
	printEventBadge(badge) {
		Console.print("<12월 이벤트 배지>");
		Console.print(badge);
	},
	printError(message) {
		Console.print(message);
	}
};

export default OutputView;
