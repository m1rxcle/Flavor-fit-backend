import { Role } from 'prisma/generated/prisma/enums';

export interface JwtPayload {
    id: string;
    role: Role;
}
