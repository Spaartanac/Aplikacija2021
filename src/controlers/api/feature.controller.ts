import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Feature } from "src/controlers/entities/feature.entity";
import DistinctFeatureValuesDto from "src/dtos/feature/distinct.feature.values.dtos";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";
import { FeatureService } from "src/services/feature/feature.service";

@Controller('api/feature')
@Crud({
    model:{
        type: Feature
    },
    params:{
        id: {
            field:'featureId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            category:{
                eager:true
            },
            articleFeatures:{
                eager:false
            },                
            articles: {
                eager:false
            }

        }
    },
    routes:{
        only:[
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase",
            'updateOneBase',
        ],
        createOneBase: {
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        },
        createManyBase: {
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        },
        updateOneBase:{
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator'),
            ],
        },
        getManyBase: {
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator', 'user'),
            ],
        },
        getOneBase: {
            decorators:[
                UseGuards(RoleCheckedGuard),
                AllowToRoles('administrator', 'user'),
            ],
        }

    }
})
export class FeatureController{
    constructor(
        public service : FeatureService
    ){ }
        @Get('values/:categoryId')
        @UseGuards(RoleCheckGuard)
        @AllowToRoles('administrator', 'user')
        getDistinctValuesByCategoryId(@Param('categoryId')categoryId: number): Promise<DistinctFeatureValuesDto>{
            return this.service.getDistinctValuesByCategoryId(categoryId);
        }
}