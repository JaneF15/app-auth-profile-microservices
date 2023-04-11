import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import { ModuleRef, Reflector } from "@nestjs/core";

@Injectable()
export class MultipleAuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector, 
              private moduleRef: ModuleRef) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    try {
      console.log(this)
      const allowedGuards = this.reflector.get<Type<CanActivate>[]>('multipleGuardsRef', context.getHandler()) || [];

      const guards = allowedGuards.map((guardRef) => this.moduleRef.get<CanActivate>(guardRef));
      console.log(guards)

      if (guards.length === 0) {
        return true;
      }
  
      if (guards.length === 1) {
        return guards[0].canActivate(context);
      }

      for (let guard of guards){
        const check = guard.canActivate(context);
        console.log(check)
        if (check) return true;
      }
  
    } catch(e) {
      console.log(e)
      throw new UnauthorizedException({message: e.message})
    }

  }
}