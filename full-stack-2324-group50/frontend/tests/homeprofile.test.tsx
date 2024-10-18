import React from "react";
import {fireEvent, render, screen} from'@testing-library/react'
import HomePersonProfile from "../../frontend/pages/HomePage/Components/HomePersonProfile";
import Index from "../pages/index";
import Home from "../pages/HomePage/Home";
const rnummer = "r0123456"
const password = "wachtwoord_niko"


let index: jest.Mock;
index = jest.fn();

test("HomePersonProfile renders correctly", async () => {
  render(<HomePersonProfile />);
  expect(screen.getByText("John Doe"))
});

test("HomePersonProfile renders correctly", async () => {
    render(<Index />);
    expect(screen.getByText("greetjej"))
  });


jest.mock("../utils/api");
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test("Index component renders login form", async () => {
  render(<Index />);

  // Ensure that the login form elements are present
  expect(screen.getByText("Login"))
  expect(screen.getByLabelText("Rnumber"))
  expect(screen.getByLabelText("Password"))
  expect(screen.getByText("Sign"))
});

test("Button click triggers login functionality", async () => {
  render(<Index />);

  // Perform user interaction: enter values and click login
  fireEvent.change(screen.getByLabelText("Rnumber"), { target: { value: "r0123456" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wachtwoord_niko" } });
  fireEvent.click(screen.getByText("Login"));


});

