<template>
	<div
		class="bg-white/20 flex flex-col lg:p-4 lg:gap-4 sm:gap-3 sm:p-3 font-semibold rounded-md lg:text-base sm:text-sm">
		<div class="flex">
			<div class="w-full">
				<h1>First Name:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1>{{ userData.first_name }}</h1>
			</div>
		</div>
		<div class="flex">
			<div class="w-full">
				<h1>Last Name:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1>{{ userData.last_name }}</h1>
			</div>
		</div>
		<div class="flex">
			<div class="w-full">
				<h1>Primary Email:</h1>
			</div>
			<div class="self-end text-end w-full text-purple-900">
				<h1>{{ userData.primary_email }}</h1>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SideBar",
		props: ["userData"],
	};
</script>
