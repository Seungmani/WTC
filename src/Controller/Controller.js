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

	async setting() {
		OutputView.printWelcome();
		
		while(true) {
			try {
				const date = await InputView.readDate();
				this.#date = new Date(date);
				break;
			} catch {
				// print(error.message);
			}
		}

		while(true) {
			try {
				const order = await InputView.readMenu();
				this.#orderList = new Menu(order);
				break;
			} catch {
				// print(error.message);
			}
		}
	}

	async play() {
		await this.setting();
		OutputView.printMenu(this.#orderList.getOrderList());
		OutputView.printPrice(this.#orderList.getTotalPrice());
	}
}

export default Controller;