<template>
	<div class="h-screen flex flex-col lg:p-8 lg:gap-8 sm:p-4 sm:gap-4 w-full">
		<div class="organizations-nav flex justify-between items-center">
			<h1 class="text-2xl font-bold">
				{{ organizationStore.organizations.length }} Organizations
			</h1>
			<button
				class="flex items-center bt-gradient lg:aspect-auto sm:aspect-square lg:text-xl sm:text-sm lg:rounded-md sm:rounded-full shadow-md lg:py-2 lg:px-2.5 sm:p-2 font-bold text-gray-800"
				@click="this.$router.push({ name: 'addorganization' })">
				<i class="ri-add-line text-black"></i>
				<span class="lg:inline sm:hidden">Add New</span>
			</button>
		</div>

		<div
			class="grid lg:grid-box sm:grid-box-sm gap-4 w-full overflow-y-scroll overflow-x-auto">
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
