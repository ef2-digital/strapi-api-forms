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
import { FormProvider } from "../../hooks/useForm";

const App = () => {
  return (
    <FormProvider>
      <Switch>
        <Route path={`/plugins/${pluginId}/form/add`} component={Form} exact />
        <Route path={`/plugins/${pluginId}`} component={Dashboard} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </FormProvider>
  );
};

export default App;
