const { test, vi, expect } = require("vitest");
const productService = require("../product.services");
const prisma = require("../../libs/__mocks__/prisma");

// Mock the Prisma library
vi.mock("../libs/prisma");

test("should create a new product", async () => {
    const currentDateTime = new Date();

    const newProduct = {
        title: "Bell Pendant",
        slug: "bell-pendant2",
        description: `
            <p>The expression is robust, the form is simple. Bell is a ceiling lamp in an iconic bell shape and with special attention paid to its details. Its round, even surface gives the lamp the impression of having been cast. Rather than being hidden, the meeting between the lead and the lamp is accentuated in a modern and original way.</p>
            <p>In Bell you have a lamp where the connection between the lead and the lamp is evident. Just as light is a gatherer, the bell has historically been used to call people to come together - to gather people. With its bell shape, Bell can also be used to create a cozy place to gather in the room.</p>
        `,
        price: 524,
        SKU: "F145251125",
        gallery: [
            "https://cdn.shopify.com/s/files/1/1087/6904/products/bell-pendant-717449_1400x.jpg?v=1678745777",
            "https://cdn.shopify.com/s/files/1/1087/6904/products/bell-pendant-717449.jpg?v=1678745777",
        ],
        thumbnail: "https://cdn.shopify.com/s/files/1/1087/6904/products/bell-pendant-717449_1400x.jpg?v=1678745777",
        hoverImage: "https://cdn.shopify.com/s/files/1/1087/6904/products/bell-pendant-573200_1400x.jpg?v=1678745777",
        inventory: 300,
    };

    // Mock the database create call
    prisma.product.create.mockResolvedValue({
        ...newProduct,
        id: 18,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
        deletedAt: null
    });

    // Call the actual service
    const product = await productService.createProduct(newProduct);

    console.log("Input product:", newProduct);
    console.log("Created product:", product);

    // Verify the result
    expect(product).toStrictEqual({
        ...newProduct,
        id: 18,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
        deletedAt: null
    });
});
