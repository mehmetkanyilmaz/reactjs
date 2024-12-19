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
    <Text fontSize="16">First Name: {user.fistName}</Text>
    <Text fontSize="16">Last Name: {user.lastName}</Text>
    <Text fontSize="16">Role: {user.role}</Text>
    

    <Button colorScheme="pink" variant="solid" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile