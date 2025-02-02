import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import config, {initMongoDB} from "./config/config.js";
import productRouter from "./routes/products.router.js"
import { populateProducts } from "./factories/products.factory.js";
import { populateUsers } from "./factories/user.factory.js";

const app = express();

// populateProducts(10);
// populateUsers(10);

app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use('/bootstrap', express.static(path.join(process.cwd(), 'node_modules', 'bootstrap', 'dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

initMongoDB()
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(config.port, () => {
  console.log(`Conectado al puerto ${config.port}`);
});
