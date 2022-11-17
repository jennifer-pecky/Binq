import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "2aaobsus",
    dataset: "production",
    useCdn: true,
})