import Static from "../Static/Static";

class Worker {
  #dayWorker;
  #dayOffWorker;

	constructor(workers, day) {
    if (day === "day") {
      this.#setDayWorker(workers);
    }
		if (day === "dayOff") {
      this.#setDayOffWorker(workers);
    }
  }
  #setDayWorker(workers) {
    this.#dayWorker = this.#validateWorkers(workers);
  }

  #setDayOffWorker(workers) {
    this.#dayOffWorker = this.#validateWorkers(workers);
  }

  #validateWorkers(workers) {
    const splitWorker = this.#splitByDelimiter(workers);
    this.#validateMinimumWorkerLength(splitWorker);
    this.#validateMaxWorkerLength(splitWorker);
    this.#validateDuplicate(splitWorker);
    splitWorker.map((worker) => {
      this.#validateNameLength(worker);
    });
    return splitWorker;
  }

  #splitByDelimiter(workers) {
    return workers.split(",");
  }

  // 이름 5글자
  #validateNameLength(name) {
    if (
      name.length > Static.MAX_NAME_LENGTH ||
      name.length < Static.MIN_NAME_LENGTH
    ) {
      throw new Error("[ERROR] 이름은 1~5글자로 입력해주세요. 다시 입력");
    }
  }

  // 중복 x
  #validateDuplicate(workers) {
    const setWorker = new Set(workers);
    if (workers.length !== setWorker.size) {
      throw new Error("[ERROR] 이름에 중복이 있습니다.");
    }
  }

  // 최소 인원 5명
  #validateMinimumWorkerLength(workers) {
    if (workers.length < Static.MINIMUM_EMERGENCY_NUMBER) {
      throw new Error("[ERROR] 인원은 최소 5명 이상을 입력하세요");
    }
  }

  // 최대 35명
  #validateMaxWorkerLength(workers) {
    if (workers.length > Static.MAXIMUM_EMERGENCY_NUMBER) {
      throw new Error("[ERROR] 인원은 최대 35명입니다.");
    }
  }

  getDayWorker() {
    return this.#dayWorker;
  }

  getDayOffWorker() {
    return this.#dayOffWorker;
  }
}

export default Worker;
