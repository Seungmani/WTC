import Controller from "./Cotroller/Controller";

class App {
  async run() {
    const controller = new Controller();
    controller.start();
  }
}

export default App;
