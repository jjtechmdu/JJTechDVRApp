import { GetCurrentDate } from "../helper";
import { openDatabase } from "./initializeSqliteDB";

let database;

export async function getTodayDVRDataCheck(SupervisorOid) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const EntryDate = GetCurrentDate();
    const firstRow = await database.getFirstAsync(
      "select EntryDate from DailyEntry where SAccode = ? AND EntryDate = ?",
      [SupervisorOid, EntryDate]
    );
    return !!firstRow;
  } catch (error) {
    console.error("Error fetching Today DVR Data Check:", error);
    throw error;
  }
}
