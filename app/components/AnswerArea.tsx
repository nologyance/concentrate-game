import React from 'react';
import { AnswerPart } from './useAnswer';

type Props = AnswerPart

const AnswerArea: React.FC<Props> = ({ value, primeFactors }) => {
  return (
    <div className="flex-col flex-wrap h-48 w-48 border-solid border-2 bg-white text-center">
      {value && (
        <>
          <div className="items-start pt-8 font-bold text-xl">
            {value}
          </div>
          <div className="flex justify-center">
            {primeFactors?.map((f, i) => (
              <div className="flex" key={i}>
                <div className="w-1/3 pt-8">{f}</div>
                {primeFactors?.length! - 1 === i ? null : (
                  <div className="pt-8 px-4">×</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnswerArea;
