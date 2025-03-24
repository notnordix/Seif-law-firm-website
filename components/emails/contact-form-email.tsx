import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components"

interface ContactFormEmailProps {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  subject?: string
  message: string
  service?: string
}

export default function ContactFormEmail({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
  service,
}: ContactFormEmailProps) {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName

  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={text}>You have received a new message from your website contact form.</Text>

          <Section style={section}>
            <Text style={sectionHeader}>Contact Information:</Text>
            <Text style={detailItem}>
              <strong>Name:</strong> {fullName}
            </Text>
            <Text style={detailItem}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={detailItem}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            {service && (
              <Text style={detailItem}>
                <strong>Service of Interest:</strong> {service}
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={sectionHeader}>Message Details:</Text>
            {subject && (
              <Text style={detailItem}>
                <strong>Subject:</strong> {subject}
              </Text>
            )}
            <Text style={detailItem}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>This email was sent from the contact form on Seif Law Firm website.</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "Arial, sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
}

const h1 = {
  color: "#1e376b",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  lineHeight: "1.5",
}

const text = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 20px 0",
  lineHeight: "1.5",
}

const section = {
  margin: "20px 0",
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "5px",
}

const sectionHeader = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1e376b",
  margin: "0 0 15px 0",
}

const detailItem = {
  margin: "10px 0",
  lineHeight: "1.5",
}

const messageBox = {
  backgroundColor: "#ffffff",
  padding: "15px",
  borderRadius: "5px",
  border: "1px solid #e0e0e0",
  margin: "10px 0",
  whiteSpace: "pre-wrap",
}

const hr = {
  borderColor: "#e0e0e0",
  margin: "30px 0",
}

const footer = {
  color: "#666",
  fontSize: "14px",
  fontStyle: "italic",
  margin: "20px 0 0 0",
}

