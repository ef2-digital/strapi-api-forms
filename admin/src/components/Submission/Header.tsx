import * as React from "react";
import { useIntl } from "react-intl";

/*
 * Strapi Design system
 */
import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";
//@ts-ignore
import { Link } from "@strapi/design-system/v2";
import { ArrowLeft, ChevronLeft } from "@strapi/icons";
import { NavLink, useHistory } from "react-router-dom";
import pluginId from "../../pluginId";

type HeadingProps = {
  title?: string;
  formId?: string;
  subtitle?: string;
  backUrl?: string;
  backTitle?: string;
};

const Header = ({
  title,
  formId,
  subtitle,
  backUrl,
  backTitle,
}: HeadingProps): JSX.Element => {
  const history = useHistory();
  const { formatMessage } = useIntl();

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          primaryAction={
            <Button
              onClick={() =>
                history.push(`/plugins/${pluginId}/submission/list/${formId}`)
              }
              startIcon={<ChevronLeft />}
            >
              {formatMessage({ id: `${pluginId}.back_to_form` })}
            </Button>
          }
          navigationAction={
            <Link
              startIcon={<ArrowLeft />}
              as={NavLink}
              to={`${backUrl ?? `/plugins/${pluginId}/submission/list`}`}
            >
              {backTitle ??
                formatMessage({ id: `${pluginId}.back_to_overview` })}
            </Link>
          }
          title={title ?? formatMessage({ id: `${pluginId}.submission.title` })}
          subtitle={
            subtitle ?? formatMessage({ id: `${pluginId}.submission.subtitle` })
          }
          as="h2"
        />
      </Box>
    </>
  );
};

export default Header;
