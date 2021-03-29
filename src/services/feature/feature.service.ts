import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ArticleFeature } from "src/controlers/entities/article-feature.entity";
import { Feature } from "src/controlers/entities/feature.entity";
import DistinctFeatureValuesDto from "src/dtos/feature/distinct.feature.values.dtos";
import { Repository } from "typeorm";

@Injectable()
export class FeatureService extends TypeOrmCrudService<Feature> {
    constructor(

        @InjectRepository(Feature)
        private readonly feature : Repository<Feature>,
        @InjectRepository(ArticleFeature)
        private readonly articleFeature : Repository<ArticleFeature>    ) { 
        super(feature);
    }

    async getDistinctValuesByCategoryId(categoryId:number): Promise<DistinctFeatureValuesDto>{
        const features = this.feature.find({
            categoryId; categoryId
        });

        const featureResults: DistinctFeatureValuesDto[]= [];
        if (!features|| features.length === 0 ){
            return featureResults;
        }

        result.features = await Promise.all(features.map(feature =>{
            const values: string[]=(await this.articleFeature.createQueryBuilder("af").select("DISTINCT af.value", 'value').where('af.featureID= featureId', {featureId: feature.featureId}).orderBy('af.value', 'ASC').getRawMany())
            .map(item => item.value);   
            return{
                featureId: feature.featureId,
                name: feature.name,
                values: 
            };
        });
        return result;

    }
}