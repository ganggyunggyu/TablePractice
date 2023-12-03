import { useState } from 'react';
import PropTypes from 'prop-types';
import Thead from './Thead';
import Tbody from './Tbody';
export default function TableItem({ title }) {
  const [seletId, setSeletId] = useState(0);
  const [tbodyInfos, setTbodyInfos] = useState([
    {
      이수: '전공',
      필수: '필수',
      과목명: '',
      학점: '',
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      평균: 0,
      성적: '',
    },
  ]);
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, '']);

  const get성적 = (총점) => {
    if (총점 >= 95) return 'A+';
    if (총점 >= 90) return 'A';
    if (총점 >= 85) return 'B+';
    if (총점 >= 80) return 'B0';
    if (총점 >= 75) return 'C+';
    if (총점 >= 70) return 'C0+';
    if (총점 >= 65) return 'D+';
    if (총점 >= 60) return 'D0';
    if (총점 < 60) return 'F';
  };

  const resultCalc = (tbodyInfos) => {
    const copyResult = [];
    let 총학점 = 0;
    let 총출석점수 = 0;
    let 총과제점수 = 0;
    let 총중간고사 = 0;
    let 총기말고사 = 0;
    let 총총점 = 0;
    let cnt = tbodyInfos.length;
    for (const tbodyInfo of tbodyInfos) {
      if (tbodyInfo.학점 === 1) {
        cnt = cnt - 1;
        continue;
      } else {
        총학점 = 총학점 + +tbodyInfo.학점;
        총출석점수 = 총출석점수 + +tbodyInfo.출석점수;
        총과제점수 = 총과제점수 + +tbodyInfo.과제점수;
        총중간고사 = 총중간고사 + +tbodyInfo.중간고사;
        총기말고사 = 총기말고사 + +tbodyInfo.기말고사;
        총총점 = 총총점 + +tbodyInfo.총점;
        console.log(tbodyInfo.총점);
      }
    }
    copyResult.push(총학점);
    copyResult.push(총출석점수);
    copyResult.push(총과제점수);
    copyResult.push(총중간고사);
    copyResult.push(총기말고사);
    copyResult.push(+총총점);
    copyResult.push(+(총총점 / cnt).toFixed(1));
    copyResult.push(get성적(+총총점 / cnt));
    console.log(cnt);
    return copyResult;
  };

  const 저장 = () => {
    const copyResult = resultCalc(tbodyInfos);
    console.log(copyResult);
    setResult(copyResult);
    const copyTbodyInfos = [...tbodyInfos];
    copyTbodyInfos.sort((a, b) => {
      if (a.이수 === b.이수) {
        if (a.필수 === b.필수) {
          return a.과목명.localeCompare(b.과목명);
        }
        return a.필수.localeCompare(b.필수);
      }
      return a.이수.localeCompare(b.이수);
    });

    setTbodyInfos(copyTbodyInfos);
  };

  const 추가 = () => {
    const copyTbodys = [...tbodyInfos];
    const tbody = {
      이수: '전공',
      필수: '필수',
      과목명: '',
      학점: '',
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      평균: 0,
      성적: '',
    };
    copyTbodys.push(tbody);
    setTbodyInfos(copyTbodys);
  };

  const 삭제 = () => {
    const copyResult = resultCalc(tbodyInfos);
    setResult(copyResult);
    if (tbodyInfos.length > 1) {
      setTbodyInfos((prevTbodyInfos) => {
        const copyTbodys = [...prevTbodyInfos];
        copyTbodys.splice(seletId, 1);
        return copyTbodys;
      });
    } else {
      console.log('삭제실패');
    }
  };

  return (
    <div key={title} className='flex flex-col gap-4'>
      <div className='flex w-full justify-between'>
        <h1 className='text-2xl ml-3 font-bold'>{title}</h1>
        <div className='flex gap-4'>
          <button
            className='bg-violet-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all'
            onClick={추가}
          >
            추가
          </button>
          <button
            className='bg-violet-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all'
            onClick={저장}
          >
            저장
          </button>
          <button
            className='bg-red-600 text-white w-12 p-2 rounded-md hover:scale-110 transition-all'
            onClick={삭제}
          >
            삭제
          </button>
        </div>
      </div>
      <table className='w-full'>
        <Thead />
        {tbodyInfos.map((tbodyInfo, i) => {
          return (
            tbodyInfo && (
              <Tbody
                key={i}
                i={i}
                tbodyInfos={tbodyInfos}
                tbodyInfo={tbodyInfo}
                setTbodyInfos={setTbodyInfos}
                seletId={seletId}
                setSeletId={setSeletId}
                setResult={setResult}
              />
            )
          );
        })}
        <tbody className='bg-violet-300'>
          <tr className='text-center'>
            <td colSpan={3} className='border p-1'>
              합계
            </td>
            {result.map((el, i) => {
              return (
                <td className='border p-1 text-center' key={i}>
                  {el}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
TableItem.propTypes = {
  title: PropTypes.string.isRequired,
};
