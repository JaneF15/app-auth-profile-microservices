import { CanActivate, SetMetadata, Type } from "@nestjs/common";

export const MultipleGuardsRefs = (...guards: Type<CanActivate>[]) => SetMetadata('multipleGuardsRef', guards);