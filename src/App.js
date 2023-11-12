import Controller from "./Controller/controller";

class App {
  async run() {
    await Controller.play();
  }
}

export default App;
