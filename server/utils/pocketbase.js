import PocketBase from "pocketbase";

const constants = {
  clearanceCollection: "clearance",
};

export default class PocketWrapper {
  constructor(pocketBaseUrl, adminUsername, adminPassword) {
    this.pb = new PocketBase(pocketBaseUrl);
    this.pocketBaseUrl = pocketBaseUrl;
    this.adminUsername = adminUsername;
    this.adminPassword = adminPassword;
  }

  async getClearanceData() {
    try {
      if (!this.checkAdminAuthStatus()) return null;
      const clearanceData = await this.pb
        .collection(constants.clearanceCollection)
        .getFullList(100, {
          sort: "-created",
        });
      return clearanceData;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async authAdmin() {
    return this.pb.admins.authWithPassword(
      this.adminUsername,
      this.adminPassword
    );
  }

  async addClearanceRecord(clearanceDetails) {
    try {
      if (!this.checkAdminAuthStatus()) return null;
      await this.pb
        .collection(constants.clearanceCollection)
        .create(clearanceDetails, { $autoCancel: false });
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  checkAdminAuthStatus() {
    // console.log(this.pb.authStore.isValid);
    return this.pb.authStore.isValid;
  }
}
