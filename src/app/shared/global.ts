export const GlobalVariable = Object.freeze({
    BASE_API_URL:'http://localhost:8080',
    FETCH_LATENCY:500,
    EMAIL_REGEX:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    CARD_REGEX:/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/
});

export class Global {}