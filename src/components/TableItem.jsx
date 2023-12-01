import { useEffect, useState } from 'react';
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
      학점: 0,
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      성적: '',
    },
  ]);
  const [isCalc, setIsCalc] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, '']);

  const 저장 = () => {
    setIsCalc(!isCalc);
  };

  const 추가 = () => {
    const copyTbodys = [...tbodyInfos];
    const tbody = {
      이수: '전공',
      필수: '필수',
      과목명: '',
      학점: 0,
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      성적: '',
    };
    copyTbodys.push(tbody);

    setTbodyInfos(copyTbodys);
  };

  const 삭제 = () => {
    const copyTbody = [...tbodyInfos];
    setTbodyInfos(copyTbody.splice(seletId, 1));
  };

  // useEffect(() => {
  //   const arr = [...tbodyInfos];
  //   const updatedArr = arr.filter((item) => item.id !== +seletId);
  //
  //   setTbodyInfos([]);
  //   setTbodyInfos(updatedArr);
  // }, [isDelete]);

  // useEffect(() => {
  //   const result = [...tbodyInfos].sort((a, b) => {
  //     return a.이수.localeCompare(b.이수);
  //   });
  //   setTbodyInfos(result);
  // }, [isCalc]);

  useEffect(() => {}, [seletId]);
  useEffect(() => {
    const copyTbody = [...tbodyInfos];
    setTbodyInfos(copyTbody.slice(seletId, 1));
  }, [isDelete]);

  return (
    <div key={title} className='flex flex-col gap-4'>
      <div className='flex w-full justify-between'>
        <h1 className='text-xl font-bold'>{title}</h1>
        <div>
          <button onClick={추가}>추가</button>
          <button onClick={삭제}>삭제</button>
          <button onClick={저장}>저장</button>
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
                isCalc={isCalc}
                setResult={setResult}
              />
            )
          );
        })}
        <tbody>
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
