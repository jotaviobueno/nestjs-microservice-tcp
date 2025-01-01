import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';
import tailwindConfig from '../tailwind.config';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export function UserCreated(data) {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head />
        <Preview>{data.subject}</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto p-5 pb-12 mb-16">
            <Section className="px-12">
              <Img
                src={`${baseUrl}/static/company-logo.png`}
                width="49"
                height="21"
                alt="Company Logo"
              />
              <Hr className="border-gray-300 my-5" />

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.intro}
              </Text>

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.dashboard_info}
              </Text>

              <Button
                className="bg-indigo-500 rounded-md text-white text-base font-bold no-underline text-center block w-full py-2"
                href={data.dashboard_link}
              >
                {data.dashboard_button}
              </Button>

              <Hr className="border-gray-300 my-5" />

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.integration_reminder}{' '}
                <Link className="text-indigo-600" href={data.docs_link}>
                  docs
                </Link>
                .
              </Text>

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.api_key_instructions}{' '}
                <Link className="text-indigo-600" href={data.api_keys_link}>
                  API keys
                </Link>{' '}
                <Link className="text-indigo-600" href={data.tutorial_link}>
                  overview on account basics
                </Link>
                .
              </Text>

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.checklist_reminder}{' '}
                <Link className="text-indigo-600" href={data.checklist_link}>
                  quick checklist
                </Link>
                .
              </Text>

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.support_message}{' '}
                <Link className="text-indigo-600" href={data.support_link}>
                  support site
                </Link>
                .
              </Text>

              <Text className="text-gray-700 text-base leading-6 text-left">
                {data.signature}
              </Text>

              <Hr className="border-gray-300 my-5" />

              <Text className="text-gray-500 text-sm leading-4">
                {data.address}
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
