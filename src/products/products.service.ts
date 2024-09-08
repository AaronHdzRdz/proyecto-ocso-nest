import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas",
      price: 29,
      conuntSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca Cola 3L",
      price: 35,
      conuntSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Pepsi 3L",
      price: 30,
      conuntSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Gansito",
      price: 15,
      conuntSeal: 3,
      provider: uuid(),
    }
  ]
  create(createProductDto: CreateProductDto) {
    const newProduct = {
      productId: uuid(),
      ...createProductDto
    }
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findByProvider(id: string) {
    const productsFound = this.products.filter((product) => product.provider === id);
    if (!productsFound) throw new NotFoundException();
    return productsFound;
  }

  findOne(id: String) {
    const product = this.products.filter((product) => product.productId == id)[0];
    if (!product) throw new NotFoundException();
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    return {
      ...productToUpdate,
      ...updateProductDto
    }
  }

  remove(id: string) {
    const { productId } = this.findOne(id)
    this.products = this.products.filter((product) => product.productId != productId)
    return this.products
  }
}
