// 바 차트
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data, onClick }) => {

  // fetch된 data를 바 차트에 맞게 파싱하는 함수
  const barData = (data) => {
    const parsedData = data.reduce((dt, { date, gubun, total_count }) => {
      // gubun 값에 따라 승차/하차로 키 구분
      const key = gubun === 1 ? "승차" : "하차";
      // 날짜 형식 변환
      const formattedDate = date.substring(5,10) + " ~ " + date.substring(18,25); // date의 MM-DD 부분을 추출
      // 같은 날짜의 데이터가 이미 있는지 확인
      let duplicationData = dt.find(d => d.date === formattedDate);
      if (duplicationData) {
        // 이미 있는 경우, 해당 키에 데이터 추가
        duplicationData[key] = total_count;
      } else {
        // 없는 경우, 새로운 객체로 추가
        dt.push({
          date: formattedDate,
          [key]: total_count
        });
      }
      return dt;
    }, []);
    return parsedData; // 변환된 데이터를 반환

  };
  return (
    <div style={{ height: '400px', width:"100%"  }}>
      <ResponsiveBar
        theme={{
          text: { fontSize: 16 },
          axis: {
            ticks: { text: { fontSize: 14 } },
            legend: { text: { fontSize: 16 } }
          },
          legends: { text: { fontSize: 16 } }
        }}
        data={barData(data)}  // 파싱된 데이터가 들어갈 곳
        keys={['승차', '하차']} // 키 이름에 따라 누적 막대 차트로 구분
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
        padding={0.3}
        colors={{ scheme: 'pastel1' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        onClick={onClick}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: '기간', // 범례 이름 설정 (x축)
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '승객',  // 범례 이름 설정 (y축)
          legendPosition: 'middle',
          legendOffset: -65,
        }}
        legends={[
          {
              dataFrom: 'keys',
              anchor: 'right',
              direction: 'column',
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
        tooltip={({ id, value }) => (
          <div style={{ padding: '5px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
            {id}: {value}
          </div>
        )}
      />
    </div>
  );
};
export default BarChart;
