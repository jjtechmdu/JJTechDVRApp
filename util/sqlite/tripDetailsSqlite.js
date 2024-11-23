import { GetCurrentDate } from "../helper";
import { openDatabase } from "./initializeSqliteDB";

let database;
export async function getVehicleList() {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const result = await database.getAllAsync(
      "select * from TwoWheelerVehicleNo"
    );
    return result;
  } catch (error) {
    console.error("Error fetching Velicle List:", error);
    throw error;
  }
}

export async function PreviousTripClosedCheck(SupervisorOid) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const EntryDate = GetCurrentDate();
    const firstRow = await database.getFirstAsync(
      "select TripClose from DailyTripSheet where SupervisorOid = ? AND EntryDate < ? and TripClose = ?",
      [SupervisorOid, EntryDate, "N"]
    );
    return !!firstRow;
  } catch (error) {
    console.error("Error fetching Previous Trip Closed Check:", error);
    throw error;
  }
}

export async function getTodayTripData(SupervisorOid) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const EntryDate = GetCurrentDate();
    const firstRow = await database.getFirstAsync(
      "select OpeningKm,ClosingKm,VehicleNo,VehicleNoOid,TripClose,EntryDate,OpeningKMImagePath,ClosingKMImagePath,OpeningImageUpload,ClosingKMImageUpload from DailyTripSheet where SupervisorOid = ? AND EntryDate = ?",
      [SupervisorOid, EntryDate]
    );
    //return !firstRow ? null : firstRow;
    return firstRow;
  } catch (error) {
    console.error("Error fetching Today Trip Data Check:", error);
    throw error;
  }
}
