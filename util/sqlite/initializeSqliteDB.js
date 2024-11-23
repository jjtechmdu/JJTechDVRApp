import * as SQLite from "expo-sqlite";
import { sqliteDbName } from "../../constants/global";
import { GetCurrentDate } from "../helper";

let database;

export async function openDatabase() {
  try {
    if (!database) {
      database = await SQLite.openDatabaseAsync(sqliteDbName);
      await database.execAsync("PRAGMA journal_mode = WAL");
    }
    return database;
  } catch (error) {
    console.warn(error);
    throw error;
  }
}

export async function CreateTables() {
  try {
    await openDatabase();
    if (database) {
      await database.execAsync(`
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
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS ReasonCreation (ReasonOid text,ReasonName text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS ItemMaster (ICode text,IName text,Uom text,UomOid text,PSize integer,Price integer,BatchName text ,Sno text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS BatchCreation(BATCHNAME text,SNO text,NOC Numeric(10,0),ACCODE text,CUMULATIVEMORTALITY Numeric(10,0),OPENINGSTOCK Numeric(18,3),AGE integer,BIRDSTOCK Numeric(10,0),DATEONAGEZERO datetime,PREVIOUSUPDATEDDATE datetime,CurrentStock numeric(18,2),CumulativeConsumption numeric(18,2),BranchName text,BranchOid text,FarmType text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS DailyTripSheet(SupervisorName text,SupervisorOid text,EntryDate Datetime,Mno text,OpeningKm Numeric(18,2),ClosingKm Numeric(18,2),StartTime text,ClosingTime text,VehicleNo text,VehicleNoOid text,CreatedBy text,Createdat datetime,sstatus text,BranchName text,BranchOid text,Openlat text,Openlng text,Clslat text,Clslng text,TripClose text,CurrentReading Numeric(18,2),OpeningKMImagePath text,ClosingKMImagePath text,OpeningImageUpload text,ClosingKMImageUpload text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS TwoWheelerVehicleNo (VehicleNo text,VehicleNoOid text,PreviousUpdatedClosingKm Numeric(18,2));`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS ServerDate (ServerCurrentDate DateTime,ServerCurrentDateTime DateTime);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS DailyEntry (DailyEntryOid text,BatchName text,Sno text,Mortality integer,MortalityReason1 text,MortalityReason1Oid text,Mortality1 integer,MortalityReason2 text,MortalityReason2Oid text,Mortality2 integer,MortalityReason3 text,MortalityReason3Oid text,Mortality3 integer,MortalityReason4 text,MortalityReason4Oid text,Mortality4 integer,MortalityReason5 text,MortalityReason5Oid text,Mortality5 integer,MortalityReason6 text,MortalityReason6Oid text,Mortality6 integer,MortalityReason7 text,MortalityReason7Oid text,Mortality7 integer,MortalityReason8 text,MortalityReason8Oid text,Mortality8 integer,MortalityReason9 text,MortalityReason9Oid text,Mortality9 integer,MortalityReason10 text,MortalityReason10Oid text,Mortality10 integer,MortalityImagePath1 text,MortalityImagePath2 text,MortalityImagePath3 text,MortalityImagePath4 text,MortalityImagePath5 text,MortalityImagePath6 text,MortalityImagePath7 text,MortalityImagePath8 text,MortalityImagePath9 text,MortalityImagePath10 text,MortalityImageUpload1 text,MortalityImageUpload2 text,MortalityImageUpload3 text,MortalityImageUpload4 text,MortalityImageUpload5 text,MortalityImageUpload6 text,MortalityImageUpload7 text,MortalityImageUpload8 text,MortalityImageUpload9 text,MortalityImageUpload10 text,FeedIntake1 Numeric(18,3),BodyWeight Numeric(18,3),CreatedAt datetime,SStatus text,lat text,lng text,EntryDate datetime,Narration text,SupervisorName text,SAccode text,CreatedBy text,BranchName text,BranchOid text,IMEI text,InTime text,OutTime text,KmReading Numeric(18,2),ManualFcr Numeric(18,3),PhyStock Numeric(18,3));`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS fdc (DcNo text, BillNo text, DcDate Datetime, BatchName text,Sno text, Iname text, Quantity integer, ReceiptQty integer, Mno text, DcMno text,ApprovalStatus text,SStatus text,ApprovalDate Datetime);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS cdc (DcNo text, BillNo text, DcDate Datetime, BatchName text,Sno text, Iname text, Quantity integer, ReceiptQty integer, Mno text, DcMno text,ApprovalStatus text,SStatus text,ApprovalDate Datetime);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS mdc (DcNo text, BillNo text, DcDate Datetime, BatchName text,Sno text, Iname text, Quantity integer, ReceiptQty integer, Mno text, DcMno text,ApprovalStatus text,SStatus text,ApprovalDate Datetime);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS Ftrndc (BillNo text,DcDate Datetime, BatchNameFrom text,SnoFrom text,AccodeFrom text,BatchNameTo text,SnoTo text,AccodeTo text,NetAmount integer,VehicleNo text,Mno text,CreatedBy text,CreatedAt Datetime,SStatus text,Incharge text, InchargeOid text,BranchName text, BranchOid text,FreightPaidBy text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS iFtrndc (DcDate Datetime,SnoFrom text,AccodeFrom text,SnoTo text,AccodeTo text, Iname text,ICode text,Uom text,UomOid text,Packing integer,Nos integer, Quantity integer, Price integer,TotalAmount integer, Mno text, DcMno text,SStatus text,BranchName text, BranchOid text);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS FtrndcApproval (BatchNameFrom text,SnoFrom text,BatchNameTo text,SnoTo text,Quantity integer,Mno text,DcMno text,Iname text,SStatus text,ApprovalStatus text, ApprovalDate Datetime);`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS OtherVisit (Mno text,Batch text,Sno text,Date DateTime,Narration text,KmReading integer,Supervisor text,SAccode text,CreatedAt DateTime,CreatedBy text,BranchName text,BranchOid text,lat text,lng text,SStatus text,RNo Numeric(18,0),CType text,FName text,FPath text,EntryOid text,RCount numeric(18,0));`
      );
      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS BodyWgt (EntryDate datetime,Mno text,DailyEntryOid text,BatchName text,Sno text,Wgt Numeric(18,3),Nobs Numeric(18,0),Age integer,Incharge text,InchargeOid text,CreatedAt DateTime,CreatedBy text,BranchName text,BranchOid text,SStatus text,RCount integer);`
      );
    }
    return "Tables created successfully!";
  } catch (error) {
    throw error;
  }
}

export async function dropAndCreateTables() {
  if (!database) {
    await openDatabase();
  }
  const tableArr = [
    "ReasonCreation",
    "ItemMaster",
    "BatchCreation",
    "TwoWheelerVehicleNo",
    "ServerDate",
    "FtrndcApproval",
    "cdc",
    "fdc",
    "mdc",
    "BodyWgt",
  ];
  try {
    for (const data of tableArr) {
      await database.execAsync(`DROP TABLE IF EXISTS ${data};`);
    }
    await CreateTables();
  } catch (error) {
    throw error;
  }
}

export async function FlushData() {
  if (!database) {
    await openDatabase();
  }
  const CurrentDateWithoutTime = GetCurrentDate();
  const dataArr = [
    {
      tableName: "DailyEntry",
      col1: "CreatedAt",
      col2: "Sstatus",
      col3: null,
      values: [CurrentDateWithoutTime, "Y", "E"],
    },
    {
      tableName: "DailyTripSheet",
      col1: "CreatedAt",
      col2: "Sstatus",
      col3: "TripClose",
      values: [CurrentDateWithoutTime, "Y", "E", "Y"],
    },
    {
      tableName: "BodyWgt",
      col1: "CreatedAt",
      col2: "Sstatus",
      col3: null,
      values: [CurrentDateWithoutTime, "Y", "E"],
    },
    {
      tableName: "cdc",
      col1: "ApprovalDate",
      col2: "Sstatus",
      col3: "ApprovalStatus",
      values: [CurrentDateWithoutTime, "Y", "E", "Y"],
    },
    {
      tableName: "fdc",
      col1: "ApprovalDate",
      col2: "Sstatus",
      col3: "ApprovalStatus",
      values: [CurrentDateWithoutTime, "Y", "E", "Y"],
    },
    {
      tableName: "mdc",
      col1: "ApprovalDate",
      col2: "Sstatus",
      col3: "ApprovalStatus",
      values: [CurrentDateWithoutTime, "Y", "E", "Y"],
    },
    {
      tableName: "Ftrndc",
      col1: "DcDate",
      col2: "Sstatus",
      col3: null,
      values: [CurrentDateWithoutTime, "Y", "E"],
    },
    {
      tableName: "iFtrndc",
      col1: "DcDate",
      col2: "Sstatus",
      col3: null,
      values: [CurrentDateWithoutTime, "Y", "E"],
    },
    {
      tableName: "FtrndcApproval",
      col1: "ApprovalDate",
      col2: "Sstatus",
      col3: "ApprovalStatus",
      values: [CurrentDateWithoutTime, "Y", "E", "Y"],
    },
    {
      tableName: "OtherVisit",
      col1: "CreatedAt",
      col2: "Sstatus",
      col3: null,
      values: [CurrentDateWithoutTime, "Y", "E"],
    },
  ];
  try {
    for (const data of dataArr) {
      const query = data.col3
        ? `DELETE FROM ${data.tableName} WHERE ${data.col1} < ? AND ${data.col2} IN (?, ?) AND ${data.col3} = ?`
        : `DELETE FROM ${data.tableName} WHERE ${data.col1} < ? AND ${data.col2} IN (?, ?)`;

      await database.runAsync(query, data.values);
    }
  } catch (error) {
    throw error;
  }
}

export async function dropAllTables() {
  if (!database) {
    await openDatabase();
  }
  const tableArr = [
    "ReasonCreation",
    "ItemMaster",
    "BatchCreation",
    "TwoWheelerVehicleNo",
    "ServerDate",
    "FtrndcApproval",
    "cdc",
    "fdc",
    "mdc",
    "BodyWgt",
    "DailyEntry",
    "DailyTripSheet",
    "OtherVisit",
    "Ftrndc",
    "iFtrndc",
  ];
  try {
    for (const data of tableArr) {
      await database.execAsync(`DROP TABLE IF EXISTS ${data};`);
    }
    await CreateTables();
  } catch (error) {
    throw error;
  }
}
