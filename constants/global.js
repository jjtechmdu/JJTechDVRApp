import Screen from "../model/screen";

export const MAIN_URL =
  "http://125.23.114.67/JJNFSBroilerDVRAPI/api/JJDailyEntryAPI";
export const sqliteDbName = "JJNFSBroilerDVRDB.db";
export const AppName = "BroilerDVR";

export const SCREENLIST = [
  new Screen("s1", "Trip Open", "#f5f5dc", "Trip Open", "directions-bike"),
  new Screen("s2", "Scan", "#f5f5dc", "Scan", "qr-code-scanner"),
  new Screen("s3", "Feed Transfer", "#f5f5dc", "Feed Transfer", "fire-truck"),
  new Screen("s4", "Other Visit", "#f5f5dc", "Other Visit", "qr-code-scanner"),
  new Screen("s5", "Trip Close", "#f5f5dc", "Trip Close", "directions-bike"),
  new Screen("s6", "Trip Reopen", "#f5f5dc", "Trip Reopen", "directions-bike"),
  new Screen("s7", "Report", "#f5f5dc", "Report", "insert-drive-file"),
];
