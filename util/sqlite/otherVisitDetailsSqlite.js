import { GetCurrentDate } from "../helper";
import { openDatabase } from "./initializeSqliteDB";

let database;

export async function getTodayOtherVisitDataCheck(SupervisorOid) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const EntryDate = GetCurrentDate();
    const firstRow = await database.getFirstAsync(
      "select Date from OtherVisit where SAccode = ? AND Date = ?",
      [SupervisorOid, EntryDate]
    );
    return !!firstRow;
  } catch (error) {
    console.error("Error fetching Today Other Visit Data Check:", error);
    throw error;
  }
}
