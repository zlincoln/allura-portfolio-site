// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

// Email functionality types
export type EmailResponse = {
  ok: boolean;
  error?: string;
};

export type EmailSendOptions = {
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  };
  subject: string;
  text: string;
};

export type EmailEnvironment = {
  EMAIL: {
    send: (options: EmailSendOptions) => Promise<EmailResponse>;
  };
};

declare global {
  interface AstroEnvironment extends EmailEnvironment {}
}
