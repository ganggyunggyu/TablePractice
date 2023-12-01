import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Tbody({
  isCalc,
  tbodyInfos,
  setTbodyInfos,
  tbodyInfo,
  seletId,
  setSeletId,
  setResult,
  i,
}) {
  const [이수, set이수] = useState('');
  const [필수, set필수] = useState('');
  const [과목명, set괴목명] = useState('');
  const [학점, set학점] = useState(0);
  const [출석점수, set출석점수] = useState(0);
  const [과제점수, set과제점수] = useState(0);
  const [중간고사, set중간고사] = useState(0);
  const [기말고사, set기말고사] = useState(0);
  const [총점, set총점] = useState('');
  const [평균, set평균] = useState('');
  const [성적, set성적] = useState('');
  const [curTbodyInfo, setCurTbodyInfo] = useState({});
  const [isInputBlock, setIsInputBlock] = useState(false);

  const arr1 = [
    { name: '이수', value: 이수, optionValues: ['전공', '교양'], setValue: set이수 },
    { name: '필수', value: 필수, optionValues: ['필수', '선택'], setValue: set필수 },
    { name: '과목명', value: 과목명, setValue: set괴목명 },
  ];
  const arr2 = [
    { name: '학점', value: 학점, setValue: set학점 },
    { name: '출석점수', value: 출석점수, setValue: set출석점수 },
    { name: '과제점수', value: 과제점수, setValue: set과제점수 },
    { name: '중간고사', value: 중간고사, setValue: set중간고사 },
    { name: '기말고사', value: 기말고사, setValue: set기말고사 },
  ];
  const arr3 = [
    { name: '총점', value: 총점, setValue: set총점 },
    { name: '평균', value: 평균, setValue: set평균 },
    { name: '성적', value: 성적, setValue: set성적 },
  ];
  const arr4 = [
    { name: '총점', value: [], setValue: set총점 },
    { name: '평균', value: [], setValue: set평균 },
    { name: '성적', value: ['P', 'NP'], setValue: set성적 },
  ];

  const inputValue = (e, value, setValue, regex) => {
    const inputValue = e.target.value;
    if (regex && !regex.test(inputValue)) {
      return;
    }
    setValue(inputValue);
  };
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

  const resultCalc = () => {
    const copyResult = [];
    let 총학점 = 0;
    let 총출석점수 = 0;
    let 총과제점수 = 0;
    let 총중간고사 = 0;
    let 총기말고사 = 0;
    let 총총점 = 0;
    let cnt = 0;
    for (const tbodyInfo of tbodyInfos) {
      if (tbodyInfo.학점 === 1) {
        continue;
      } else {
        총학점 = 총학점 + +tbodyInfo.학점;
        총출석점수 = 총출석점수 + +tbodyInfo.출석점수;
        총과제점수 = 총과제점수 + +tbodyInfo.과제점수;
        총중간고사 = 총중간고사 + +tbodyInfo.중간고사;
        총기말고사 = 총기말고사 + +tbodyInfo.기말고사;
        총총점 = 총총점 + +tbodyInfo.총점;
        cnt = cnt + 1;
      }
    }
    copyResult.push(총학점);
    copyResult.push(총출석점수);
    copyResult.push(총과제점수);
    copyResult.push(총중간고사);
    copyResult.push(총기말고사);
    copyResult.push(총총점);
    copyResult.push(+(총총점 / cnt).toFixed(1));
    copyResult.push(get성적(+총총점 / cnt));

    return copyResult;
  };

  useEffect(() => {
    set총점(
      arr2.reduce((prev, cur) => {
        return prev + +cur.value;
      }, -arr2[0].value),
    );
    set평균(+총점 / 4);
    const copyResult = resultCalc();

    setResult(copyResult);
  }, [isCalc, tbodyInfos]);

  useEffect(() => {
    const copy = +총점 / 4;
    set평균(copy);
    set성적(get성적(총점));
    const copyInfos = [...tbodyInfos];
    setTbodyInfos(copyInfos);
  }, [총점]);

  useEffect(() => {
    // const copyInfos = [...tbodyInfos];
    //
    // if (!copyInfos[tbodyInfo.id]) {
    //   copyInfos[tbodyInfo.id] = {}; // 객체가 없다면 먼저 생성
    // }
    // copyInfos[tbodyInfo.id].이수 = 이수;
    // copyInfos[tbodyInfo.id].필수 = 필수;
    // copyInfos[tbodyInfo.id].과목명 = 과목명;
    // copyInfos[tbodyInfo.id].학점 = +학점;
    // copyInfos[tbodyInfo.id].출석점수 = +출석점수;
    // copyInfos[tbodyInfo.id].과제점수 = +과제점수;
    // copyInfos[tbodyInfo.id].중간고사 = +중간고사;
    // copyInfos[tbodyInfo.id].기말고사 = +기말고사;
    // copyInfos[tbodyInfo.id].총점 = +총점;

    // setCurTbodyInfo(tbodyInfo);
    // setTbodyInfos(copyInfos);

    const copyInfos = [...tbodyInfos];
    copyInfos[i].이수 = 이수;
    copyInfos[i].필수 = 필수;
    copyInfos[i].과목명 = 과목명;
    copyInfos[i].학점 = +학점;
    copyInfos[i].출석점수 = +출석점수;
    copyInfos[i].과제점수 = +과제점수;
    copyInfos[i].중간고사 = +중간고사;
    copyInfos[i].기말고사 = +기말고사;
    copyInfos[i].총점 = +총점;

    setTbodyInfos(copyInfos);
    resultCalc();
  }, [이수, 필수, 과목명, 학점, 출석점수, 과제점수, 중간고사, 기말고사, isCalc]);

  useEffect(() => {
    if (학점 === 1) {
      setIsInputBlock(true);
    }
  }, [학점]);

  return (
    <tbody>
      <tr
        className={`${seletId === i ? 'bg-violet-300' : 'bg-violet-100'}`}
        onClick={() => {
          setSeletId(i);
        }}
      >
        {arr1.map((el) => {
          return (
            <td key={el.name} className='border p-1'>
              {el.name === '과목명' ? (
                <input
                  type='text'
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue);
                  }}
                />
              ) : (
                <select
                  name=''
                  id=''
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue);
                  }}
                  value={el.value}
                >
                  {el.optionValues.map((optionValue) => {
                    return (
                      <option key={optionValue} value={optionValue}>
                        {optionValue}
                      </option>
                    );
                  })}
                </select>
              )}
            </td>
          );
        })}
        {arr2.map((el) => {
          return (
            <td key={el.name} className='border p-1'>
              {el.name === '학점' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|1[0-9]|20)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                />
              )}
              {el.name === '출석점수' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|1[0-9]|20)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.학점 === 1}
                />
              )}
              {el.name === '과제점수' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|1[0-9]|20)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.학점 === 1}
                />
              )}
              {el.name === '중간고사' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|[12]\d|30)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.학점 === 1}
                />
              )}
              {el.name === '기말고사' && (
                <input
                  type='text'
                  className='w-20 text-center bg-violet-100'
                  value={el.value}
                  onChange={(e) => {
                    inputValue(e, el.value, el.setValue, /^(?:[0-9]|[12]\d|30)$/);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      el.setValue('');
                    }
                  }}
                  disabled={tbodyInfo.학점 === 1}
                />
              )}
            </td>
          );
        })}
        {tbodyInfo.학점 !== 1
          ? arr3.map((el) => {
              return (
                <td key={el.name} className='border p-1 text-center'>
                  <p>{el.value}</p>
                </td>
              );
            })
          : arr4.map((el) => {
              return (
                <td key={el.name} className='border p-1'>
                  {el.name === '성적' ? (
                    <select name='' id=''>
                      {el.value.map((el2, i) => {
                        return (
                          <option key={i} value={el2}>
                            {el2}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <p>{el.value}</p>
                  )}
                </td>
              );
            })}
      </tr>
    </tbody>
  );
}
Tbody.propTypes = {
  i: PropTypes.number.isRequired,
  isCalc: PropTypes.bool.isRequired,
  tbodyInfo: PropTypes.object.isRequired,
  tbodyInfos: PropTypes.array.isRequired,
  setTbodyInfos: PropTypes.any.isRequired,
  seletId: PropTypes.number.isRequired,
  setSeletId: PropTypes.any.isRequired,
  setResult: PropTypes.any.isRequired,
};
