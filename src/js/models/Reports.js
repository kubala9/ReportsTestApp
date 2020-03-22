import text from "./data.json";

export default class Reports {
  constructor() {}

  async getData() {
    try {
      const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(text);
        }, 1000);
      });
      this.data = data;
    } catch (error) {
      console.log(`Fetching data error: ${error}`);
    }
  }
}
