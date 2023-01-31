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
		people {
			_id
			first_name
			last_name
			primary_email
			organization_ids
		}
	}`,
	variables: {},
});

let res = await graphqlOperation(graphql);
const peopleData = res.people;
console.log(peopleData);

export const usePeopleStore = defineStore("people", {
	state: () => {
		return { people: peopleData };
	},

	actions: {
		getByOrgId(orgId) {
			let data = this.people.filter((data) => {
				for (let index = 0; index < data.organization_ids.length; index++) {
					const element = data.organization_ids[index];
					return element === orgId;
				}
			});
			console.log(data);
			return data;
		},
	},
});
