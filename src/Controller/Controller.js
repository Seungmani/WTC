import OutputView from "../View/OutputView";
import InputView from "../View/InputView";
import Date from "../Model/Date";
import Menu from "../Model/Menu";

class Controller {

	#date;
	#orderList;

	constructor() {
		this.#date = 0;
		this.#orderList = [];
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
		this.printMenuAndMenu();
	}
}

export default Controller;