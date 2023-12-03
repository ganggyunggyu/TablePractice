import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Tbody({ tbodyInfos, setTbodyInfos, tbodyInfo, seletId, setSeletId, i }) {
  const [이수, set이수] = useState('전공');
  const [필수, set필수] = useState('필수');
  const [과목명, set과목명] = useState('');
  const [학점, set학점] = useState('');
  const [출석점수, set출석점수] = useState('');
  const [과제점수, set과제점수] = useState('');
  const [중간고사, set중간고사] = useState(0);
  const [기말고사, set기말고사] = useState(0);
  const [총점, set총점] = useState(0);
  const [평균, set평균] = useState(0);
  const [성적, set성적] = useState('');

  const arr1 = [
    { name: '이수', value: 이수, optionValues: ['전공', '교양'], setValue: set이수 },
    { name: '필수', value: 필수, optionValues: ['필수', '선택'], setValue: set필수 },
    { name: '과목명', value: 과목명, setValue: set과목명 },
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
      alert(
        '다음의 규칙을 지켜주세요 ! \n학점은 0~3까지 입력 가능합니다 \n출석점수 및 과제점수는 0~20까지 입력 가능합니다 \n중간고사 및 기말고사는 0~30까지 입력 가능합니다',
      );
      setValue('');
      return;
    }
    setValue(inputValue);
  };
  const 과목명중복 = (e, value, setValue) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    for (const tbodyInfo of tbodyInfos)
      if (inputValue === tbodyInfo.과목명 && inputValue !== '') {
        console.log('중복');
        alert('이미 등록 된 과목명입니다');
        setValue('');
        return;
      }
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

  useEffect(() => {
    const copyInfos = [...tbodyInfos];
    const updateData = {
      이수: 이수,
      필수: 필수,
      과목명: 과목명,
      학점: +학점,
      출석점수: +출석점수,
      과제점수: +과제점수,
      중간고사: +중간고사,
      기말고사: +기말고사,
      총점: +총점,
      평균: +평균,
      성적: 성적,
    };
    copyInfos[i] = updateData;
    setTbodyInfos(copyInfos);
  }, [이수, 필수, 과목명, 학점, 출석점수, 과제점수, 중간고사, 기말고사]);

  useEffect(() => {
    set이수(tbodyInfo.이수);
    set필수(tbodyInfo.필수);
    set과목명(tbodyInfo.과목명);
    set학점(tbodyInfo.학점 !== 0 ? tbodyInfo.학점 : '');
    set출석점수(tbodyInfo.출석점수 !== 0 ? tbodyInfo.출석점수 : '');
    set과제점수(tbodyInfo.과제점수 !== 0 ? tbodyInfo.과제점수 : '');
    set중간고사(tbodyInfo.중간고사 !== 0 ? tbodyInfo.중간고사 : '');
    set기말고사(tbodyInfo.기말고사 !== 0 ? tbodyInfo.기말고사 : '');
    set총점(+tbodyInfo.출석점수 + +tbodyInfo.과제점수 + +tbodyInfo.중간고사 + +tbodyInfo.기말고사);
    set평균((총점 / 4).toFixed(0));
    set성적(tbodyInfo.총점 !== 0 ? get성적(총점) : '');
  }, [tbodyInfos]);

  return (
    <tbody>
      <tr
        className={`${
          seletId === i ? 'bg-violet-300' : 'bg-violet-100'
        } transition-all hover:bg-violet-300`}
        onClick={() => {
          setSeletId(i);
          console.log(tbodyInfo);
        }}
      >
        {arr1.map((el) => {
          return (
            <td key={el.name} className='border p-1'>
              {el.name === '과목명' ? (
                <input
                  type='text'
                  value={el.value}
                  onChange={(e) => {
                    과목명중복(e, el.value, el.setValue);
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
                    inputValue(e, el.value, el.setValue, /^(''|[0-3])$/);
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
                <td
                  key={el.name}
                  className={`${el.value === 'F' ? 'bg-red-300' : ''} p-1 text-center border`}
                >
                  {/* {el.name === '평균' ? '' : <p>{el.value}</p>} */}
                  {el.value}
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
  tbodyInfo: PropTypes.object.isRequired,
  tbodyInfos: PropTypes.array.isRequired,
  setTbodyInfos: PropTypes.any.isRequired,
  seletId: PropTypes.number.isRequired,
  setSeletId: PropTypes.any.isRequired,
};
