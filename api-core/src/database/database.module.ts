import { DynamicModule } from '@nestjs/common'


import { DatabaseService } from './database.service'


export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            providers: [
                DatabaseService,
            ],
            exports: [DatabaseService],
        }
    }
}
