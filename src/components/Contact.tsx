import { useRef, useState } from "react";
import { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Map from "./Map";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  background-color: #e8e6e6;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
`;

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Contact = () => {
  debugger
  const ref = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Your code to send the form data here...
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID!,
          process.env.REACT_APP_TEMPLATE_ID!,
          ref.current!,
          process.env.REACT_APP_PUBLIC_KEY!
        )
      // Assuming your form fields have "name" attributes, you can reset them like this:
      ref.current!.reset();

      // Set the success state to true to display a success message
      setSuccess(true);

      // Optionally, you can clear the success message after a few seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000); // Clear the message after 5 seconds (adjust the timing as needed)
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Section>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" name="name"></Input>
            <Input placeholder="Email" name="email"></Input>
            <TextArea
              placeholder="Write your message"
              name="message"
              rows={10}
            ></TextArea>
            <Button type="submit">Send</Button>
            {success &&
              "Your message has been sent. I'll get back to you soon!"}
          </Form>
        </Left>
        <Right>
          <Map />
        </Right>
      </Container>
    </Section>
  );
};

export default Contact;