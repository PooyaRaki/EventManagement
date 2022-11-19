import { SwaggerInput } from '@utils/interfaces';
import {
    SwaggerModule,
    DocumentBuilder,
} from "@nestjs/swagger";

export const Swagger = async (input: SwaggerInput) => {
    SwaggerModule.setup(
        input.path,
        input.app,
        SwaggerModule.createDocument(input.app, new DocumentBuilder()
            .addTag(input.tag)
            .setTitle(input.title)
            .setVersion(input.version)
            .setDescription(input.description)
            .addApiKey({ type: 'apiKey' , in: 'header', name: 'X-Authorization' }, 'X-Authorization')
            .build()
        ),
    );
}