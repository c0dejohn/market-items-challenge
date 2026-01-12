import { ApiKeyGuard } from './api-key.guard';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

describe('ApiKeyGuard', () => {
    let guard: ApiKeyGuard;
    let configService: ConfigService;

    const mockConfigService = {
        get: jest.fn(),
    };

    const mockContext = {
        switchToHttp: jest.fn().mockReturnValue({
            getRequest: jest.fn(),
        }),
    } as unknown as ExecutionContext;

    beforeEach(() => {
        configService = mockConfigService as unknown as ConfigService;
        guard = new ApiKeyGuard(configService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should return true if api key matches', () => {
        mockConfigService.get.mockReturnValue('secret');
        const mockRequest = { headers: { 'x-api-key': 'secret' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        expect(guard.canActivate(mockContext)).toBe(true);
    });

    it('should throw UnauthorizedException if api key is invalid', () => {
        mockConfigService.get.mockReturnValue('secret');
        const mockRequest = { headers: { 'x-api-key': 'wrong' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
    });

    it('should return false (or throw) if API_KEY env is not set (fail closed)', () => {
        mockConfigService.get.mockReturnValue(undefined);
        const mockRequest = { headers: { 'x-api-key': 'secret' } };
        (mockContext.switchToHttp().getRequest as jest.Mock).mockReturnValue(mockRequest);

        const result = guard.canActivate(mockContext);
        expect(result).toBe(false);
    });
});
