const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/index"); // Ensure the index.js file in routes is correctly set up
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.BACKEND_PORT || 8000;
const DB_URL = process.env.DB_URL;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust according to your front-end URL
  })
);

// Swagger JSDoc options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Shopping List API",
      description: "API to manage shopping list items",
      contact: {
        name: "Vinod",
        url: "https://github.com/vinodkumar11",
        email: "vinod@example.com",
      },
    },
    components: {
      schemas: require(path.join(__dirname, "swagger-schemas.json")).components
        .schemas,
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Specify JWT format
        },
      },
    },
    servers: [{ url: "http://localhost:8000" }],
    security: [
      {
        BearerAuth: [], // Apply BearerAuth globally
      },
    ],
  },
  apis: ["api/routes/*.js"], // Path to your API routes
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable Mongoose debugging (optional)
mongoose.set("debug", true);

// Use API routes
app.use(apiRoutes);

// Connect to MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
