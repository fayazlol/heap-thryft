import {Link, Button} from "@nextui-org/react";

export const LoginButton = () => {
  return (
    <div className="flex max-w-sm rounded-full bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
        <Button href='/api/auth/login'as={Link} radius='full' className="bg-[#e5e7eb] text-[#18181b]" variant="shadow">
        Log In
      </Button>  
      </div>
  )
}

