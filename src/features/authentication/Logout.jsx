import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

function Logout() {
  const { userLogout, isPending } = useLogout();

  function handleLogout() {
    userLogout();
  }
  return (
    <ButtonIcon onClick={handleLogout} disabled={isPending}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
