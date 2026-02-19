import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import { useLogin } from "./useLogin";
import Input from "../../ui/Input";
import { useState } from "react";
import Form from "../../ui/Form";

const LoginButton = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s;

  /* Your requested brand color */
  color: var(--color-brand-50);
  background-color: var(--color-brand-600); /* #4f46e5 */

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("  ");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <LoginButton disabled={isPending}>
          {!isPending ? "Login" : <SpinnerMini />}
        </LoginButton>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
