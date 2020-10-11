import Airtable from 'airtable';
import secrets from './secrets';

/* Configure API Access for Airtable Base */

export default function airtableProvider() {
	const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

	return base('Recipients')
		.select({
			// Selecting the first 3 records in All Public Servants:
			// maxRecords: 3,
			view: 'All Public Servants'
		})
		.eachPage(
			function page(records, fetchNextPage) {
				// This function (`page`) will get called for each page of records.

				records.forEach(function(record) {
					console.log('Retrieved', record.fields);
				});

				// To fetch the next page of records, call `fetchNextPage`.
				// If there are more records, `page` will get called again.
				// If there are no more records, `done` will get called.
				fetchNextPage();
			},
			function done(err) {
				if (err) {
					console.error(err);
					return;
				}
			}
		);
}
