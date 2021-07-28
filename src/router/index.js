import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
      {
        path: '/child-checkin',
        name: 'CheckinSignin',
        component: () =>
        import( /* webpackChunkName: "workflow" */ '../views/ChildCheckinPortal/CheckinSignin.vue'),
        meta: {
          title: 'Churchplus - ChildSignin',
        }
      },
      {
        path: '/checkinsignup/:tenantId',
        name: 'CheckinSignup',
        component: () =>
        import( /* webpackChunkName: "workflow" */ '../views/ChildCheckinPortal/CheckinSignup.vue'),
        meta: {
          title: 'Churchplus - ChildSignup',
        }
      },
      {
          path: '/forgotpassword/:tenantId',
          name: 'ForgotPassword',
          component: () =>
              import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/ForgotPassword'),
          meta: {
            title: 'Churchplus - ForgotPassword',
          }
      },
      {
        path: '/checkin',
    name: 'BaseIndex',
    component: () =>
        import( /* webpackChunkName: "defaultmessage" */ '@/views/ChildCheckinPortal/BaseIndex'),
    children: [{
        path: '',
        name: 'CheckinDashboard',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinDashboard')
    },
    {
        path: 'checkinfamily',
        name: 'CheckinFamily',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinFamily')
    },
    {
        path: 'checkinevent/:eventId',
        name: 'CheckinEvent',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinEvent')
    },
    {
        path: 'upcomingevents',
        name: 'UpcomingEvents',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/UpcomingEvents')
    },
    {
        path: 'checkinprofile',
        name: 'CheckinProfile',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinProfile')
    },
    {
        path: 'checkinguardian',
        name: 'Guardian',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/Guardian')
    },
    {
        path: 'thankyou/:code',
        name: 'ThankYou',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/ThankYou')
    },
  ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {


  const checkinToken = localStorage.getItem('checkinToken')
//   alert(4)
  if ((to.name === "CheckinSignUp" || to.name === "CheckinSignin") && checkinToken) {
    return next({ name: 'CheckinDashboard' })
  } 
  next(true)

// Find the nearest route element with meta tags.
const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

// If a route with a title was found, set the document (page) title to that value.
if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
} else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
}

// Remove any stale meta tags from the document using the key attribute we set below.
Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

// Skip rendering meta tags if there are none.
if (!nearestWithMeta) return next();

// Turn the meta tag definitions into actual elements in the head.
nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
})
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
})


export default router
