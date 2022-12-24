import React from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `actionList[${nestIndex}].actualSteps`
  });

  return (
    <div className="space-y-4">
      {fields.map((item, k) => {
        return (
          <div key={item.id}>
            <div className="flex flex-row space-x-4 ml-3">
              <input
                {...register(`actionList[${nestIndex}].actualSteps[${k}].content`, { required: true })}
                placeholder={item.content}
                className={"input"}
              />
              <button type="button" onClick={() => remove(k)}>
                Delete
              </button>
            </div>

          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            content: "some Content",
          })
        }
      >
        Append Nested
      </button>
    </div>
  );
};
