import * as React from "react";
import { Select, Option, Typography } from "@strapi/design-system";
import { PropsWithChildren } from "react";
import { FieldOptionProps, FieldType } from "../../../utils/types";

const SelectWrapper = ({ ...props }: PropsWithChildren<FieldType>) => {
  return (
    <>
      <Typography variant="pi" fontWeight="semiBold">
        {props.label}
      </Typography>
      <Select>
        {props.options ? (
          props.options.map((option: FieldOptionProps, index: number) => (
            <Option
              value={option.value}
              key={`select-${props.name}-${index}`}
              disabled={true}
            >
              {option.value}
            </Option>
          ))
        ) : (
          <></>
        )}
      </Select>
    </>
  );
};

export default SelectWrapper;
