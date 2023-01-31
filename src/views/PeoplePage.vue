<template>
	<div class="h-screen flex flex-col lg:p-8 lg:gap-8 sm:p-4 sm:gap-4 w-full">
		<div class="people-nav flex justify-between items-center">
			<h1 class="text-2xl font-bold">{{ peopleStore.people.length }} People</h1>
			<button
				class="bt-gradient lg:text-xl sm:text-sm rounded-md shadow-md py-2 px-2.5 font-bold text-gray-800"
				@click="this.$router.push({ name: 'addPeople' })">
				Add New
			</button>
		</div>

		<div class="grid grid-box gap-4 overflow-y-scroll overflow-x-auto">
			<UserCard
				v-for="data in peopleStore.people"
				:key="data.id"
				:userData="data" />
		</div>
	</div>
</template>
<script>
	import UserCard from "../components/UserCard.vue";
	import { mapStores } from "pinia";
	import { usePeopleStore } from "../store/people";

	export default {
		name: "people",

		components: {
			UserCard,
		},

		computed: {
			...mapStores(usePeopleStore),
		},

		methods: {},
	};
</script>

<style lang=""></style>
