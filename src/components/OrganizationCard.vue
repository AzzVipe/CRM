<template>
	<div
		class="bg-white/20 w-full flex flex-col p-4 gap-4 font-semibold rounded-md">
		<div class="flex">
			<div class="w-full">
				<h1>Name:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1>{{ orgData.name }}</h1>
			</div>
		</div>
		<div class="flex">
			<div class="w-full">
				<h1>Primary Domain:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1>{{ orgData.domain }}</h1>
			</div>
		</div>
		<div class="flex">
			<div class="w-full">
				<h1>Domains:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1 v-for="data in orgData.domains" :key="data.id">
					{{ data }}
				</h1>
			</div>
		</div>
		<div class="flex">
			<div class="w-full">
				<h1>Associated People:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1 v-for="data in orgData.array" :key="data.id">
					{{ data.first_name }} {{ data.last_name }}
				</h1>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "OrganizationCard",
		props: ["orgData"],
	};
</script>
