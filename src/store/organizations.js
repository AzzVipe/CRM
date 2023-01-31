import { defineStore } from "pinia";
import * as Realm from "realm-web";

const realmApp = Realm.getApp("application-0-zqrmn");

async function graphqlOperation(graphql) {
	let myHeaders = new Headers();
	let resData;

	myHeaders.append(
		"Authorization",
		`Bearer ${realmApp.currentUser._accessToken}`
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
}

var graphql = JSON.stringify({
	query: `query {
		organizations {
			_id
			name
			domain
			domains
			people_ids
		}
	}`,
	variables: {},
});

let res = await graphqlOperation(graphql);
const organizationsData = res.organizations;
console.log(organizationsData);

export const useOrganizationStore = defineStore("organization", {
	state: () => {
		return { organizations: organizationsData };
	},

	actions: {
		async updateOrganizationPeopleIds(orgName) {
			console.log(orgName);
			let result = this.organizations.find((org) => org.name === orgName);
			let people_ids = result.people_ids;

			if (people_ids === null) people_ids = realmApp.currentUser.id;
			else people_ids.push(realmApp.currentUser.id);

			let temp = JSON.stringify(people_ids);
			console.log(temp);

			var graphql = JSON.stringify({
				query: `mutation {
					updateOneOrganization (
						query: { name: "${orgName}" }
						set: { people_ids: ${temp} }
					) {
						name
						people_ids
					}
				}`,
				variables: {},
			});

			result = await graphqlOperation(graphql);
			console.log(result.organizations);

			return result.organizations;
		},
	},
});
