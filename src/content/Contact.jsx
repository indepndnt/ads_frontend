import React, { Component } from "react";
import Header from "../components/Header";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: "",
      email: "",
      phone: "",
      message: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.visitor,
      this.state.email,
      this.state.phone,
      this.state.message
    );
  };

  render() {
    const {contactSubmit, contactResult} = this.props;
    if (contactResult === "thankyou") {
      return (
        <React.Fragment>
          <Header
            heading={<h2 className="masthead-heading mb-0">Thank you!</h2>}
          />
          <p>
            We were not able to send your message. Sorry! Please email us at{" "}
            <a href="mailto:contact@accountingdatasolutions.com">
              contact@accountingdatasolutions.com
            </a>
            .
          </p>
        </React.Fragment>
      );
    }
    if (contactResult === "sorry") {
      return (
        <React.Fragment>
          <Header
            heading={
              <h2 className="masthead-heading mb-0">Something went wrong!</h2>
            }
          />
          <p>
            Your message has been sent and we will respond at our earliest
            opportunity. Thank you!
          </p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Header heading="Contact Us" />
        <Container>
          <Form id="contactForm" onSubmit={contactSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="visitor"
                id="visitor"
                required
                value={this.state.visitor}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="message" className="sr-only">
                Message Content
              </Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                rows="6"
                placeholder=" type your message here"
                required
                value={this.state.message}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Send Message
            </Button>{" "}
            &nbsp; or email us at{" "}
            <a href="mailto:contact@accountingdatasolutions.com">
              contact@accountingdatasolutions.com
            </a>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}
