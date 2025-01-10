import { useMemo } from 'react'
import { BaseChart } from './BaseChart'

export type ChartProps = {
    data: number[];
    maxDataPoints: number;
}

export function Chart (props: ChartProps) {
    const preparedData = useMemo(() => {
        const points =  props.data.map(d => ({
            value: d
        }))
        
        return [
            ...points,
            ...Array.from({length: props.maxDataPoints - points.length}).map(() => ({value: 0}))
        ]
    }, [props.data, props.maxDataPoints])
    return <BaseChart data={preparedData}></BaseChart>

}