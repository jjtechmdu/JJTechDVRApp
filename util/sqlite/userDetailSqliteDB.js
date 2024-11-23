//import * as SQLite from "expo-sqlite";

import { openDatabase, CreateTables } from "./initializeSqliteDB";

let database;

// Function to initialize the database and create the table if it doesn't exist
export async function init() {
  try {
    if (!database) {
      database = await openDatabase();
    }
    if (database) {
      // Set the journal mode to WAL and create the table
      await CreateTables();
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

export async function deleteUserDataFromSqlite() {
  if (!database) {
    database = await openDatabase();
  }
  await database.runAsync("DELETE FROM userDetail");
}

export async function insertUserDataToSqlite(userDetail) {
  try {
    if (!database) {
      database = await openDatabase();
    }

    await deleteUserDataFromSqlite();
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

export async function validateUserData(userDetail) {
  try {
    if (!database) {
      await openDatabase();
    }
    const firstRow = await database.getFirstAsync(
      "SELECT * FROM userDetail WHERE userName = ? and UserNameOid=? and Pwd=? and SupervisorName=? and Accode=? and BranchOid=? and ImeiNo=?",
      [
        userDetail.UserName,
        userDetail.UserNameOid,
        userDetail.Pwd,
        userDetail.SupervisorName,
        userDetail.Accode,
        userDetail.BranchOid,
        userDetail.UUID,
      ]
    );
    if (!firstRow) {
      return null;
    } else {
      return true;
    }
  } catch (error) {
    //console.error(error);
    throw new Error(
      `User data check failed. Due to ${error} this issue. Contact Your Admin !`
    );
  }
}
