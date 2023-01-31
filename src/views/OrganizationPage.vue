<template>
	<div class="h-screen flex flex-col lg:p-8 lg:gap-8 sm:p-4 sm:gap-4 w-full">
		<div class="organizations-nav flex justify-between items-center">
			<h1 class="text-2xl font-bold">
				{{ organizationStore.organizations.length }} Organizations
			</h1>
			<!-- <button
				class="bt-gradient lg:text-xl sm:text-sm rounded-md shadow-md py-2 px-2.5 font-bold text-gray-800"
				@click="this.$router.push({ name: 'addorganizations' })">
				Add New
			</button> -->
		</div>

		<div class="grid grid-box gap-4 w-full overflow-y-scroll overflow-x-auto">
			<OrganizationCard
				v-for="data in orgData()"
				:key="data._id"
				:orgData="data" />
		</div>
	</div>
</template>
<script>
	import OrganizationCard from "../components/OrganizationCard.vue";
	import { mapStores } from "pinia";
	import { useOrganizationStore } from "../store/organizations";
	import { usePeopleStore } from "../store/people";

	export default {
		name: "organizations",
		components: {
			OrganizationCard,
		},

		computed: {
			...mapStores(useOrganizationStore, usePeopleStore),
		},

		methods: {
			orgData() {
				let org = this.organizationStore.organizations;
				org.forEach((element) => {
					let data = this.peopleStore.getByOrgId(element._id);
					const json = JSON.stringify(data);
					const newArray = JSON.parse(json);
					newArray.forEach((temp) => {
						delete temp._id;
						delete temp.organization_ids;
					});
					element.array = newArray;
				});

				return org;
			},
		},
	};
</script>

<style lang=""></style>
