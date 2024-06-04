import serviceAccount from "../../unique-mental-care-firebase-service-account.json"
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();

export const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount),
}) : activeApps[0];