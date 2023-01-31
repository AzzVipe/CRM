<template>
	<div
		class="flex flex-col lg:gap-4 sm:gap-2 bg-gray-300/40 shadow-lg text-gray-900 justify-between lg:text-3xl sm:text-xl"
	>
		<a href="#" class="lg:p-4 sm:p-2">
			<img
				src="https://randomuser.me/api/portraits/women/76.jpg"
				class="rounded-full lg:w-12 sm:w-6 mt-3 mx-auto aspect-square"
			/>
		</a>
		<div class="flex flex-col">
			<div
				v-for="item in items"
				:key="item.id"
				class="icon-container group"
				@click="emitEvent(item)"
			>
				<i :class="item.icon"></i>
				<span class="sidebar-tooltip group-hover:scale-100">{{
					item.label
				}}</span>
			</div>
		</div>
		<div class="icon-container group" @click="$emit('signOut')">
			<i class="ri-logout-circle-line"></i>
			<span class="sidebar-tooltip group-hover:scale-100">Log Out</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	emits: ["clickedItem", "signOut"],

	data() {
		return {
			items: [
				{
					icon: "ri-home-3-fill",
					label: "Dashboard",
				},
				{
					icon: "ri-database-2-fill",
					label: "People",
				},
				{
					icon: "ri-grid-fill",
					label: "Organizations",
				},
				{
					icon: "ri-folder-shield-2-fill",
					label: "Projects",
				},
				{
					icon: "ri-bill-fill",
					label: "Billings",
				},
			],
		};
	},
	methods: {
		emitEvent(item) {
			this.$emit("clickedItem", item.label);
		},
	},
	// props: ['']
};
</script>
