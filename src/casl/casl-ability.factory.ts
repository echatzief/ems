import { Action } from "@/src/enums/action.enum";
import { Role } from "@/src/enums/role.enum";
import { User } from "@/src/user/user.entity";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (user.role == Role.Admin) {
      can(Action.CREATE, User);
      can(Action.UPDATE, User);
      can(Action.READ, User);
      can(Action.DELETE, User);
    } else if (user.role == Role.Manager) {
      can(Action.CREATE, User);
      can(Action.UPDATE, User);
      can(Action.READ, User);
      cannot(Action.DELETE, User);
    } else if(user.role == Role.Employee){
      can(Action.READ, User);
    } else {
      cannot(Action.CREATE, User);
      cannot(Action.UPDATE, User);
      cannot(Action.READ, User);
      cannot(Action.DELETE, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

