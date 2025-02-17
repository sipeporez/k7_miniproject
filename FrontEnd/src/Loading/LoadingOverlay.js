// src/LoadingOverlay.js
import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ isVisible }) => {
    return (
        <div
            className={`fixed inset-0 bg-slate-600 transition-opacity ${isVisible ? 'opacity-100 duration-0' : 'opacity-0 duration-500 pointer-events-none'
                } z-[9999]`}
        >
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <img
                    src="./images/humetro.png" // 이미지 경로
                    alt="부산 지하철 로딩"
                    className='mt-20 w-1/5 h-1/5 sm:w-2/5 sm:h-2/5 lg:w-3/5 lg:h-3/5'/>
                <div className="flex justify-center h-full text-white pt-20">
                    <p className='sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-p'>부산 지하철 이용 현황 분석 웹 서비스</p>
                </div>
            </div>
        </div>
    );
};


export default LoadingOverlay;
