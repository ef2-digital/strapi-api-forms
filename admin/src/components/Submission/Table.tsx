import { SubmissionCollectionType } from "../../utils/types";
import * as React from "react";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";

import {
  Box,
  IconButton,
  Table as StrapiTable,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";

//@ts-ignore
import { ArrowRight } from "@strapi/icons";
import { useHistory } from "react-router-dom";

const Table = ({
  submissions,
  form,
}: {
  submissions: SubmissionCollectionType;
  form?: { title: string };
}) => {
  const { formatMessage, formatDate } = useIntl();
  const history = useHistory();

  return (
    <StrapiTable>
      <Thead>
        <Tr>
          {[
            "#",
            formatMessage({
              id: `${pluginId}.submissions.form_name`,
            }),
            formatMessage({
              id: `${pluginId}.submissions.submission_date`,
            }),
            formatMessage({
              id: `${pluginId}.submissions.submission`,
            }),

            <VisuallyHidden>Actions</VisuallyHidden>,
          ].map((heading, index) => {
            return (
              <Th key={index}>
                <Typography variant="sigma">{heading}</Typography>
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {submissions.length > 0 ? (
          submissions.map((submission) => {
            if (!submission.submission) {
              return <></>;
            }

            const parsedSubmission = JSON.parse(submission.submission);

            return (
              <Tr key={`${submission.id}-submission`}>
                <Td>{submission.id}</Td>
                <Td>
                  <Typography textColor="neutral800">
                    {form
                      ? form.title
                      : submission.form
                      ? submission.form.title
                      : formatMessage({ id: `${pluginId}.forms.deleted` })}
                  </Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">
                    {formatDate(submission.createdAt, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </Typography>
                </Td>

                <Td>
                  <Box maxWidth="200" style={{ width: "300px" }}>
                    <Typography textColor="neutral800" ellipsis={true}>
                      {Object.keys(parsedSubmission).map((field: any) => (
                        <>
                          {field}: {parsedSubmission[field]}
                          {" - "}
                        </>
                      ))}
                    </Typography>
                  </Box>
                </Td>
                <Td>
                  <IconButton
                    onClick={() =>
                      history.push(
                        `/plugins/${pluginId}/submission/${submission.id}`
                      )
                    }
                    label={formatMessage({
                      id: `${pluginId}.actions.view`,
                    })}
                    icon={<ArrowRight />}
                  />
                </Td>
              </Tr>
            );
          })
        ) : (
          <></>
        )}
      </Tbody>
    </StrapiTable>
  );
};

export default Table;
