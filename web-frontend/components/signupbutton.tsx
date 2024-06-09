import {Link, Button} from "@nextui-org/react";
//sign up button does not work atm sorryyy
export const SignupButton = () => {
  return (
    <div className="flex max-w-sm rounded-full bg-gradient-to-tr from-[#c026d3] to-[#4338ca] p-0.5">
        <Button href='https://dev-p4hqoyshcfe4w6hi.us.auth0.com/u/signup?state=hKFo2SAzTGdsZkVsTWJxRUdTQXFJOERYbjkybFJOX25iZlRoZaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIGRlX3FRZVptMTlha3MwcjgwYUtWQjludnVDTkFpY0pTo2NpZNkgQjVSMFd6QXVmWEtCY3lrTXBxaDNBTHJXYk1lQThIRzc' as={Link} radius='full' className="bg-[#18181b] text-white" variant="shadow">
        Sign Up
      </Button>  
      </div>
  )
}