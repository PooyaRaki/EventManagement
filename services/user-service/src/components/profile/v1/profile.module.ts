import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '@components/profile/v1/models';
import { ProfileController, ProfileService } from '@components/profile/v1';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Profile.name,
                schema: ProfileSchema,
            },
        ]),
    ],
    controllers: [
        ProfileController,
    ],
    providers: [
        ProfileService,
    ],
})
export class ProfileModuleV1 {
    //
}