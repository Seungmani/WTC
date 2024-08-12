import { MissionUtils } from '@woowacourse/mission-utils';
import Setting from '../Constants/Setting';

const { Console } = MissionUtils;

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync('12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)');
    return input;
  },
  async readMenu() {
    const menus = await Console.readLineAsync('주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)');
    const menuList = menus.split(Setting.DELIMITER_REST);
    return menuList;
  },
};

export default InputView;
