import { ApiKeyGuard } from './api-key.guard';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

describe('ApiKeyGuard', () => {
    let guard: ApiKeyGuard;
    const ORIGINAL_ENV = process.env;

    const mockContext = {
        switchToHttp: jest.fn().mockReturnValue({
            getRequest: jest.fn(),
        }),
    } as unknown as ExecutionContext;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...ORIGINAL_ENV };
        guard = new ApiKeyGuard();
    });

    afterAll(() => {
        process.env = ORIGINAL_ENV;
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should return true if api key matches', () => {
        process.env.API_KEY = 'secret';
        const mockRequest = { headers: { 'x-api-key': 'secret' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        expect(guard.canActivate(mockContext)).toBe(true);
    });

    it('should throw UnauthorizedException if api key is invalid', () => {
        process.env.API_KEY = 'secret';
        const mockRequest = { headers: { 'x-api-key': 'wrong' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
    });

    it('should return false (or throw) if API_KEY env is not set (fail closed)', () => {
        delete process.env.API_KEY;
        const mockRequest = { headers: { 'x-api-key': 'secret' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        const result = guard.canActivate(mockContext);
        expect(result).toBe(false);
    });
});
