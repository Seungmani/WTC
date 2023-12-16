import { MissionUtils } from "@woowacourse/mission-utils";
const { Console } = MissionUtils;

const OutputViews = {
	printEmergencySchedule() {
		Console.print(); // 5월 4일 목 수아, 월은 고정, 일을 기준으로 반복을 해야할듯?
	}
}

export default OutputViews;