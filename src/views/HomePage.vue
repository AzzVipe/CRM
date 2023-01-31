<template>
	<div
		class="bg-gradient h-screen flex lg:flex-row sm:flex-col overflow-y-scroll overflow-x-auto">
		<SideBar @clicked-item="clickedItem" @sign-out="signOut"></SideBar>
		<div class="flex gap-4 justify-center items-center w-full">
			<router-view />
		</div>
	</div>
</template>
<script>
	import * as Realm from "realm-web";
	import SideBar from "../components/SideBar.vue";

	export default {
		name: "home",

		components: {
			SideBar,
		},

		created() {
			this.realmApp = Realm.getApp("application-0-zqrmn");
		},

		methods: {
			clickedItem(label) {
				const temp = label.toLowerCase();
				this.$router.push({ name: temp });
				console.log(temp);
			},
			signOut() {
				this.realmApp.currentUser.logOut();
				this.$router.push({ name: "signIn" });
			},
		},
	};
</script>
