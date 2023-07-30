import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assuming 'user' property exists on the request object
  },
);
