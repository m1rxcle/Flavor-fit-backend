import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

import { GraphQLContext } from 'src/common/interfaces';
import { IsDev } from 'src/common/utils';

export const getGraphQLConfig = (
    configService: ConfigService,
): ApolloDriverConfig => ({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: IsDev(configService),
    sortSchema: true,

    context: ({ req, res }: GraphQLContext): GraphQLContext => ({ req, res }),
});
