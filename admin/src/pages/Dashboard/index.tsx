import * as React from "react";
import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  FormResponse,
  SubmissionCollectionType,
  SubmissionsResponse,
} from "../../utils/types";
import formRequests from "../../api/form";
import Header from "../../components/Layout/Header";
import pluginId from "../../pluginId";

import { Box, Flex, Grid, GridItem, Typography } from "@strapi/design-system";

//@ts-ignore
import { LinkButton, Link } from "@strapi/design-system/v2";
import { default as SubmissionTable } from "../../components/Submission/Table";
import { default as FormTable } from "../../components/Form/Table";
import { Plus } from "@strapi/icons";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "@strapi/icons";
import submissionRequests from "../../api/submission";
import { FormContext } from "../../hooks/useForm";
import { Types } from "../../hooks/formReducer";
const qs = require("qs");

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const [submissions, setSubmissions] = useState<SubmissionCollectionType>([]);
  const { dispatch, state } = React.useContext(FormContext);

  useEffect(() => {
    formRequests
      .getForms(
        qs.stringify(
          {
            "pagination[page]": 1,
            "pagination[pageSize]": 5,
            sort: ["id:desc"],
          },
          {
            encodeValuesOnly: true,
          }
        )
      )
      .then((response: FormResponse) => {
        dispatch({
          type: Types.Set_Forms,
          payload: {
            forms: response.data,
          },
        });
      });

    submissionRequests
      .getSubmissions(
        qs.stringify(
          {
            "pagination[page]": 1,
            "pagination[pageSize]": 5,
            sort: ["id:desc"],
            populate: "*",
          },
          {
            encodeValuesOnly: true,
          }
        )
      )
      .then((response: SubmissionsResponse) => {
        setSubmissions(response.data);
      });
  }, []);

  if (!state) {
    return <></>;
  }

  return (
    <>
      <Header title={formatMessage({ id: `${pluginId}.heading.dashboard` })} />
      <Grid>
        <GridItem col={10} s={12}>
          <Box paddingLeft={10} paddingRight={10}>
            <Box paddingBottom={5}>
              <Typography variant="beta">
                {formatMessage({ id: `${pluginId}.forms.dashboard_title` })}
              </Typography>
              <Flex justifyContent="space-between">
                <Link
                  endIcon={<ArrowRight />}
                  as={NavLink}
                  to={`/plugins/${pluginId}/form/list`}
                >
                  View all
                </Link>
                <LinkButton
                  startIcon={<Plus />}
                  as={NavLink}
                  to={`/plugins/${pluginId}/form/add`}
                >
                  {formatMessage({ id: `${pluginId}.heading.add` })}
                </LinkButton>
              </Flex>
            </Box>
            {state.forms && state.forms.length > 0 ? <FormTable /> : <></>}

            <Box paddingTop={10}>
              <Box paddingBottom={5}>
                <Typography variant="beta">
                  {formatMessage({
                    id: `${pluginId}.submissions.dashboard_title`,
                  })}
                </Typography>
                <Box paddingTop={2}>
                  <Link
                    endIcon={<ArrowRight />}
                    as={NavLink}
                    to={`/plugins/${pluginId}/submission/list`}
                  >
                    View all
                  </Link>
                </Box>
              </Box>
              {submissions && submissions.length > 0 ? (
                <SubmissionTable submissions={submissions} />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
