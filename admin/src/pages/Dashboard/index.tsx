import * as React from "react";
import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  FormCollectionType,
  FormResponse,
  PaginationObject,
} from "../../utils/types";
import formRequests from "../../api/form";
import Header from "../../components/Layout/Header";
import pluginId from "../../pluginId";

import {
  Box,
  Flex,
  IconButtonGroup,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";

//@ts-ignore
import { LinkButton, Link } from "@strapi/design-system/v2";

import { Trash, Pencil, Mail, Cog } from "@strapi/icons";
import Dialog from "../../components/Dialog";
import { Plus } from "@strapi/icons";
import { NavLink } from "react-router-dom";
import { Eye } from "@strapi/icons";
import { ArrowRight } from "@strapi/icons";

const Dashboard = () => {
  const { formatMessage, formatDate } = useIntl();
  const [forms, setForms] = useState<FormCollectionType>([]);
  const [submissions, setSubmission] = useState<FormCollectionType>([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    formRequests
      .getForms({ "pagination[page]": 1, "pagination[pageSize]": 5 })
      .then((response: FormResponse) => {
        setForms(response.data);
      });
  }, []);

  return (
    <>
      <Header title={formatMessage({ id: `${pluginId}.heading.dashboard` })} />
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
        <Table>
          <Thead>
            <Tr>
              {[
                "#",
                formatMessage({
                  id: `${pluginId}.list.name`,
                }),
                formatMessage({
                  id: `${pluginId}.list.submissions`,
                }),
                formatMessage({
                  id: `${pluginId}.list.creation_date`,
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
            {forms.length > 0 ? (
              forms.map((form) => (
                <Tr key={`${form.id}-form`}>
                  <Td>{form.id}</Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {form.attributes.title}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {form.attributes.submission?.count ?? 0}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {formatDate(form.attributes.createdAt, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </Typography>
                  </Td>
                  <Td>
                    <IconButtonGroup>
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.handlers`,
                        })}
                        icon={<Cog />}
                      />
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.submissions`,
                        })}
                        icon={<Mail />}
                      />
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.edit`,
                        })}
                        icon={<Pencil />}
                      />
                      <IconButton
                        onClick={() => setIsVisible(true)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.remove`,
                        })}
                        icon={<Trash />}
                      />
                    </IconButtonGroup>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>No form founds</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Box paddingTop={10} paddingLeft={10} paddingRight={10}>
        <Box paddingBottom={5}>
          <Typography variant="beta">
            {formatMessage({ id: `${pluginId}.submissions.dashboard_title` })}
          </Typography>
          <Box paddingTop={2}>
            <Link
              endIcon={<ArrowRight />}
              as={NavLink}
              to={`/plugins/${pluginId}/form/list`}
            >
              View all
            </Link>
          </Box>
        </Box>
        <Table>
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
            {/* {forms.length > 0 ? (
              forms.map((form) => (
                <Tr key={`${form.id}-form`}>
                  <Td>{form.id}</Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {form.attributes.title}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {form.attributes.submission?.count ?? 0}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {formatDate(form.attributes.createdAt, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </Typography>
                  </Td>
                  <Td>
                    <IconButtonGroup>
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.handlers`,
                        })}
                        icon={<Cog />}
                      />
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.submissions`,
                        })}
                        icon={<Mail />}
                      />
                      <IconButton
                        onClick={() => alert(form.id)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.edit`,
                        })}
                        icon={<Pencil />}
                      />
                      <IconButton
                        onClick={() => setIsVisible(true)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.remove`,
                        })}
                        icon={<Trash />}
                      />
                    </IconButtonGroup>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>No submissions founds</Td>
              </Tr>
            )} */}
          </Tbody>
        </Table>
      </Box>
      <Dialog
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        description=""
        title=""
      />
    </>
  );
};

export default Dashboard;
