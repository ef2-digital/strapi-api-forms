import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import submissionRequests from "../../api/submission";
import { SubmissionDetailType } from "../../utils/types";
import Header from "../../components/Submission/Header";
import pluginId from "../../pluginId";
import { Box, Typography, Grid, GridItem } from "@strapi/design-system";
import { format, parseISO } from "date-fns";

import {
  Card,
  CardBody,
  CardContent,
  CardBadge,
  CardTitle,
  CardSubtitle,
} from '@strapi/design-system';
import { Download } from "@strapi/icons";

const Submission = () => {
  const { formatMessage } = useIntl();
  const { id } = useParams<{ id: string }>();
  const [submission, setSubmission] = useState<SubmissionDetailType | null>();

  useEffect(() => {
    if (!id) {
      return;
    }

    submissionRequests.getSubmission(id).then((result) => {
      setSubmission(result.data);
    });
  }, []);

  if (!submission) {
    return <></>;
  }

  return (
    <>
      <Header
        formId={submission.attributes.form?.id!}
        title={` ${formatMessage({ id: `${pluginId}.submission.title` })}`}
        subtitle={` ${formatMessage({
          id: `${pluginId}.submission.subtitle`,
        })} ${
          submission.attributes.form?.title ??
          formatMessage({ id: `${pluginId}.forms.deleted` })
        }`}
      />
      <Box paddingLeft={10} paddingRight={10}>
        <Box
          background="neutral0"
          padding={5}
          marginBottom={5}
          shadow="filterShadow"
          hasRadius
        >
          <SubmissionBox submission={submission} />
        </Box>
      </Box>
    </>
  );
};

const SubmissionBox = ({
  submission,
}: {
  submission: SubmissionDetailType;
}) => {
  const { formatMessage } = useIntl();
  const parsedSubmission = JSON.parse(submission.attributes.submission);
  // @ts-ignore
  const submissionDate = format(
    parseISO(submission.attributes.createdAt!),
    "dd-MM-yyyy H:ss"
  );

  return (
    <Grid gap={5}>
      <GridItem padding={1} col={12} s={6} lg={6}>
        <Box background="" padding={4}>
          <Box paddingBottom={2}>
            <Typography variant="omega" fontWeight="bold">
              {formatMessage({
                id: `${pluginId}.submissions.submissions.info_title`,
              })}
            </Typography>
          </Box>
          <Box>
            <Grid>
              <GridItem col={3}>
                <Typography variant="omega" fontWeight="semiBold">
                  {formatMessage({
                    id: `${pluginId}.submissions.submission_date`,
                  })}
                  :
                </Typography>
              </GridItem>
              <GridItem col={3}>
                <Typography variant="omega">{submissionDate}</Typography>
              </GridItem>
            </Grid>
          </Box>
          <Box>
            <Grid>
              <GridItem col={3}>
                <Typography variant="omega" fontWeight="semiBold">
                  {formatMessage({
                    id: `${pluginId}.submissions.form_name`,
                  })}
                  :
                </Typography>
              </GridItem>
              <GridItem col={6}>
                <Typography variant="omega">
                  {submission.attributes.form?.title}
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </GridItem>
      <GridItem padding={1} col={9} s={9}>
        <Box background="neutral100" padding={4}>
          <Box paddingBottom={2}>
            <Typography variant="omega" fontWeight="bold">
              {formatMessage({
                id: `${pluginId}.submissions.submission.info_submission`,
              })}
            </Typography>
          </Box>
          {Object.keys(parsedSubmission).map((field) => {
            return (
              <SubmissionField
                label={field}
                field={parsedSubmission[field]}
              ></SubmissionField>
            );
          })}
        </Box>
      </GridItem>
      {submission.attributes.files && (
       <GridItem padding={1} col={9} s={9}>
          {Object.entries(submission.attributes.files).map(([index, file]) => {
            return (
             <Card id={index} key={index}>
          <CardBody>
            <Box padding={2} background="primary100">
              <a href={file.url!} target="_new">
                <Download />
              </a>
            </Box>
            <CardContent paddingLeft={2}>
              <CardTitle>{file.name}</CardTitle>
              <CardSubtitle>{file.ext}</CardSubtitle>
            </CardContent>
            <CardBadge>{file.mime}</CardBadge>
          </CardBody>
        </Card>)}
            
          )}
      </GridItem>)}
    </Grid>
  );
};

const SubmissionField = ({
  label,
  field,
}: {
  label: string;
  field: string;
}) => {
  return (
    <Box>
      <Grid>
        <GridItem col={3}>
          <Typography variant="omega" fontWeight="semiBold">
            {label}:
          </Typography>
        </GridItem>
        <GridItem col={9}>
          <Typography>{field}</Typography>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Submission;
