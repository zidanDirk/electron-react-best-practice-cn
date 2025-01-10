import { ResponsiveContainer, CartesianGrid, Area, AreaChart, XAxis } from 'recharts';

type BaseChartProps = {
    data: Array<{ value: number }>
}

export const BaseChart = (props: BaseChartProps) => {
    return (
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <AreaChart data={props.data}>
                <CartesianGrid stroke='#333' fill='#1C1C1C' strokeDasharray="5 5"></CartesianGrid>
                <Area
                    fillOpacity={0.3}
                    fill='#0A4D5C'
                    stroke='#5DD4EE'
                    strokeWidth={3}
                    type={"monotone"}
                    dataKey="value"
                    isAnimationActive={false}
                ></Area>
                <XAxis stroke='transparent' height={0}></XAxis>
            </AreaChart>
        </ResponsiveContainer>
      )
};