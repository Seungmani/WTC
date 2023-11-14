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

	async #settingDate() {		
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

	async #settingMenu() {
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

	#printMenuAndMenu() {
		OutputView.printMenu(this.#orderList.getOrderList());
		const price = this.#orderList.getTotalPrice();
		OutputView.printPrice(price);
	}

	#printAllEvent() {
		OutputView.printGiveawayMenu(this.#event.checkGiveaway());
		this.#event.checkAllDiscount()
		const {dateDiscount, weekdayDiscount, weekendDiscount, starDiscount, giveawayDiscount} = this.#event.getPromotionDiscountPrice();
		OutputView.printBenefitDetails(dateDiscount, weekdayDiscount, weekendDiscount, starDiscount, giveawayDiscount); //<혜택 내역>
		OutputView.printTotalBenefitPrice(this.#event.getTotalDiscountPrice());
		OutputView.printAfterDiscountPrice(0)
		OutputView.printEventBadge(this.#event.checkBadge());
	}

	async play() {
		OutputView.printWelcome();
		await this.#settingDate();
		await this.#settingMenu();
		OutputView.printEvent(this.#date.getDate());

		this.#printMenuAndMenu();

		this.#event = new Event(this.#date.getDate(), this.#orderList.getEachMenuCount(), this.#orderList.getTotalPrice());
		this.#printAllEvent();
	}
}

export default Controller;