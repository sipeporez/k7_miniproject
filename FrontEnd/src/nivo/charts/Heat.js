// 히트맵
import { ResponsiveHeatMap } from '@nivo/heatmap';

const HeatMapChart = ({ data, onClick, onStyle }) => {
  let max = 0;
  let keylist = [];
  // 히트맵 범위 설정용 최댓값 찾기
  const transformData = (data) => {
    max = Math.max(
      ...data.flatMap(item =>
        Object.keys(item)
          .filter(key => key.startsWith('hour_'))
          .map(key => item[key])
      )
    ) + 500;

    keylist = data.flatMap(item =>
      Object.keys(item)
        .filter(key => key.startsWith('hour_'))
        .map(key => key.slice(5, 10).replace("_", "~"))
    );
    const transformed = data.flatMap(item => {
      return Object.keys(item)
        .filter(key => key.startsWith('hour_'))
        .map(key => ({
          id: key.slice(5, 10).replace("_", "~"),
          data: [
            {
              x: item.gubun === 1 ? '승차' : '하차',
              y: item[key]
            }
          ]
        }));
    });
    return transformed;
  }
  return (
    <div style={{ height: '400px', width:"100%"  }}>
      <ResponsiveHeatMap
        theme={{
          text: { fontSize: 16 },
          axisTop: {ticks: { text: { fontSize: 14 } }},
        }}
        data={transformData(data)}
        key={keylist}
        margin={{ top: 50, right: 60, bottom: 60, left: 80 }}
        onClick={onClick}
        colors={{
          type: 'sequential',
          scheme: 'blues',
          divergeAt: 0.5,
          minValue: 0,
          maxValue: max
        }}
        cellBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
        animate={true}
        motionConfig="gentle"
        hoverTarget="row"
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 40,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 5,
            tickSpacing: 6,
            tickOverlap: false,
            title: '승객 →',
            titleAlign: 'start',
            titleOffset: 4
          }
        ]}
      />
    </div>
  );
};
export default HeatMapChart;
