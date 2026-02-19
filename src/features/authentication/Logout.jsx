import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";

function Logout() {
  const { userLogout, isPending } = useLogout();

  function handleLogout() {
    userLogout();
  }
  return (
    <ButtonIcon onClick={handleLogout} disabled={isPending}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
