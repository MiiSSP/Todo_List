import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "../../tarefa/entities/tarefa.entity";

@Entity ('tb_categoria')
export class Categoria
{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Length(500)
    @Column({nullable: false, length: 500})
    @ApiProperty()
    descricao: string

    @OneToMany(() => Tarefa, (tarefa) => tarefa.categoria)
    @ApiProperty ({type:() => Tarefa})
    tarefas: Tarefa[]
}