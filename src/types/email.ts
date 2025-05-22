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
  namespace Astro {
    interface Environment {
      EMAIL: EmailEnvironment['EMAIL'];
    }
  }
}
