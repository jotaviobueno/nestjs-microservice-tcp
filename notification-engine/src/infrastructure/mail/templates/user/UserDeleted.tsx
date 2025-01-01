import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';
import tailwindConfig from '../tailwind.config';

export function UserDeletedEmail(data) {
  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head />
        <Preview>{data.subject}</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto p-6 pb-8 mb-10 max-w-lg rounded-md shadow-md">
            <Section className="px-6">
              {/* Logo */}
              <Img
                src="https://via.placeholder.com/150x50.png"
                width="49"
                height="21"
                alt="Logo de la Empresa"
                className="mb-4"
              />
              <Hr className="border-gray-300 my-4" />

              <Text className="text-red-500 text-lg font-semibold mb-2">
                {data.subject}
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.greeting}
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.intro}
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.unauthorized_deletion}
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.account_recovery} <br />
                {data.recovery_link}
              </Text>

              <Button
                className="bg-red-500 rounded-md text-white text-base font-bold no-underline text-center block w-full py-2 mt-4 mb-6"
                href="https://example.com/recuperar-cuenta"
              >
                {data.recovery_link}
              </Button>

              <Hr className="border-gray-300 my-4" />

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.contact_support}
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4">
                {data.thank_you}
                <br />
                {data.team}
              </Text>

              <Hr className="border-gray-300 my-4" />

              <Text className="text-gray-500 text-sm leading-4">{data.ps}</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
