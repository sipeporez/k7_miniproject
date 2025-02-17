import { React, useEffect, useState } from 'react';

import BarChart from './charts/Bar';
import HeatMapChart from './charts/Heat';
import LineChart from './charts/Line';
import PieChart from './charts/Pie';
import AQI from './AQI';

import { useRecoilValue } from 'recoil';
import { snoSel } from '../SnoAtom';

import axios from 'axios';


export default function DashBoard({ setSname }) {

  // fetch된 데이터 저장
  const [fetchedData, setFetchedData] = useState("");
  const [stationName, setStationName] = useState("");
  const sno = useRecoilValue(snoSel);
  // 첫 pie 차트에서 추출한 month 데이터 저장
  const [month, setMonth] = useState("");
  // 두번째 bar 차트에서 추출한 day 데이터 저장
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");
  // 세번째 line 차트에서 추출한 date 데이터 저장
  const [date, setDate] = useState("");
  // 차트 드릴링용 state
  const [chartType, setChartType] = useState("pie");
  const [URL_type, setURL_Type] = useState("all");
  // 차트 재 렌더링시 번쩍거림 방지용 로딩
  const [loading, setLoading] = useState(false);

  // 차트 데이터 가져올 백엔드 서버 주소 및 헤더
  // const URL = 'http://localhost:8080/subway/'
  const URL = process.env.REACT_APP_API_URL;
  const header = { headers: { 'Content-Type': 'application/json' } }

  // URL 타입이 변경될때마다 차트를 렌더링
  useEffect(() => {
    fetchData();
  }, [sno, URL_type]);

  // h2 태그 출력용 함수
  const loadH2 = () => {
    if (fetchedData) {
      if (chartType === "pie") return <h2 className="text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 my-3">{stationName}역 기간별 탑승객</h2>;
      else if (chartType === "bar") return <h2 className="text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 my-3">{stationName}역<br /> {month}월 탑승객</h2>;
      else if (chartType === "line") return <h2 className="text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 my-3">{stationName}역<br /> {month}월 {day1}일 ~ {day2}일 탑승객</h2>;
      else if (chartType === "heatmap") return <h2 className="text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-700 my-3">{stationName}역<br /> {date.slice(6).replace("-", "월 ")}일 시간대별 탑승객</h2>;
    }
  }

  // 차트 그리기용 함수
  const loadChart = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (fetchedData) {
      if (chartType === "pie") return <PieChart data={fetchedData} onClick={handlePieClick} />;
      else if (chartType === "bar") return <BarChart data={fetchedData} onClick={handleBarClick} />;
      else if (chartType === "line") return <LineChart data={fetchedData} onClick={handleLineClick} />;
      else if (chartType === "heatmap") return <HeatMapChart data={fetchedData} onClick={handleHeatmapClick} />;
    }
  }

  // 백엔드 fetch 함수
  const fetchData = async () => {
    const postJSON = JSON.stringify(
      {
        "station_no": sno,
        "date": [date],
        "month": month,
        "day1": day1,
        "day2": day2,
      }
    );
    try {
      await axios.post(URL + "subway/" + URL_type, postJSON, header)
        .then(resp => {
          setStationName(resp.data[0].station_name);
          setSname(resp.data[0].station_name);
          setFetchedData(resp.data);
        })
    } catch (error) {
      console.log("에러발생 : " + error);
    } finally {
      setLoading(false);
    }
  };

  // 파이차트 클릭시 이벤트
  const handlePieClick = (e) => {
    setLoading(true)
    setChartType("bar");
    setURL_Type("month");
    setMonth(e.data.id.slice(6));
  }

  // 바 차트 클릭시 이벤트
  const handleBarClick = (e) => {
    setDay1(e.data.date.slice(3, 5))
    setDay2(e.data.date.slice(11, 13))
    setChartType("line");
    setURL_Type("week");
    // 1주일치 차트 -> 라인차트로 표시
  }

  // 라인 차트 클릭시 이벤트
  const handleLineClick = (e) => {
    setDate(e.data.x)
    setChartType("heatmap")
    setURL_Type("date")
  }

  // 히트맵 차트 클릭시 이벤트
  const handleHeatmapClick = (e) => {
    setChartType("pie");
    setURL_Type("all")
  }

  return (
    <div >
      <div>
        {loadH2()}
        {loadChart()}
        <AQI sname={stationName} />
      </div>
    </div>
  )
}