import React, { useEffect, useState } from 'react'

export default function AQI({ sname }) {

    // fetch 데이터
    const [aqiData, setAQIData] = useState();

    // 날짜+시간 생성
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const hour = (today.getHours()-1).toString().padStart(2,'0');
    const yyyymmddhr = parseInt(`${year}${month}${day}${hour}`);


    let url = `https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation`
    url += `?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1`
    url += `&numOfRows=10000&resultType=json&controlnumber=${yyyymmddhr}`

    useEffect(() => {
        jsonGet();
    }, [sname])

    const jsonGet = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // 필요한 데이터만 추출하여 상태로 저장
                const filteredData = data.response.body.items.item
                    .filter(item => item.site === sname);
                // 필터링된 데이터가 있다면 첫 번째 항목을 선택
                if (filteredData.length > 0) {
                    const { site, pm25, pm10 } = filteredData[0];
                    setAQIData({ site, pm25, pm10 });
                } else {
                    setAQIData(null); // 일치하는 데이터가 없으면 null로 설정
                }
            })
            .catch(error => {
                console.error('AQI 데이터 fetch 에러:', error);
            });
    }
    return (
        <div>
            {aqiData && (
                <>
                    <div className='flex gap-3 text-start sm:text-xl md:text-xl font-bold text-slate-700 my-5 justify-center items-center'>
                        <div>{month}월 {day}일 {hour}시 기준</div>
                        <div>
                            <div>미세먼지(PM10) : {aqiData.pm10}</div>
                            <div>초미세먼지(PM2.5) : {aqiData.pm25}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
