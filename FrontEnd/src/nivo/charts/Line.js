// 선차트 컴포넌트
import { ResponsiveLine } from '@nivo/line';

const LineChart = ({ data, onClick }) => {

  let min = Infinity;
  let max = -Infinity;

  const lineData = (data) => {
    const parsedData = [
      { id: '하차', data: [] },
      { id: '승차', data: [] }
    ];
    // 날짜별 승차와 하차 인원 수집
    data.forEach(item => {
      const { date, gubun, total_count } = item;
      const category = gubun === 1 ? '승차' : '하차';

      if (total_count < min) {
        min = total_count;
      }
      if (total_count > max) {
        max = total_count;
      }

      // 데이터 포인트 추가
      parsedData.find(d => d.id === category).data.push({
        x: date,
        y: total_count
      });
    });
    return parsedData;
  };

  return (
    <div style={{ height: '400px', width:"100%" }}>
      <ResponsiveLine
        theme={{
          text: { fontSize: 16 },
          axis: {
            ticks: { text: { fontSize: 14 } },
            legend: { text: { fontSize: 16 } }
          },
          legends: { text: { fontSize: 16 } }
        }}
        data={lineData(data)}
        margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: min-1000 , max: max+1000 }}
        axisTop={null}
        curve="linear"
        axisRight={null}
        onClick={onClick}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: '날짜',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 10,
          tickPadding: 8,
          tickRotation: 0,
          legend: '승객',
          legendPosition: 'middle',
          legendOffset: -55
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 4,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        colors={{ scheme: 'nivo' }}
        lineWidth={2}
        pointSize={10}
        pointColor={{ from: 'color' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel={data.y}
        pointLabelYOffset={-12}
        enableGridX={false}
        useMesh={true}
        tooltip={({ point }) => (
          <div style={{ padding: '5px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
            {point.serieId}: {point.data.yFormatted}
          </div>
        )}
      />
    </div>
  )
}


export default LineChart;
