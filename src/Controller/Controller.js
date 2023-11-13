import OutputView from "../View/OutputView";
import InputView from "../View/InputView";
import Date from "../Model/Date";
import Menu from "../Model/Menu";
import Event from "../Model/Event";

class Controller {

	#date;
	#orderList;
	#event;

	constructor() {
		this.#date;
		this.#orderList;
		this.#event;
	}

	async settingDate() {		
		while(true) {
			try {
				const date = await InputView.readDate();
				this.#date = new Date(date);
				break;
			} catch (error) {
				OutputView.printError(error.message);
			}
		}
	}

	async settingMenu() {
		while(true) {
			try {
				const order = await InputView.readMenu();
				this.#orderList = new Menu(order);
				break;
			} catch (error) {
				OutputView.printError(error.message);
			}
		}
	}

	printMenuAndMenu() {
		OutputView.printMenu(this.#orderList.getOrderList());
		const price = this.#orderList.getTotalPrice().toLocaleString('ko-KR');
		OutputView.printPrice(price);
	}

	async play() {
		OutputView.printWelcome();
		await this.settingDate();
		await this.settingMenu();
		OutputView.printEvent(this.#date.getDate());
		this.printMenuAndMenu();

		// 출력 순서
		/*
		<증정 메뉴>
		<혜택 내역>
		<총혜택 금액>
		<할인 후 예상 결제 금액>
		<12월 이벤트 배지>
		 */
	}
}

export default Controller;