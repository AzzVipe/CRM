import { createRouter, createWebHistory } from "vue-router";
import * as Realm from "realm-web";

const requireAuth = (to, from, next) => {
	const app = Realm.getApp("application-0-zqrmn");
	if (app.currentUser == null) {
		alert("Sign In First");
		next("/");
	} else next();
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "signIn",
			component: () => import("../views/LoginPage.vue"),
		},
		{
			path: "/home",
			name: "home",
			component: () => import("../views/HomePage.vue"),
			beforeEnter: requireAuth,
			children: [
				{
					path: "addPeople",
					name: "addPeople",
					component: () => import("../views/AddPeople.vue"),
				},
				{
					path: "people",
					name: "people",
					component: () => import("../views/PeoplePage.vue"),
				},
				{
					path: "organizations",
					name: "organizations",
					component: () => import("../views/OrganizationPage.vue"),
				},
			],
		},
	],
});

export default router;
