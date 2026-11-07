/*
Contains functions for fetching a nature fact of the day from iNaturalist (free, open source, no API key required)
    - picks one of the most-observed plant and fungi species, based on today's date
    - uses the species' Wikipedia summary as the fact
*/

const TAXA_URL = "https://api.inaturalist.org/v1/taxa";
const PLANTS_AND_FUNGI = "47126,47170"; // iNaturalist taxon ids for Plantae and Fungi
const SPECIES_POOL = 1000; // number of popular species to rotate through
const CANDIDATES = 5; // species to check in case some are missing a summary

// remove the HTML tags iNaturalist includes in Wikipedia summaries
function stripHtml(html) {
    return new DOMParser().parseFromString(html, "text/html").body.textContent || "";
}

// number of whole days since Jan 1, 1970 - the same value all day, so everyone gets the same fact
function getDayNumber() {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}

export async function getFactOfTheDay() {
    try {
        const page = (getDayNumber() % (SPECIES_POOL / CANDIDATES)) + 1;
        const params = new URLSearchParams({
            rank: "species",
            taxon_id: PLANTS_AND_FUNGI,
            is_active: true,
            order_by: "observations_count",
            per_page: CANDIDATES,
            page,
        });
        const response = await fetch(`${TAXA_URL}?${params}`);
        if (!response.ok) {
            return { data: null, error: "Unable to load today's fact." };
        }
        const { results } = await response.json();

        // the list doesn't include summaries, so look up each species until one has a summary
        for (const taxon of results) {
            const detailResponse = await fetch(`${TAXA_URL}/${taxon.id}`);
            if (!detailResponse.ok) {
                continue;
            }
            const detail = (await detailResponse.json()).results[0];
            if (!detail.wikipedia_summary) {
                continue;
            }

            return {
                data: {
                    commonName: detail.preferred_common_name || detail.name,
                    scientificName: detail.name,
                    summary: stripHtml(detail.wikipedia_summary),
                    photoUrl: detail.default_photo?.medium_url || null,
                    photoAttribution: detail.default_photo?.attribution || "",
                    wikipediaUrl: detail.wikipedia_url,
                },
                error: null,
            };
        }

        return { data: null, error: "Unable to load today's fact." };
    } catch {
        return { data: null, error: "Unable to load today's fact." };
    }
}
