import { CheerioCrawler, Dataset, sleep } from "crawlee";

const baseUrl = "https://stackskb.com/product-category/clearance/";
const clearancePagesPattern =
  "https://stackskb.com/product-category/clearance/page/*/";

const PRODUCT_LINK_SELECTOR = ".woocommerce-LoopProduct-link";
const PRODUCT_TITLE_SELECTOR = ".product_title";
const PRODUCT_PRICE_SELECTOR =
  ".elementor-widget-woocommerce-product-price .woocommerce-Price-amount.amount";
const PRODUCT_DESCRIPTION_SELECTOR = ".woocommerce-Tabs-panel--description";
const PRODUCT_PAGE_WRAPPER_SELECTOR = ".product_cat-clearance";
const PRODUCT_IMAGE_SELECTOR = ".woocommerce-product-gallery__image";

export default class StacksKbCrawler {
  async crawlAndStoreData() {
    const dataset = await Dataset.open("clearance");

    const crawler = new CheerioCrawler({
      // Define the requestHandler function

      async requestHandler({ $, request, enqueueLinks }) {
        // Extract the product links from the page
        const productLinks = $(PRODUCT_LINK_SELECTOR)
          .map((index, element) => $(element).attr("href"))
          .get();

        await enqueueLinks({ globs: [clearancePagesPattern] });

        // Enqueue the product links
        await crawler.addRequests(productLinks);

        const productElement = $(PRODUCT_PAGE_WRAPPER_SELECTOR);

        // Extract the product information from the page
        if (productElement && productElement.is("div")) {
          const product = {};
          // Extract the product title
          product.title = $(productElement)
            .find(PRODUCT_TITLE_SELECTOR)
            .first()
            .text();
          // Extract the product price
          product.price =
            $(productElement).find(PRODUCT_PRICE_SELECTOR).parent("ins")
              .length === 0
              ? $(productElement).find(PRODUCT_PRICE_SELECTOR).first().text()
              : $(productElement)
                  .find(PRODUCT_PRICE_SELECTOR)
                  .parent("ins")
                  .first()
                  .text();
          // Extract the product description
          product.description = $(productElement)
            .find(PRODUCT_DESCRIPTION_SELECTOR)
            .first()
            .text();
          // Extract the product link
          product.link = request.url;
          //Extract Product Image
          product.image = $(productElement)
            .find(PRODUCT_IMAGE_SELECTOR)
            .first()
            .data("thumb");
          // Save the product information to a dataset
          await dataset.pushData(product);
        }

        await sleep(1500);
      },
    });

    // Start the crawl with the base URL
    await crawler.run([baseUrl]);
  }
  async getDataFromDataset() {
    const dataset = await Dataset.open("clearance");
    const stackskbData = await dataset.map((item) => item);
    return stackskbData;
  }
  async stacksKbData() {
    return await this.getDataFromDataset();
  }
}
