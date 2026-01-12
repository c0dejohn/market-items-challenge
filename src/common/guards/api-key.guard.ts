import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        // Get API_KEY from environment directly
        const validApiKey = process.env.API_KEY;

        if (!validApiKey) {
            // If no API key is configured, potentially warn or fail open/closed depending on policy.
            // For strict security, we should probably fail.
            // For this challenge, let's assume if env is missing, we might fail or allow for easier dev.
            // Let's enforce it.
            console.warn('API_KEY not set in environment. Blocking all requests.');
            return false;
        }

        if (apiKey === validApiKey) {
            return true;
        }

        throw new UnauthorizedException('Invalid API Key');
    }
}
