import React from 'react';
import ImageMapper from 'react-img-mapper';
import { useRecoilState } from 'recoil';
import { snoAtom } from '../SnoAtom';
import { modalAtom } from '../ModalAtom';

const ImageMap = () => {

    const [sno, setSno] = useRecoilState(snoAtom);
    const [modalState, setModalState] = useRecoilState(modalAtom);
    const map = {
        name: 'station-map', areas: [
            // 1호선
            { 'shape': 'rect', 'coords': [1314, 110, 1420, 146], 'alt': '134', 'active': false },
            { 'shape': 'rect', 'coords': [1301, 185, 1420, 219], 'alt': '133', 'active': false },
            { 'shape': 'rect', 'coords': [1321, 265, 1420, 298], 'alt': '132', 'active': false },
            { 'shape': 'rect', 'coords': [1323, 349, 1420, 385], 'alt': '131', 'active': false },
            { 'shape': 'rect', 'coords': [1321, 428, 1420, 464], 'alt': '130', 'active': false },
            { 'shape': 'rect', 'coords': [1323, 501, 1420, 539], 'alt': '129', 'active': false },
            { 'shape': 'rect', 'coords': [1298, 587, 1420, 620], 'alt': '128', 'active': false },
            { 'shape': 'rect', 'coords': [1420, 701, 1298, 668], 'alt': '127', 'active': false },
            { 'shape': 'rect', 'coords': [1321, 742, 1423, 782], 'alt': '126', 'active': false },
            { 'shape': 'rect', 'coords': [1370, 829, 1481, 892], 'alt': '125', 'active': false },
            { 'shape': 'rect', 'coords': [1487, 1012, 1370, 945], 'alt': '124', 'active': false },
            { 'shape': 'rect', 'coords': [1487, 1140, 1376, 1062], 'alt': '123', 'active': false },
            { 'shape': 'rect', 'coords': [1381, 1182, 1476, 1237], 'alt': '122', 'active': false },
            { 'shape': 'rect', 'coords': [1381, 1309, 1476, 1355], 'alt': '121', 'active': false },
            { 'shape': 'rect', 'coords': [1381, 1427, 1476, 1477], 'alt': '120', 'active': false },
            { 'shape': 'rect', 'coords': [1373, 1534, 1478, 1612], 'alt': '119', 'active': false },
            { 'shape': 'rect', 'coords': [1290, 1654, 1415, 1695], 'alt': '118', 'active': false },
            { 'shape': 'rect', 'coords': [1312, 1729, 1415, 1765], 'alt': '117', 'active': false },
            { 'shape': 'rect', 'coords': [1318, 1793, 1415, 1837], 'alt': '116', 'active': false },
            { 'shape': 'rect', 'coords': [1293, 1870, 1417, 1909], 'alt': '115', 'active': false },
            { 'shape': 'rect', 'coords': [1309, 1939, 1415, 1975], 'alt': '114', 'active': false },
            { 'shape': 'rect', 'coords': [1287, 2010, 1415, 2052], 'alt': '113', 'active': false },
            { 'shape': 'rect', 'coords': [1301, 2079, 1395, 2124], 'alt': '112', 'active': false },
            { 'shape': 'rect', 'coords': [1365, 2187, 1271, 2134], 'alt': '111', 'active': false },
            { 'shape': 'rect', 'coords': [1387, 2272, 1273, 2205], 'alt': '110', 'active': false },
            {'shape': 'poly', 'coords': [1190, 2200, 1163, 2200, 1171, 2230, 1226, 2280, 1251, 2263, 1246, 2200, 1229, 2200], 'alt': '109', 'active': false },
            { 'shape': 'poly', 'coords': [1124, 2258, 1168, 2244, 1215, 2280, 1221, 2316, 1179, 2322, 1132, 2322], 'alt': '108', 'active': false },
            { 'shape': 'poly', 'coords': [1046, 2209, 1124, 2203, 1132, 2237, 1085, 2277, 1055, 2277, 1046, 2231], 'alt': '107', 'active': false },
            { 'shape': 'rect', 'coords': [1024, 2275, 960, 2206], 'alt': '106', 'active': false },
            { 'shape': 'rect', 'coords': [886, 2208, 947, 2277], 'alt': '105', 'active': false },
            { 'shape': 'rect', 'coords': [808, 2203, 869, 2278], 'alt': '104', 'active': false },
            { 'shape': 'rect', 'coords': [794, 2278, 730, 2201], 'alt': '103', 'active': false },
            { 'shape': 'rect', 'coords': [645, 2229, 711, 2290], 'alt': '102', 'active': false },
            { 'shape': 'poly', 'coords': [600, 2189, 650, 2181, 656, 2209, 606, 2237, 570, 2250, 548, 2237, 550, 2203, 578, 2187], 'alt': '101', 'active': false },
            { 'shape': 'rect', 'coords': [603, 2133, 501, 2175], 'alt': '100', 'active': false },
            { 'shape': 'rect', 'coords': [481, 2068, 581, 2107], 'alt': '99', 'active': false },
            { 'shape': 'rect', 'coords': [453, 2000, 573, 2040], 'alt': '98', 'active': false },
            { 'shape': 'rect', 'coords': [473, 1922, 570, 1961], 'alt': '97', 'active': false },
            { 'shape': 'rect', 'coords': [423, 1849, 573, 1890], 'alt': '96', 'active': false },
            { 'shape': 'rect', 'coords': [323, 1785, 573, 1821], 'alt': '95', 'active': false },

            //2호선
            { 'shape': 'rect', 'coords': [535, 108, 637, 152], 'alt': '243', 'active': false },
            { 'shape': 'rect', 'coords': [533, 171, 657, 215], 'alt': '242', 'active': false },
            { 'shape': 'rect', 'coords': [533, 245, 805, 289], 'alt': '241', 'active': false },
            { 'shape': 'rect', 'coords': [530, 318, 634, 355], 'alt': '240', 'active': false },
            { 'shape': 'rect', 'coords': [530, 390, 630, 423], 'alt': '239', 'active': false },
            { 'shape': 'rect', 'coords': [530, 462, 634, 502], 'alt': '238', 'active': false },
            { 'shape': 'rect', 'coords': [533, 536, 634, 573], 'alt': '237', 'active': false },
            { 'shape': 'rect', 'coords': [530, 603, 634, 640], 'alt': '236', 'active': false },
            { 'shape': 'rect', 'coords': [523, 674, 637, 717], 'alt': '235', 'active': false },
            { 'shape': 'rect', 'coords': [523, 745, 634, 788], 'alt': '234', 'active': false },
            { 'shape': 'rect', 'coords': [523, 829, 634, 893], 'alt': '233', 'active': false },
            { 'shape': 'rect', 'coords': [526, 926, 634, 970], 'alt': '232', 'active': false },
            { 'shape': 'rect', 'coords': [523, 1008, 634, 1052], 'alt': '231', 'active': false },
            { 'shape': 'rect', 'coords': [520, 1098, 634, 1139], 'alt': '230', 'active': false },
            { 'shape': 'rect', 'coords': [523, 1187, 634, 1227], 'alt': '229', 'active': false },
            { 'shape': 'rect', 'coords': [526, 1270, 637, 1317], 'alt': '228', 'active': false },
            { 'shape': 'rect', 'coords': [523, 1368, 644, 1422], 'alt': '227', 'active': false },
            { 'shape': 'rect', 'coords': [557, 1476, 667, 1540], 'alt': '226', 'active': false },
            { 'shape': 'rect', 'coords': [674, 1533, 748, 1604], 'alt': '225', 'active': false },
            { 'shape': 'rect', 'coords': [775, 1540, 846, 1611], 'alt': '224', 'active': false },
            { 'shape': 'rect', 'coords': [899, 1541, 970, 1611], 'alt': '223', 'active': false },
            { 'shape': 'rect', 'coords': [1000, 1533, 1091, 1611], 'alt': '222', 'active': false },
            { 'shape': 'rect', 'coords': [1121, 1533, 1202, 1611], 'alt': '221', 'active': false },
            { 'shape': 'rect', 'coords': [1252, 1541, 1323, 1611], 'alt': '220', 'active': false },
            { 'shape': 'rect', 'coords': [1511, 1603, 1609, 1670], 'alt': '218', 'active': false },
            { 'shape': 'rect', 'coords': [1572, 1769, 1797, 1843], 'alt': '217', 'active': false },
            { 'shape': 'rect', 'coords': [1609, 1900, 1726, 1958], 'alt': '216', 'active': false },
            { 'shape': 'rect', 'coords': [1767, 1971, 1871, 2045], 'alt': '215', 'active': false },
            { 'shape': 'rect', 'coords': [1921, 1972, 2002, 2046], 'alt': '214', 'active': false },
            { 'shape': 'rect', 'coords': [2049, 1944, 2143, 2018], 'alt': '213', 'active': false },
            { 'shape': 'rect', 'coords': [2113, 1823, 2247, 1907], 'alt': '212', 'active': false },
            { 'shape': 'rect', 'coords': [2167, 1704, 2267, 1752], 'alt': '211', 'active': false },
            { 'shape': 'rect', 'coords': [2140, 1553, 2264, 1614], 'alt': '210', 'active': false },
            { 'shape': 'rect', 'coords': [2163, 1414, 2271, 1471], 'alt': '209', 'active': false },
            { 'shape': 'rect', 'coords': [2214, 1253, 2331, 1314], 'alt': '208', 'active': false },
            { 'shape': 'rect', 'coords': [2227, 1120, 2325, 1173], 'alt': '207', 'active': false },
            { 'shape': 'rect', 'coords': [2294, 1001, 2395, 1102], 'alt': '206', 'active': false },
            { 'shape': 'rect', 'coords': [2409, 900, 2519, 1004], 'alt': '205', 'active': false },
            { 'shape': 'rect', 'coords': [2587, 960, 2667, 1041], 'alt': '204', 'active': false },
            { 'shape': 'rect', 'coords': [2731, 960, 2832, 1037], 'alt': '203', 'active': false },
            { 'shape': 'rect', 'coords': [2903, 919, 2977, 996], 'alt': '202', 'active': false },
            { 'shape': 'rect', 'coords': [2963, 831, 3071, 898], 'alt': '201', 'active': false },

            //3호선
            { 'shape': 'rect', 'coords': [59, 1009, 177, 1080], 'alt': '317', 'active': false },
            { 'shape': 'rect', 'coords': [153, 892, 321, 955], 'alt': '316', 'active': false },
            { 'shape': 'rect', 'coords': [204, 794, 331, 871], 'alt': '315', 'active': false },
            { 'shape': 'rect', 'coords': [382, 824, 459, 894], 'alt': '314', 'active': false },
            { 'shape': 'rect', 'coords': [671, 823, 765, 894], 'alt': '312', 'active': false },
            { 'shape': 'rect', 'coords': [832, 824, 940, 895], 'alt': '311', 'active': false },
            { 'shape': 'rect', 'coords': [1007, 824, 1098, 898], 'alt': '310', 'active': false },
            { 'shape': 'rect', 'coords': [1104, 917, 1229, 974], 'alt': '309', 'active': false },
            { 'shape': 'poly', 'coords': [1131, 1004, 1131, 1051, 1195, 1054, 1235, 1021, 1222, 1007], 'alt': '308', 'active': false },
            { 'shape': 'poly', 'coords': [1094, 1068, 1094, 1108, 1232, 1102, 1272, 1058, 1252, 1038, 1215, 1068], 'alt': '307', 'active': false },
            { 'shape': 'poly', 'coords': [1336, 1139, 1239, 1139, 1239, 1102, 1293, 1098, 1293, 1061, 1336, 1062], 'alt': '306', 'active': false },
            { 'shape': 'rect', 'coords': [1669, 1132, 1578, 1061], 'alt': '304', 'active': false },
            { 'shape': 'rect', 'coords': [1804, 1058, 1891, 1132], 'alt': '303', 'active': false },
            { 'shape': 'rect', 'coords': [2019, 1065, 2103, 1132], 'alt': '302', 'active': false },

            //4호선
            { 'shape': 'rect', 'coords': [1509, 823, 1578, 898], 'alt': '403', 'active': false },
            { 'shape': 'rect', 'coords': [1642, 825, 1711, 897], 'alt': '404', 'active': false },
            { 'shape': 'rect', 'coords': [1753, 823, 1847, 898], 'alt': '405', 'active': false },
            { 'shape': 'rect', 'coords': [1894, 829, 1972, 898], 'alt': '406', 'active': false },
            { 'shape': 'rect', 'coords': [2024, 829, 2102, 898], 'alt': '407', 'active': false },
            { 'shape': 'rect', 'coords': [2146, 779, 2246, 845], 'alt': '408', 'active': false },
            { 'shape': 'rect', 'coords': [2215, 673, 2401, 746], 'alt': '409', 'active': false },
            { 'shape': 'rect', 'coords': [2224, 552, 2326, 601], 'alt': '410', 'active': false },
            { 'shape': 'rect', 'coords': [2224, 441, 2357, 485], 'alt': '411', 'active': false },
            { 'shape': 'rect', 'coords': [2224, 330, 2357, 377], 'alt': '412', 'active': false },
            { 'shape': 'rect', 'coords': [2224, 212, 2337, 261], 'alt': '413', 'active': false },
            { 'shape': 'rect', 'coords': [2215, 103, 2343, 156], 'alt': '414', 'active': false }
        ]
    };
    const handleAreaClick = (area) => {
        setSno(area.alt)
        setModalState({...modalState, isOpen:true});
    };

    const handleAreaTouch = (area) => {
        setSno(area.alt)
        setModalState({...modalState, isOpen:true});
    };

    const url = process.env.REACT_APP_API_URL;

    return (
        <ImageMapper
            // src={`${url}images/station.png`}
            src='/busan_station.png'
            map={map}
            width={3136} // Adjust based on your image size
            onClick={handleAreaClick}
            onTouchEnd={handleAreaTouch}
        />
    );
};

export default ImageMap;