import {Link, Button} from "@nextui-org/react";

export const LogoutButton = () => {
  return (
    <div className="flex max-w-sm rounded-full bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
        <Button href='/api/auth/logout' as={Link} radius='full' className="bg-[#e5e7eb] text-[#18181b]" variant="shadow">
        Log Out
      </Button>  
      </div>
  )
}