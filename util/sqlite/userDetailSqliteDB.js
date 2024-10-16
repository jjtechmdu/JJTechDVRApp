import * as SQLite from "expo-sqlite";
import { sqliteDbName } from "../../constants/global";

let database;

async function openDatabase() {
  try {
    if (!database) {
      database = await SQLite.openDatabaseAsync(sqliteDbName);
    }
  } catch (error) {
    console.warn(error);
  }
}

// Function to initialize the database and create the table if it doesn't exist
export async function init() {
  try {
    // Open the database connection asynchronously
    if (!database) {
      await openDatabase();
    }
    if (database) {
      // Set the journal mode to WAL and create the table
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS userDetail (
          id INTEGER PRIMARY KEY NOT NULL, 
          UserName TEXT NOT NULL, 
          UserNameOid TEXT NOT NULL, 
          Pwd TEXT NOT NULL,
          SupervisorName TEXT NOT NULL,
          Accode TEXT NOT NULL,
          BranchName TEXT NOT NULL,
          BranchOid TEXT NOT NULL,
          ImeiNo TEXT NOT NULL
        );
      `);
      const firstRow = await database.getFirstAsync("SELECT * FROM userDetail");
      return firstRow;
      //  console.log("Database initialized successfully.");
    } else {
      console.error("Database connection failed.");
    }
  } catch (error) {
    // Handle and log any errors that occur during initialization
    console.error("Error initializing the database:", error);
  }
}

export async function insertUserDataToSqlite(userDetail) {
  try {
    if (!database) {
      await init();
    }
    await database.runAsync("DELETE FROM userDetail");

    const result = await database.runAsync(
      `INSERT INTO userDetail (UserName,UserNameOid, Pwd, SupervisorName, Accode,BranchName,BranchOid,ImeiNo) VALUES (?,?,?,?,?,?,?,?)`,
      [
        userDetail.UserName,
        userDetail.UserNameOid,
        userDetail.Pwd,
        userDetail.SupervisorName,
        userDetail.Accode,
        userDetail.BranchName,
        userDetail.BranchOid,
        userDetail.UUID,
      ]
    );
    return "Success You May Login Now";
  } catch (error) {
    throw error;
  }
}

export async function login(userName, password) {
  try {
    if (!database) {
      await openDatabase();
    }
    const firstRow = await database.getFirstAsync(
      "SELECT * FROM userDetail WHERE userName = ? and Pwd=?",
      userName,
      password
    );
    if (!firstRow) {
      return null;
    } else {
      const userData = {
        SupervisorName: firstRow.SupervisorName,
        Accode: firstRow.Accode,
        BranchName: firstRow.BranchName,
        BranchOid: firstRow.BranchOid,
        UUID: firstRow.ImeiNo,
        UserName: firstRow.UserName,
      };
      return userData;
    }
  } catch (error) {
    //console.error(error);
    throw new Error(
      `Could not log you in. Due to ${error} this issue. Contact Your Admin !`
    );
  }
}
