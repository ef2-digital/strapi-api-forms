import * as React from "react";
import { useIntl } from "react-intl";

/*
 * Strapi Design system
 */
import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";
//@ts-ignore
import { Link } from "@strapi/design-system/v2";
import { Check, ArrowLeft } from "@strapi/icons";
import { NavLink } from "react-router-dom";
import pluginId from "../../pluginId";

type HeadingProps = {
  save?: () => void;
  title?: string;
  subtitle?: string;
};

const Header = ({ save, title, subtitle }: HeadingProps): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          primaryAction={
            save ? (
              <Button startIcon={<Check />} onClick={() => save()}>
                {formatMessage({ id: `${pluginId}.save` })}
              </Button>
            ) : (
              <></>
            )
          }
          navigationAction={
            <Link startIcon={<ArrowLeft />} as={NavLink} to={`/plugins/${pluginId}`}>
              {formatMessage({ id: `${pluginId}.back_to_overview` })}
            </Link>
          }
          title={title ?? formatMessage({ id: `${pluginId}.forms.title` })}
          subtitle={
            subtitle ?? formatMessage({ id: `${pluginId}.forms.subtitle` })
          }
          as="h2"
        />
      </Box>
    </div>
  );
};

export default Header;
