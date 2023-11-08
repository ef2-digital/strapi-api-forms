import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Checkbox} from '@strapi/design-system';
import {FieldType} from "../../../utils/types";

const CheckboxWrapper = ({...props}: PropsWithChildren<FieldType>) => {
    return (
        <Checkbox disabled={true}>
            {props.label}
        </Checkbox>
    )
}

export default CheckboxWrapper
