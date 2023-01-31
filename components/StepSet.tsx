import React from "react";
import { useFieldArray } from "react-hook-form";
import XCirlceIcon from '@heroicons/react/24/outline/XCircleIcon'
import { PlusCircleIcon } from "@heroicons/react/24/outline";


export default function StepSet({ nestIndex, control, register }: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `actionList[${nestIndex}].actualSteps`
  });

  return (
    <div className="space-y-4 ml-3">
      {fields.map((item, k) => 
        
          <div key={item.id}>
            <div className="flex flex-row space-x-4 ">
              <input
                {...register(`actionList[${nestIndex}].actualSteps[${k}].content`, { required: true })}
                placeholder={"Enter step here"}
                className={"activity-modal-input"}
              />
          
              <button type="button" onClick={() => remove(k)}>
                <XCirlceIcon className="h-5 w-5"/>
              </button>
            </div>

          </div>
  
      )}

      <button
        type="button"
        onClick={() =>
          append({
            content: "",
          })
        }
        className="flex flex-row space-x-1 items-center"
      >
        <PlusCircleIcon className="h-5 w-5"/>
        Add Step
      </button>
    </div>
  );
};
