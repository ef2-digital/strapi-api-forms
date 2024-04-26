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
    ],
  },
  admin: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/submissions",
        handler: "submission.dashboard",
        config: {
          policies: ["admin::isAuthenticatedAdmin"],
        },
      },
      {
        method: "GET",
        path: "/submissions/export/:formId",
        handler: "submission.export",
        config: {
          policies: ["admin::isAuthenticatedAdmin"],
        },
      },

      {
        method: "GET",
        path: "/submission/:id",
        handler: "submission.get",
        config: {
          policies: ["admin::isAuthenticatedAdmin"],
        },
      },

      {
        method: "GET",
        path: "/form/:id/submissions",
        handler: "form.submissions",
        config: {
          policies: ["admin::isAuthenticatedAdmin"],
        },
      },
    ],
  },
};
