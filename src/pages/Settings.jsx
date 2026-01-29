import { useState } from "react";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";

// Simple container for the "Menu" state
const MenuBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;

// Added the brand color styling to the Menu button
const EditButton = styled.button`
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

function Settings() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Update hotel settings</Heading>
      </Row>

      <Row>
        {!showForm ? (
          <MenuBox>
            <p>Modify hotel booking rules, prices, and guest limits.</p>
            <EditButton onClick={() => setShowForm(true)}>
              Click to Edit settings
            </EditButton>
          </MenuBox>
        ) : (
          <UpdateSettingsForm onClose={() => setShowForm(false)} />
        )}
      </Row>
    </>
  );
}

export default Settings;
