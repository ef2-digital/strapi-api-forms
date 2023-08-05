import * as React from "react";
import { Box, Radio, RadioGroup, Typography } from "@strapi/design-system";
import { PropsWithChildren } from "react";
import { FieldOptionProps, FieldType } from "../../../utils/types";

const RadioWrapper = ({ ...props }: PropsWithChildren<FieldType>) => {
  return (
    <>
      <Typography variant="pi" fontWeight="semiBold" id={props.name}>
        {props.label}
      </Typography>
      <RadioGroup labelledBy={props.name} name={props.name}>
        {props.options ? (
          props.options.map((option: FieldOptionProps, index: number) => (
            <Box
              key={`${props.name}-${index}`}
              paddingTop={1}
              paddingBottom={1}
            >
              <Radio disabled={true} value={option.value}>
                {option.value}
              </Radio>
            </Box>
          ))
        ) : (
          <></>
        )}
      </RadioGroup>
    </>
  );
};

export default RadioWrapper;
