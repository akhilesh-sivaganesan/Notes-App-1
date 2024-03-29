import React from "react";
import { useFieldArray } from "react-hook-form";
import XCirlceIcon from '@heroicons/react/24/outline/XCircleIcon'
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { TaskStep } from "../typings";
import useAuth from "../hooks/useAuth";

export default function TaskStepSet({ nestIndex, control, register }: any) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `actions[${nestIndex}].steps`
  });

  const {user} = useAuth();
  return (
    <div className="space-y-4 ml-3">
      {fields.map((item, k) => 
        
          <div key={item.id}>
            <div className="flex flex-row space-x-4 ">
              <input
                {...register(`actions[${nestIndex}].steps[${k}].title`, { required: true })}
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
            title: "",
            startTime: new Date(),
            endTime: new Date(),
            userId: user?.uid,
          } as TaskStep)
        }
        className="flex flex-row space-x-1 items-center"
      >
        <PlusCircleIcon className="h-5 w-5"/>
        Add Step
      </button>
    </div>
  );
};
