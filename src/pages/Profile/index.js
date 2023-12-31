import { useAuth } from "../../contexts/AuthContext"
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      logout(() => {

        navigate("/");
      })
    }

  return (
    <div>

    <Text fontSize="22">Profile</Text>
    <code>{JSON.stringify(user)}</code>
    

    <Button colorScheme="pink" variant="solid" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile