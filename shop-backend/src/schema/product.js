const z = require("zod");

// Product body validation schema
const productBody = z.object({
    title: z.string({ required_error: "Product Title is required" }),
    slug: z.string({ required_error: "Slug is required" }),
    description: z.string({ required_error: "Description is required" }),
    SKU: z.string({ required_error: "SKU is required." }),
    price: z.number({ required_error: "Price is required." }),
    inventory: z.number({ required_error: "Inventory is required." }),
    gallery: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    hoverImage: z.string().optional(),
    collectionIds: z.array(z.number()).optional(),
});

// Reusable objects for request validation
const payload = { body: productBody };
const params = {
    params: z.object({
        productId: z.string({ required_error: "Product ID is required." }),
    }),
};
const query = {
    query: z.object({
        searchText: z.string().optional(),
        collectionId: z.string().optional(),
        page: z.string().optional(),
        pageSize: z.string().optional(),
    }),
};

// Exported schemas
module.exports = {
    getProductSchema: z.object({ ...params }),
    listProductsSchema: z.object({ ...query }),
    listProductsByCategorySlugSchema: z.object({
        query: z.object({
            collectionSlug: z.string().optional(),
            page: z.number().optional(),
            pageSize: z.number().optional(),
        }),
    }),
    createProductSchema: z.object({ ...payload }),
    updateProductSchema: z.object({ ...payload, ...params }),
    deleteProductSchema: z.object({ ...params }),
};
