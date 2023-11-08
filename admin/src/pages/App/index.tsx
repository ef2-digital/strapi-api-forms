/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import Dashboard from "../Dashboard";
import Form from "../Form";
import FormList from "../FormList";

import { FormProvider } from "../../hooks/useForm";
import Submission from "../Submission";
import SubmissionList from "../SubmissionList";

const App = () => {
  return (
    <FormProvider>
      <Switch>
        <Route
          path={`/plugins/${pluginId}/form/list`}
          component={FormList}
          exact
        />
        <Route path={`/plugins/${pluginId}/form/add`} component={Form} exact />
        <Route
          path={`/plugins/${pluginId}/form/edit/:id`}
          component={Form}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/submission/list`}
          component={SubmissionList}
          exact
        />

        <Route
          path={`/plugins/${pluginId}/submission/:id`}
          component={Submission}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/submission/list/:id`}
          component={SubmissionList}
          exact
        />

        <Route path={`/plugins/${pluginId}`} component={Dashboard} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </FormProvider>
  );
};

export default App;
