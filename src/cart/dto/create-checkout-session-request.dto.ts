import { CartLineItemDto } from "./cart-line-item.dto";

export class CreateCheckoutSessionRequestDto {
    lineItems: CartLineItemDto[]
}