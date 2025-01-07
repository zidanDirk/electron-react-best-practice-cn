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

type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData
}

interface Window {
    electron: {
        subscribeStatistics : (callback: (statistics: Statistics) => void) => void;
        getStaticData: () => Promise<StaticData>
    }
}