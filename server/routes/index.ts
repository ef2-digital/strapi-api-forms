export default {
  "content-api": {
    type: "content-api",
    routes: [
      {
        method: "GET",
        path: "/forms",
        handler: "form.dashboard",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/submissions",
        handler: "submission.dashboard",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/forms",
        handler: "form.create",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/form/:id",
        handler: "form.get",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/form/:id/submissions",
        handler: "form.submissions",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "PUT",
        path: "/forms/:id",
        handler: "form.update",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "DELETE",
        path: "/forms/:id",
        handler: "form.delete",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/submission/:id",
        handler: "submission.get",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/submission/post",
        handler: "submission.post",
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: "PUT",
        path: "/notifications/update/:id",
        handler: "notification.updateNotification",
        config: {
          auth: false,
          policies: [],
        },
      },
      // {
      //   method: "GET",
      //   path: "/form/add",
      //   handler: "formController.add",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "GET",
      //   path: "/form/submissions",
      //   handler: "formController.submissions",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },

      // {
      //   method: "GET",
      //   path: "/form/handlers",
      //   handler: "formController.handlers",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "DELETE",
      //   path: "/form",
      //   handler: "formController.delete",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },

      // {
      //   method: "POST",
      //   path: "/form",
      //   handler: "formController.update",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "GET",
      //   path: "/form/model",
      //   handler: "formController.model",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "GET",
      //   path: "/submissions",
      //   handler: "submissionController.index",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "GET",
      //   path: "/submission",
      //   handler: "submissionController.view",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
      // {
      //   method: "POST",
      //   path: "/handler/enabled",
      //   handler: "handlerController.enabled",
      //   config: {
      //     auth: false,
      //     policies: [],
      //   },
      // },
    ],
  },
};
