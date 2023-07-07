import RequestAndLoad from "../pages/request-and-load.vue";
import NotFoundPage from "../pages/404.vue";

var routes = [
  {
    path: "/",
    asyncComponent: () => import("../pages/home.vue"),
  },

  {
    path: "/agenda",
    asyncComponent: () => import("../pages/agenda.vue"),
  },
  {
    path: "/whatsapp",
    asyncComponent: () => import("../pages/whatsapp.vue"),
  },
  {
    path: "/companies",
    asyncComponent: () => import("../pages/companies.vue"),
  },
  {
    path: "/one-on-one",
    asyncComponent: () => import("../pages/one.vue"),
  },
  {
    path: "/notes",
    asyncComponent: () => import("../pages/notes.vue"),
  },
  {
    path: "/survey",
    asyncComponent: () => import("../pages/survey.vue"),
  },
  {
    path: "/presenter",
    asyncComponent: () => import("../pages/presenter.vue"),
  },
  {
    path: "/sponsors",
    asyncComponent: () => import("../pages/sponsors.vue"),
  },

  {
    path: "/about/",
    asyncComponent: () => import("../pages/about.vue"),
  },

  {
    path: "/request-and-load/user/:userId/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
