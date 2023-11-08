import * as React from "react";
import Header from "../../components/Form/Header";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import { useEffect, useState } from "react";
import formRequests from "../../api/form";
import { FormCollectionType, FormResponse } from "../../utils/types";
import { default as FormTable } from "../../components/Form/Table";
import { Box, Grid, GridItem, Flex, LinkButton } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { NavLink } from "react-router-dom";

const FormList = () => {
  const { formatMessage } = useIntl();
  const [forms, setForms] = useState<FormCollectionType>([]);

  useEffect(() => {
    formRequests
      .getForms({ "pagination[page]": 1, "pagination[pageSize]": 9999 })
      .then((response: FormResponse) => {
        setForms(response.data);
      });
  }, []);

  return (
    <>
      <Header
        title={formatMessage({ id: `${pluginId}.forms.label` })}
        subtitle=""
        backUrl={`/plugins/${pluginId}`}
        backTitle={formatMessage({ id: `${pluginId}.back_to_dashboard` })}
      />
      <Box paddingLeft={10} paddingRight={10} paddingBottom={5}>
        <Flex justifyContent="space-between">
          <LinkButton
            style={{ textDecoration: "none" }}
            startIcon={<Plus />}
            as={NavLink}
            to={`/plugins/${pluginId}/form/add`}
          >
            {formatMessage({ id: `${pluginId}.heading.add` })}
          </LinkButton>
        </Flex>
      </Box>

      <Grid>
        <GridItem col={10} s={12}>
          <Box paddingLeft={10} paddingRight={10}>
            {forms.length > 0 ? <FormTable forms={forms} /> : <></>}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default FormList;
