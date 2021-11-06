import axios from 'axios';
import DeviceDetector from "device-detector-js";

interface Item {
  id: string;
  rating: number;
  comment: string;
  browser: { userAgent: string; };
}
interface IResponse {
    items: Item[],
    count: number,
    count_nolimit: number,
    total: number
}

export interface IFeedback {
    id: string;
    rating: number;
    comment: string;
    device: string | undefined;
    platform: string | undefined;
    browser: { name: string | undefined; version: string | undefined };
}


const deviceDetector = new DeviceDetector();
const URL = 'https://cache.usabilla.com/example/apidemo.json';

export async function fetchFeedbackApi(): Promise<{ items: IFeedback[]; error: boolean }> {
  try {
    const { data } = await axios.get<IResponse>(URL);
    
    const items: IFeedback[] = data.items.map((item: Item) => {
        const deviceData = deviceDetector.parse(item.browser.userAgent);
        return {
            id: item.id,
            rating: item.rating,
            comment: item.comment,
            device: deviceData.device?.type,
            platform: `${deviceData.os?.name} ${deviceData.os?.version}`,
            browser: { name: deviceData.client?.name, version: deviceData.client?.version }
        };
    });

    return { items, error: false }
  } catch(e) {
    return { items: [], error: true };
  }
}
