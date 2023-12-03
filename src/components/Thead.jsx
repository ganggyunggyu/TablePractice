export default function Thead() {
  const arr = [{ name: '이수' }, { name: '필수' }, { name: '과목명' }];
  const arr2 = [
    { name: '학점' },
    { name: '출석점수' },
    { name: '과제점수' },
    { name: '중간고사' },
    { name: '기말고사' },
  ];
  const arr3 = [{ name: '총점' }, { name: '평균' }, { name: '성적' }];
  return (
    <thead className='bg-violet-300'>
      <tr>
        {arr.map((el) => {
          return (
            <th key={el.name} className='border p-1 min-w-fit font-black'>
              {el.name}
            </th>
          );
        })}
        {arr2.map((el) => {
          return (
            <th key={el.name} className='border p-1'>
              {el.name}
            </th>
          );
        })}
        {arr3.map((el) => {
          return (
            <th key={el.name} className='border p-1'>
              {el.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
