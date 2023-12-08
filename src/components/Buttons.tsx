import React, {FC, MouseEvent} from 'react';

type PropsType = {
    arr: string[],
    handler: (e: MouseEvent<HTMLButtonElement>) => void,
}
const Buttons: FC<PropsType> = ({arr, handler}) => {

    return (
        <>
            {arr.map((num, i, arr) => (
                <button key={num}
                        className={`
                                grid
                                content-center
                                justify-items-center
                                h-14
                                w-14
                                m-1
                                rounded-full
                                text-xl
                                font-bold
                                active:shadow-myInnerBlack
                                ${arr.includes('0') && 'bg-gray-400'}                                                                                                
                                ${arr.includes('AC') && 'bg-white'}                                                                                                
                                ${arr.includes('/') && 'bg-yellow-500'}                                
                                ${num === '0' && 'grid col-start-1 col-end-3 w-32 rounded-full'}
                                `}
                        onClick={(e) => handler(e)}
                >
                    {num}
                </button>
            ))}
        </>
    );
};

export default Buttons;