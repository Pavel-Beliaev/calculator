import React, {MouseEvent, useEffect, useState} from 'react';
import Buttons from "./components/Buttons";

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const top = ['AC', '+/-', '%'];
const right = ['/', '*', '-', '+', '='];

function App() {
    const [firstElement, setFirstElement] = useState<string>('');
    const [secondElement, setSecondElement] = useState<string>('');
    const [sign, setSign] = useState<string>('');
    const [result, setResult] = useState<string>('0');
    const [finish, setFinish] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const reset = (val: string) => {
        setResult(val);
        setFirstElement('');
        setSecondElement('');
        setSign('');
        setFinish(false);
    };
    const numbersHandler = (num: string) => {
        if (!secondElement && !sign) {
            setFirstElement((firstElement + num).substring(0, 9));
        } else if (firstElement && secondElement && finish) {
            setSecondElement(num);
            setFinish(false);
        } else {
            setSecondElement((secondElement + num).substring(0, 9));
        }
        if (num === '.' && !firstElement) {
            setFirstElement('0' + num);
        }
    }
    const operatorsHandler = (operator: string) => {
        if (firstElement || secondElement) {
            setSign(operator);
        }
        if (sign === '=') {
            setResult(operator);
        }
        if (firstElement && secondElement && !finish) {
            equalityHandler()
        }
    }
    const topOperatorsHandler = (operator: string) => {
        if (operator === 'AC') {
            reset('0');
        } else if (operator === '+/-' && (firstElement || secondElement)) {
            if (!secondElement || finish) {
                setFirstElement((parseFloat(result) * -1).toString());
            } else if (sign && firstElement) {
                setSecondElement((parseFloat(result) * -1).toString());
            }
            setResult((parseFloat(result) * -1).toString());
        } else if (operator === '%') {
            if (!sign && !secondElement) {
                setFirstElement((parseFloat(result) / 100).toString());
            } else if (firstElement && sign && !finish) {
                setSecondElement((parseFloat(firstElement) / 100 * parseFloat(secondElement)).toString());
            } else if (finish) {
                setResult((parseFloat(result) / 100).toString());
            }
        }
    }
    const equalityHandler = () => {
        let a;
        switch (sign) {
            case '+':
                a = (parseFloat(firstElement) + parseFloat(secondElement)).toString();
                if (a.length > 9) {
                    reset('Max length');
                    setError(true);
                } else {
                    setResult(a);
                }
                break;
            case '-':
                setResult((parseFloat(firstElement) - parseFloat(secondElement)).toString());
                break;
            case '*':
                setResult((parseFloat(firstElement) * parseFloat(secondElement)).toString());
                break;
            case '/':
                if (secondElement === '0') {
                    reset('You can\'t do it this way');
                    setError(true);
                } else {
                    setResult((parseFloat(firstElement) / parseFloat(secondElement)).toString());
                }
                break;
        }
        if (firstElement || secondElement) {
            setFinish(true);
        }
    }
    const buttonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const symbol = (e.target as Element).innerHTML;
        if (nums.includes(symbol)) {
            numbersHandler(symbol);
        }
        if (right.includes(symbol)) {
            operatorsHandler(symbol);
        }
        if (symbol === '=') {
            equalityHandler();
        }
        if (top.includes(symbol)) {
            topOperatorsHandler(symbol);
        }
    };

    useEffect(() => {
        if (firstElement && !secondElement && !finish) {
            setResult(firstElement);
        }
        if (sign && firstElement && !secondElement && !finish) {
            setResult(sign);
        }
        if (firstElement && sign && secondElement && !finish) {
            setResult(secondElement);
        }
        if (firstElement && secondElement && finish && /[0-9]/g.test(result)) {
            setFirstElement(result);
        }
        if (error) {
            setFinish(false);
            setError(false);
        }
    }, [firstElement, sign, secondElement, finish, error, result]);

    console.log('a:', firstElement, 'sign:', sign, 'b:', secondElement, 'res:', result, 'finish:', finish, 'error:', error)

    return (
        <div className='flex items-center justify-center w-screen h-screen select-none min-h-max min-w-max'>
            <div className=' flex justify-center items-center flex-col bg-black rounded-2xl p-3 shadow-down'>
                <div className='flex justify-end w-90 mt-20 mb-4'>
                    <p className={`text-white ${/[[0-9]|\+|-|\*|\//.test(result) ? 'text-5xl' : 'text-2xl'}`}>
                        {result}
                    </p>
                </div>
                <div className='grid grid-cols-4 grid-rows-5'>
                    <div className='grid col-start-1 col-end-4 row-start-1 row-end-2'>
                        <div className='flex justify-around'>
                            <Buttons arr={top} handler={buttonHandler}/>
                        </div>
                    </div>
                    <div className='grid col-start-4 col-end-5 row-start-1 row-end-6'>
                        <div className='flex flex-col items-center'>
                            <Buttons arr={right} handler={buttonHandler}/>
                        </div>
                    </div>
                    <div className='grid col-start-1 col-end-4 row-start-2 row-end-6 grid-cols-3 grid-rows-4'>
                        <Buttons arr={nums} handler={buttonHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;