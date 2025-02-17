import React from 'react';
import { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data, onClick }) => {

    // 승/하차 버튼용 state
    const [gubun, setGubun] = useState(1)

    // fetch된 data를 파이 차트에 맞게 파싱하는 함수
    const pieData = (gubun) => {
        return data.filter(d => d.gubun === gubun)
            .map(d => ({
                id: d.date,
                label: d.date,
                value: d.total_count
            }));
    };
    return (
        <div style={{ height:'400px', width:"100%" } } className='mb-4'>
            <div className='flex justify-center gap-5 text-xl font-bold'>
                <button
                    className='text-white bg-slate-700 hover:bg-slate-400 focus:outline-none font-medium rounded-full 
                    text-sm px-4 py-2.5 text-center'
                    type="button"
                    name="riding"
                    value="1"
                    onClick={() => setGubun(1)}>승차</button>
                <br />
                <button
                    className='text-white bg-slate-700 hover:bg-slate-400 focus:outline-none font-medium rounded-full 
                    text-sm px-4 py-2.5 text-center'
                    type="button"
                    name="riding"
                    value="0"
                    onClick={() => setGubun(0)}>하차</button>
            </div>
            <ResponsivePie
                theme={{
                    text: { fontSize: 16 },
                    axis: {
                        ticks: { text: { fontSize: 14 } },
                        legend: { text: { fontSize: 16 } }
                    },
                    legends: { text: { fontSize: 16 } }
                }}
                data={pieData(gubun)}  // 선택값에 따라 구분
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeInnerRadiusOffset={10}
                activeOuterRadiusOffset={10}
                motionConfig="wobbly"
                borderWidth={1}
                onClick={onClick}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.5]]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]]
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
            
        </div>
    );
};

export default PieChart;
