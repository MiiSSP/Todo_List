import { CategoriaController } from './../controllers/categoria.controller';
import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../entities/categoria.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [TypeOrmModule]
})
export class CategoriaModule{}