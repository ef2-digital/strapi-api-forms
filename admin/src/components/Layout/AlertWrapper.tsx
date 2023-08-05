import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {Alert, Stack,} from '@strapi/design-system';
import {useIntl} from "react-intl";
import pluginId from "../../pluginId";

type AlertWrapperProps = {
    variant: string,
    toggleAlert: Dispatch<SetStateAction<boolean>>,
}

const AlertWrapper = ({variant, toggleAlert}: AlertWrapperProps) => {
    const {formatMessage} = useIntl();

    return (
        <Stack
            right="-10px"
            marginRight={10}
            position="fixed"
            spacing={2}
            top={`6.5rem`}
            width={`${500 / 16}rem`}
            zIndex={10}
        >
            <Alert closeLabel="Close"
                   onClose={() => toggleAlert}
                   title={formatMessage({id: `${pluginId}.alert.${variant}`})}
                   variant={variant}
            >
                {formatMessage({id: `${pluginId}.alert.description.${variant}`})}
            </Alert>
        </Stack>
    )
}

AlertWrapper.defaultProps = {
    variant: 'success',
}

export default AlertWrapper;
