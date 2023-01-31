<template>
	<div
		class="flex bg-white/20 lg:w-[600px] sm:w-fit] justify-between items-center rounded-lg shadow-lg flex-col lg:p-8 lg:gap-8 sm:p-4 sm:gap-4">
		<div class="flex justify-center items-center w-full relative">
			<button
				class="absolute left-0 lg:text-xl sm:text-md rounded-md hover:bg-black/10 px-2 py-1"
				@click="this.$router.push({ name: 'people' })">
				<i class="ri-arrow-left-line"></i>
			</button>
			<h1
				class="text-gray-900 self-center font-extrabold lg:text-3xl sm:text-2xl tracking-wider text-center uppercase leading-relaxed sm:text-1xl">
				Add New !
			</h1>
		</div>
		<div class="w-full flex flex-col lg:gap-8 sm:gap-4 lg:text-xl sm:text-sm">
			<div class="flex gap-4 sm:flex-col">
				<div class="flex flex-col gap-4">
					<label class="input-label" for="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						v-model="firstName"
						class="input-box w-full"
						required />
				</div>
				<div class="flex flex-col gap-4">
					<label class="input-label" for="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						v-model="lastName"
						class="input-box w-full"
						required />
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<label class="input-label" for="email">Email</label>
				<input
					id="email"
					type="text"
					v-model="email"
					class="input-box"
					required />
			</div>
			<div class="flex flex-col gap-4">
				<label class="input-label" for="organization">Organization</label>
				<select
					name="organization"
					id="organization"
					v-model="organization"
					class="input-box">
					<option
						v-for="data in organizationStore.organizations"
						:key="data.id"
						:value="data.name">
						{{ data.name }}
					</option>
				</select>
			</div>
			<div class="flex flex-col lg:gap-4 sm:gap-2">
				<label class="input-label">Type</label>
				<div class="flex lg:gap-4 sm:gap-2">
					<div
						v-for="item in typeItem"
						:key="item.id"
						class="flex items-center justify-center input-box w-full"
						@click="type = item.toLowerCase()">
						<h1 class="lg:text-lg font-medium">{{ item }}</h1>
					</div>
				</div>
			</div>
		</div>
		<button
			class="w-full bt-gradient mt-2 lg:h-12 sm:h-8 text-xl rounded-md shadow-md font-bold text-gray-800"
			@click="addToDb">
			Add
		</button>
	</div>
</template>
<script>
	import * as Realm from "realm-web";
	import { mapStores } from "pinia";
	import { useOrganizationStore } from "../store/organizations";
	import { usePeopleStore } from "../store/people";

	export default {
		name: "addPeople",

		data() {
			return {
				firstName: null,
				lastName: null,
				email: null,
				organization: null,
				typeItem: ["Internal", "External"],
				type: null,
			};
		},

		computed: {
			...mapStores(useOrganizationStore, usePeopleStore),
		},

		async created() {
			this.realmApp = Realm.getApp("application-0-zqrmn");
		},

		methods: {
			async graphqlOperation(graphql) {
				let myHeaders = new Headers();
				let resData;

				myHeaders.append(
					"Authorization",
					`Bearer ${this.realmApp.currentUser._accessToken}`
				);
				myHeaders.append("Content-Type", "application/json");

				let requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: graphql,
					redirect: "follow",
				};

				await fetch(
					"https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-zqrmn/graphql",
					requestOptions
				)
					.then((response) => response.json())
					.then((result) => {
						resData = result.data;
						console.log(resData);
					})
					.catch((error) => console.log("error", error));

				return resData;
			},
			async addUserToOrganization(orgName) {
				let org = await this.organizationStore.updateOrganizationPeopleIds(
					orgName
				);
				console.log(org);
			},

			async addToDb() {
				if (
					this.firstName === null ||
					this.lastName === null ||
					this.email === null ||
					this.organizations === null ||
					this.type === null
				) {
					console.log("empty fields");
					return;
				}

				let email = this.email;
				let password = "test123";
				let uid = null;

				await this.realmApp.emailPasswordAuth.registerUser({
					email,
					password,
				});

				const credentials = Realm.Credentials.emailPassword(email, password);

				await this.realmApp
					.logIn(credentials)
					.then((user) => {
						uid = user.id;
						console.log(uid);
						this.realmApp.currentUser.refreshCustomData();
					})
					.catch((err) => {
						console.log(err);
					});

				let org = this.organizationStore.organizations.find(
					({ name }) => name === this.organization
				);

				let graphql = JSON.stringify({
					query: `mutation {
						insertOnePerson ( data: {
							first_name: "${this.firstName}",
							last_name: "${this.lastName}",
							primary_email: "${this.email}",
							type: "${this.type}",
							user_id: "${uid}",
							organization_ids: "${org._id}"
						}
	  			) {
						_id
						first_name
						last_name
						primary_email
						type
					}
				}`,
					variables: {},
				});

				let res = await this.graphqlOperation(graphql);
				console.log("data", res);

				this.addUserToOrganization(this.organization);

				this.$router.push({ name: "people" });
			},
		},
	};
</script>
