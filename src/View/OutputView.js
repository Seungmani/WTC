import { MissionUtils } from "@woowacourse/mission-utils";

const { Console } = MissionUtils;

const OutputView = {
	printWelcome(){
		Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
	},
	printEvent(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  printMenu(menuList) {
    Console.print("<주문 메뉴>");
    Object.entries(menuList).forEach((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },
	printPrice(price) {
		Console.print("\n<할인 전 총주문 금액>");
		Console.print(`${price.toLocaleString('ko-KR')}원`)
	},
  printGiveawayMenu(given) {
		Console.print("\n<증정 메뉴>");
    given ? Console.print("샴페인 1개") : Console.print('없음');
  },
	printBenefitDetails(dateDiscount, weekdayDiscount, weekendDiscount, starDiscount, giveawayDiscount) {
		Console.print("\n<혜택 내역>");

		if (dateDiscount === 0 && weekdayDiscount === 0 && weekendDiscount === 0 && giveawayDiscount === 0) {
			Console.print('없음');
			return;
		}
		dateDiscount > 0 ? Console.print(`크리스마스 디데이 할인: -${dateDiscount.toLocaleString('ko-KR')}원`) :0;
		weekdayDiscount > 0 ? Console.print(`평일 할인: -${weekdayDiscount.toLocaleString('ko-KR')}원`) : 0;
		weekendDiscount > 0 ? Console.print(`주말 할인: -${weekendDiscount.toLocaleString('ko-KR')}원`) : 0;
		starDiscount > 0 ? Console.print(`특별 할인: -${starDiscount.toLocaleString('ko-KR')}원`) : 0;
		giveawayDiscount > 0 ? Console.print(`증정 이벤트: -${giveawayDiscount.toLocaleString('ko-KR')}원`) : 0;
	},
	printTotalBenefitPrice(totalBenefitPrice) {
		Console.print("\n<총혜택 금액>");
		totalBenefitPrice ? Console.print(`-${totalBenefitPrice.toLocaleString('ko-KR')}원`) : Console.print(`${totalBenefitPrice.toLocaleString('ko-KR')}원`);
	},
	printAfterDiscountPrice(price) {
		Console.print("\n<할인 후 예상 결제 금액>");
		Console.print(`${price.toLocaleString('ko-KR')}원`)
	},
	printEventBadge(badge) {
		Console.print("\n<12월 이벤트 배지>");
		badge !== '' ? Console.print(badge) : Console.print('없음');
	},
	printError(message) {
		Console.print(message);
	}
};

export default OutputView;
