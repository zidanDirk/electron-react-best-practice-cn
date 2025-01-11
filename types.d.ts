type Statistics = {
    cupUsage: number;
    ramUsage: number;
    storageData: number;
};

type StaticData = {
    totalStorage: number;
    cupModel: string;
    totalMemoryGB: number;
};


type View = "CPU" | "RAM" | "STROAGE"

type FrameWindowAction = "CLOSE" | "MAXMIZE" | "MINIMIZE"

type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
    changeView: View;
    sendFrameAction: FrameWindowAction
}

type UnsubscribeFunction = () => void

interface Window {
    electron: {
        subscribeStatistics : (callback: (statistics: Statistics) => void) => UnsubscribeFunction;
        getStaticData: () => Promise<StaticData>;
        subscribeChangeView: (
            callback: (view: View) => void
        ) => UnsubscribeFunction;
        sendFrameAction: (payload: FrameWindowAction) => void;
    }
}