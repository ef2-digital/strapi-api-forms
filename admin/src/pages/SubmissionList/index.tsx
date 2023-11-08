import * as React from "react";
import Header from "../../components/Form/Header";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import { useEffect, useState } from "react";
import {
  FormCollectionType,
  FormResponse,
  FormType,
  SubmissionCollectionType,
  SubmissionsResponse,
} from "../../utils/types";
import { default as SubmissionTable } from "../../components/Submission/Table";
import { Box, Grid, GridItem } from "@strapi/design-system";
import submissionRequests from "../../api/submission";
import { useParams } from "react-router-dom";
import formRequests from "../../api/form";
const qs = require("qs");

const SubmissionList = () => {
  const { formatMessage } = useIntl();
  const [submissions, setSubmissions] = useState<SubmissionCollectionType>([]);
  const [form, setForm] = useState<any>();

  const { id } = useParams<{ id: string }>();

  const query = qs.stringify(
    {
      "pagination[page]": 1,
      "pagination[pageSize]": 999,
      populate: "*",
      sort: ["createdAt:desc"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  useEffect(() => {
    if (!id) {
      submissionRequests
        .getSubmissions(query)
        .then((response: SubmissionsResponse) => {
          setSubmissions(response.data);
        });
    } else {
      formRequests.getFormSubmissions(id).then((response: any) => {
        if (response.attributes.submissions) {
          setSubmissions(response.attributes.submissions);
          setForm(response.attributes);
        }
      });
    }
  }, []);

  return (
    <>
      <Header
        title={`${form ? form.title : ""} ${formatMessage({
          id: `${pluginId}.submissions.label`,
        })}`}
        subtitle=""
        backUrl={`/plugins/${pluginId}`}
        backTitle={formatMessage({ id: `${pluginId}.back_to_dashboard` })}
      />
      <Grid>
        <GridItem col={10} s={12}>
          <Box paddingLeft={10} paddingRight={10} paddingBottom={10}>
            {submissions.length > 0 ? (
              <SubmissionTable submissions={submissions} form={form} />
            ) : (
              <></>
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default SubmissionList;
