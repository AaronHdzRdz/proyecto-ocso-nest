import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  products: any;

  constructor(
    @InjectRepository(Product)
    private productRepositoy:Repository<Product>
  ){}


  create(createProductDto: CreateProductDto) {
    const product = this.productRepositoy.save(createProductDto)
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepositoy.find();
  }

  findByProvider(id: string) {
    const productsFound = this.products.filter((product) => product.provider === id);
    if (productsFound.length === 0) throw new NotFoundException();
    return productsFound;
  }

  findOne(id: string) {
    const product = this.productRepositoy.findOneBy({
      productId: id
    })
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productTuUpdate = await this.productRepositoy.preload({
      productId: id,
      ...updateProductDto
    })
    if (!productTuUpdate) throw new NotFoundException();
    this.productRepositoy.save(productTuUpdate);
    return productTuUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.productRepositoy.delete({
      productId: id
    })
    return {
      message: `El Producto con el id: ${id} ha sido eliminado`
    }
  }
}
