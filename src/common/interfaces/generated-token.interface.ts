import type { TokenType } from 'prisma/generated/prisma/enums';

export interface GeneratedToken {
    id: string;
    userId: string | null;
    email: string;
    token: string;
    type: TokenType;
    expiresIn: Date;
}
