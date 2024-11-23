import { openDatabase } from "./initializeSqliteDB";

let database;

export async function insertBatchDataToSqlite(BatchData) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const tableName = "BatchCreation";
    const columnMapping = {
      BatchName: "BATCHNAME",
      Sno: "SNO",
      Accode: "ACCODE",
      Noc: "NOC",
      CumulativeMortality: "CUMULATIVEMORTALITY",
      OpeningStock: "OPENINGSTOCK",
      Age: "AGE",
      DateOnAgeZero: "DATEONAGEZERO",
      PreviousUpdatedDate: "PREVIOUSUPDATEDDATE",
      BirdStock: "CurrentStock",
      CumulativeConsumption: "CumulativeConsumption",
      BranchName: "BranchName",
      BranchOid: "BranchOid",
      FarmType: "FarmType",
    };
    await database.withTransactionAsync(async () => {
      for (const BData of BatchData) {
        const columns = Object.values(columnMapping).join(", ");
        const valuesPlaceholders = Object.keys(columnMapping)
          .map(() => "?")
          .join(", ");
        // Map the values based on the mapping
        const values = Object.keys(columnMapping).map((key) =>
          BData[key] === undefined || BData[key] === null ? null : BData[key]
        );
        // console.log(BData);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders});`;
        //  console.log(values);
        try {
          await database.runAsync(query, values);
        } catch (error) {
          console.error("Insert failed for:", BData, error);
          throw error; // Stop the transaction on failure
        }
      }
    });
    const result = await database.getAllAsync(
      `select count(*) as count from ${tableName}`
    );
    console.log(`Batch Data count: ${result[0].count}`);

    return "Batch Data inserted Successfully";
  } catch (error) {
    console.error("Error inserting Batch Data:", error);
    throw error;
  }
}

export async function insertReasonDataToSqlite(ReasonData) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const tableName = "ReasonCreation";
    const columnMapping = {
      ReasonOid: "ReasonOid",
      ReasonName: "ReasonName",
    };
    await database.withTransactionAsync(async () => {
      for (const RData of ReasonData) {
        const columns = Object.values(columnMapping).join(", ");
        const valuesPlaceholders = Object.keys(columnMapping)
          .map(() => "?")
          .join(", ");
        // Map the values based on the mapping
        const values = Object.keys(columnMapping).map((key) =>
          RData[key] === undefined || RData[key] === null ? null : RData[key]
        );
        // console.log(BData);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders});`;
        //  console.log(values);
        try {
          await database.runAsync(query, values);
        } catch (error) {
          console.error("Insert failed for:", RData, error);
          throw error; // Stop the transaction on failure
        }
      }
    });
    const result = await database.getAllAsync(
      `select count(*) as count from ${tableName}`
    );
    console.log(`Reason Data count: ${result[0].count}`);

    return "Reason Data inserted Successfully";
  } catch (error) {
    console.error("Error inserting Reason Data:", error);
    throw error;
  }
}

export async function insertItemDataToSqlite(ItemData) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const tableName = "ItemMaster";
    const columnMapping = {
      Icode: "ICode",
      Iname: "IName",
      Uom: "Uom",
      UomOid: "UomOid",
      PSize: "PSize",
      Price: "Price",
      BatchName: "BatchName",
      Sno: "Sno",
    };
    await database.withTransactionAsync(async () => {
      for (const IData of ItemData) {
        const columns = Object.values(columnMapping).join(", ");
        const valuesPlaceholders = Object.keys(columnMapping)
          .map(() => "?")
          .join(", ");
        // Map the values based on the mapping
        const values = Object.keys(columnMapping).map((key) =>
          IData[key] === undefined || IData[key] === null ? null : IData[key]
        );

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders});`;

        try {
          await database.runAsync(query, values);
        } catch (error) {
          console.error("Insert failed for:", IData, error);
          throw error; // Stop the transaction on failure
        }
      }
    });
    const result = await database.getAllAsync(
      `select count(*) as count from ${tableName}`
    );
    console.log(`Item Data count: ${result[0].count}`);

    return "Item Data inserted Successfully";
  } catch (error) {
    console.error("Error inserting Item Data:", error);
    throw error;
  }
}

export async function insertVehicleDataToSqlite(VehicleData) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const tableName = "TwoWheelerVehicleNo";
    const columnMapping = {
      VehicleNo: "VehicleNo",
      VehicleNoOid: "VehicleNoOid",
      PreviousUpdatedClosingKm: "PreviousUpdatedClosingKm",
    };
    await database.withTransactionAsync(async () => {
      for (const VData of VehicleData) {
        const columns = Object.values(columnMapping).join(", ");
        const valuesPlaceholders = Object.keys(columnMapping)
          .map(() => "?")
          .join(", ");
        // Map the values based on the mapping
        const values = Object.keys(columnMapping).map((key) =>
          VData[key] === undefined || VData[key] === null ? null : VData[key]
        );

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders});`;

        try {
          await database.runAsync(query, values);
        } catch (error) {
          console.error("Insert failed for:", VData, error);
          throw error; // Stop the transaction on failure
        }
      }
    });
    const result = await database.getAllAsync(
      `select count(*) as count from ${tableName}`
    );
    console.log(`Vehicle Data count: ${result[0].count}`);

    return "Vehicle Data inserted Successfully";
  } catch (error) {
    console.error("Error inserting Vehicle Data:", error);
    throw error;
  }
}

export async function insertServerDateDataToSqlite(ServerDateData) {
  try {
    if (!database) {
      database = await openDatabase();
    }
    console.log(ServerDateData);
    const tableName = "ServerDate";
    const columnMapping = {
      ServerCurrentDate: "ServerCurrentDate",
      ServerCurrentDateTime: "ServerCurrentDateTime",
    };
    await database.withTransactionAsync(async () => {
      for (const SData of ServerDateData) {
        const columns = Object.values(columnMapping).join(", ");
        const valuesPlaceholders = Object.keys(columnMapping)
          .map(() => "?")
          .join(", ");
        // Map the values based on the mapping
        const values = Object.keys(columnMapping).map((key) =>
          SData[key] === undefined || SData[key] === null ? null : SData[key]
        );
        // console.log(BData);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders});`;
        //  console.log(values);
        try {
          await database.runAsync(query, values);
        } catch (error) {
          console.error("Insert failed for:", SData, error);
          throw error; // Stop the transaction on failure
        }
      }
    });

    const result = await database.getAllAsync(
      `select count(*) as count from ${tableName}`
    );
    console.log(`ServerDate Data count: ${result[0].count}`);

    return "ServerDate Data inserted Successfully";
  } catch (error) {
    console.error("Error inserting ServerDate Data:", error);
    throw error;
  }
}

export async function getLastPulledOn() {
  try {
    if (!database) {
      database = await openDatabase();
    }
    const result = await database.getFirstAsync(
      `select ServerCurrentDateTime from ServerDate`
    );
    //console.log(`Server Current Date: ${result.ServerCurrentDateTime}`);
    return result.ServerCurrentDateTime;
  } catch (error) {
    console.error("Error fetching Last Pulled on:", error);
    throw error;
  }
}

//DeleteUploadedImage();
