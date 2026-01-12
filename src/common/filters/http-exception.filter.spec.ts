import { HttpExceptionFilter } from './http-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

describe('HttpExceptionFilter', () => {
    let filter: HttpExceptionFilter;

    beforeEach(() => {
        filter = new HttpExceptionFilter();
    });

    it('should be defined', () => {
        expect(filter).toBeDefined();
    });

    it('should catch http exception', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockImplementation(() => ({
            json: mockJson,
        }));
        const mockGetResponse = jest.fn().mockImplementation(() => ({
            status: mockStatus,
        }));
        const mockGetRequest = jest.fn().mockReturnValue({
            url: '/test-url',
        });
        const mockHttpArgumentsHost = {
            getResponse: mockGetResponse,
            getRequest: mockGetRequest,
        };

        const mockArgumentsHost = {
            switchToHttp: () => mockHttpArgumentsHost,
        };

        const exception = new HttpException('Test Exception', HttpStatus.BAD_REQUEST);

        filter.catch(exception, mockArgumentsHost as unknown as ArgumentsHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: expect.any(String),
            path: '/test-url',
            message: 'Test Exception',
        });
    });
    it('should catch unknown exception and return 500', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockImplementation(() => ({
            json: mockJson,
        }));
        const mockGetResponse = jest.fn().mockImplementation(() => ({
            status: mockStatus,
        }));
        const mockGetRequest = jest.fn().mockReturnValue({
            url: '/test-url',
        });
        const mockHttpArgumentsHost = {
            getResponse: mockGetResponse,
            getRequest: mockGetRequest,
        };

        const mockArgumentsHost = {
            switchToHttp: () => mockHttpArgumentsHost,
        };

        const exception = new Error('Unknown Error');

        filter.catch(exception, mockArgumentsHost as unknown as ArgumentsHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: expect.any(String),
            path: '/test-url',
            message: 'Internal server error',
        });
    });
});
