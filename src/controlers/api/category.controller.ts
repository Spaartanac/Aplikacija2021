import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "entities/category.entity";
import { features } from "process";
import { CategoryService } from "src/services/administrator/category/category.service";

@Controller('api/category')
@Crud({
    model:{
        type: Category
    },
    params:{
        id: {
            field:'categoryId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            categories:{
                eager:true
            },
            parentCategory:{
                eager:false
            },
            features:{
                eager:true
            },
            articles: {
                eager:false
            }

        }
    }
})
export class CagetoryController{
    constructor(
        public service : CategoryService
    ){ }

}