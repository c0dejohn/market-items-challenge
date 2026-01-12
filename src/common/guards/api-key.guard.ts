import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        // Get API_KEY from environment directly
        const validApiKey = process.env.API_KEY;

        if (!validApiKey) {
            console.error('FATAL: API_KEY is not set in the environment variables.');
            throw new UnauthorizedException('Server misconfiguration: API_KEY missing');
        }

        if (apiKey === validApiKey) {
            return true;
        }

        console.warn(`Blocked request with invalid key: ${apiKey}`);

        throw new UnauthorizedException('Invalid API Key');
    }
}
