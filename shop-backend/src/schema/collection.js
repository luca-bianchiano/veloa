const z = require("zod");

const payloadSchema = {
    body: z.object({
        title: z.string({ required_error: "Collection Title is required" }),
        slug: z.string({ required_error: "Slug is required" }),
        description: z.string({ required_error: "Description is required" }),
        thumbnail: z.string({ required_error: "Thumbnail is required" }),
    }),
};

const paramsSchema = {
    params: z.object({
        collectionId: z.string({ required_error: "Collection id is required." }),
    }),
};

const querySchema = {
    query: z.object({
        page: z.optional(z.number()),
    }),
};

module.exports = {
    getCollectionSchema: z.object({ ...paramsSchema }),
    getCollectionsSchema: z.object({ ...querySchema }),
    createCollectionSchema: z.object({ ...payloadSchema }),
    updateCollectionSchema: z.object({ ...payloadSchema, ...paramsSchema }),
    deleteCollectionSchema: z.object({ ...paramsSchema, ...payloadSchema }),
};
