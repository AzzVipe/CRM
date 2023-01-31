<template>
	<div class="bg-gradient h-screen flex justify-center items-center p-24">
		<div
			class="flex bg-white/20 lg:w-[500px] sm:w-fit justify-between items-center rounded-lg shadow-lg flex-col p-8 gap-8"
		>
			<h1
				class="text-gray-800 font-extrabold text-4xl tracking-wider text-center uppercase leading-relaxed"
			>
				Login, for awesomeness!
			</h1>
			<div class="w-full flex flex-col lg:gap-8 sm:gap-4">
				<div class="flex flex-col lg:gap-4 sm:gap-2">
					<label class="input-label" for="email">Email</label>
					<input
						id="email"
						type="text"
						v-model="email"
						class="input-box"
						required
					/>
				</div>
				<div class="flex flex-col gap-4 relative">
					<label class="input-label" for="email">Password</label>
					<input
						id="password"
						type="password"
						v-model="password"
						class="input-box"
						required
					/>
				</div>
				<p
					v-if="errMsg"
					class="absolute translate-y-60 font-medium text-red-800"
				>
					{{ errMsg }}
				</p>
			</div>
			<button
				class="w-full bt-gradient lg:p-2.5 sm:p-1.5 text-xl rounded-md shadow-md font-bold text-gray-800"
				@click="signIn"
			>
				Login
			</button>
		</div>
	</div>
</template>

<script>
import * as Realm from "realm-web";

export default {
	name: "signIn",

	data() {
		return {
			email: "",
			password: "",
			errMsg: null,
		};
	},

	created() {
		this.realmApp = Realm.getApp("application-0-zqrmn");
	},

	methods: {
		async signIn() {
			if (this.email == null || this.password == null) {
				this.errMsg = "*Empty fields";

				return;
			}
			const credentials = Realm.Credentials.emailPassword(
				this.email,
				this.password
			);

			await this.realmApp
				.logIn(credentials)
				.then((user) => {
					console.log(user);
					this.realmApp.currentUser.refreshCustomData();
					this.$router.push({ name: "home" });
				})
				.catch((err) => {
					this.errMsg = "* Invalid username/password";
					console.log(err);
				});
		},
	},
};
</script>
