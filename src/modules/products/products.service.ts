import { AppError } from "../../core/error/error.service";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";
import { dbClient } from "../../singletons";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findProductById,
  updateProduct,
} from "../../core/db/db.repo";
import { ProductCreateDb, UpdateProductDb } from "../../core/db/db.types";
import {
  CreateProductRequestBody,
  GetProductsRequestQuery,
  UpdateProductBody,
} from "./products.types";
import { ProductReadValidator } from "./products.validator";

export async function getProducts(params: {
  reqQuery: GetProductsRequestQuery;
  tenantId: string;
}) {
  const { reqQuery, tenantId } = params;

  return await findProduct({
    dbClient,
    options: { ...reqQuery, tenantId },
  });
}

export async function getProduct(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const product = await findProductById({
    dbClient,
    options: { id, tenantId },
  });

  if (!product) {
    throw new AppError("Product not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedProduct = ProductReadValidator.parse(product);

  return parsedProduct;
}

export async function addProduct(params: {
  reqBody: CreateProductRequestBody;
  tenantId: string;
}) {
  const { reqBody, tenantId } = params;

  const productInsertData: ProductCreateDb = {
    ...reqBody,
    tenantId,
  };

  const createdProduct = await createProduct({
    dbClient,
    productInsertData,
  });

  const parsedCreatedProduct = ProductReadValidator.parse(createdProduct);

  return parsedCreatedProduct;
}

export async function updateProductById(params: {
  id: string;
  tenantId: string;
  reqBody: UpdateProductBody;
}) {
  const { id, tenantId, reqBody } = params;

  const updateProductData: UpdateProductDb = reqBody;

  const updatedProduct = await updateProduct({
    dbClient,
    options: { id, tenantId },
    updateProductData,
  });

  if (!updatedProduct) {
    throw new AppError("Product not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedUpdatedProduct = ProductReadValidator.parse(updatedProduct);

  return parsedUpdatedProduct;
}

export async function removeProduct(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const deletedProduct = await deleteProduct({
    dbClient,
    options: { id, tenantId },
  });

  if (!deletedProduct) {
    throw new AppError("Product not found", HTTP_STATUS_CODE.NOT_FOUND);
  }
}
