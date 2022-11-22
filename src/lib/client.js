import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "2aaobsus",
    dataset: "production",
    apiVersion: '2022-11-21',
    useCdn: true,
})