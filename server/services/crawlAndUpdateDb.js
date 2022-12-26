import PocketWrapper from "../utils/pocketbase.js";
import StacksKbCrawler from "../crawlers/stacksKbClearence.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();
async function init() {
  try {
    const pocketBaseUrl = process.env.POCKET_URL;
    const adminUsername = process.env.POCKET_USERNAME;
    const adminPassword = process.env.POCKET_PASSWORD;

    const sk = new StacksKbCrawler();
    const pbw = new PocketWrapper(pocketBaseUrl, adminUsername, adminPassword);

    await pbw.authAdmin();

    await sk.crawlAndStoreData();
    const clearanceData = await sk.getDataFromDataset();

    clearanceData.forEach(async (item) => {
      pbw.addClearanceRecord(item);
    });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  }
}

init();
