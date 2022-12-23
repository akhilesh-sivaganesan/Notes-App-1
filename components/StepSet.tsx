import React from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, control, register } : any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `actionList[${nestIndex}].actualSteps`
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              {...register(`actionList[${nestIndex}].actualSteps[${k}].content`, { required: true })}
              defaultValue={item.content}
              style={{ marginRight: "25px" }}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
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

      <hr />
    </div>
  );
};
