import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "2aaobsus",
    dataset: "production",
    apiVersion: '2022-11-17',
    useCdn: true,
})