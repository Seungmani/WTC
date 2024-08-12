import { MissionUtils } from "@woowacourse/mission-utils";
const { Console } = MissionUtils;
const OutputViews = {
	printSchedule(string) {
		Console.print(string);
	},
	printError(message) {
		Console.print(message);
	}
}

export default OutputViews;