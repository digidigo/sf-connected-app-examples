import jsforce from "jsforce";

export default class JSforceUtils {
  constructor(accessToken, instanceUrl) {
    this.conn = new jsforce.Connection({
      accessToken,
      instanceUrl,
    });
  }

  async query(queryString) {
    try {
      const result = await this.conn.query(queryString);
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async updateContact(contact) {
    try {
      const result = await this.conn.sobject("Contact").update(contact);
      return result;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  // Add other utility methods as needed
}
