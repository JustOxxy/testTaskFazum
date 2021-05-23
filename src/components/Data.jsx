import { useEffect, useState } from "react"

export const Data = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const [count, setCount] = useState(0);
  const [tryAgain, setTryAgain] = useState(true);

  const getResult = (fetchedData) => {
    const sortedObj = fetchedData.sort((first, second) => {
      let comparison = 0;
      if (first.sum > second.sum) {
        comparison = 1;
      } else if (first.sum < second.sum) {
        comparison = -1;
      }
      return comparison;
    });

    //находим наименьшее
    const min = sortedObj[0].sum;

    const resultedArray = [];
    sortedObj.forEach((item) => {
      const countForArray = Math.round(item.sum / min);
      for (let i = 0; i < countForArray; i++) {
        resultedArray.push(item)
      }
    })

    setResult(resultedArray[Math.floor(Math.random() * resultedArray.length)]);
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const request_retry = async(url, count) => {
      if (count > 0) {
        await sleep(1000)
      }

      try {
        const response = await fetch(url);
        let fetchedData = await response.json();
        if (!response.ok) throw new Error('error');
        getResult(fetchedData)
        setData(fetchedData)
      } catch (err) {
        setCount(c => c + 1)
      }
    }

    if (count === 5) {
      return
    }

    request_retry('http://localhost:8000/data', count)
    
  }, [count, tryAgain]);

  const handleButtonClick = () => {
    setTryAgain((tryAgain) => !tryAgain);
    setCount(0)
    setData([])
  }

  return (
    <div>
      {count > 0 && count !== 5 && (
        <>
          <div>Вычисляется победитель...</div>
          <div>{`Запрос вернулся с ошибкой. Попытка повторить запрос №${count}`}</div>
        </>
      )}
      {data.length !==0 && (
        <div>
          <div>{`Победитель: ${result.name}`}</div>
          <button onClick={() => handleButtonClick()}>Повторить аукцион</button>
        </div>
      )}
      {count === 5 && 'Что-то пошло не так, обновите страничку'}

      
    </div>
  );
}