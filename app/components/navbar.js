import * as  React from 'react'
import Image from 'next/image'
import {NextUIProvider} from "@nextui-org/system"
import {Button} from "@nextui-org/button"
import {Input} from "@nextui-org/input";

const Navbar = () => {
    return (
        <NextUIProvider>
        <body class="font-[arial]">
    <header class="bg-[#d4d4d4]">
        <nav class="flex justify-between items-center w-[92%]  mx-auto">
            <div>
            <a className="text-6xl"href='/'>
                🍻
            </a>
            </div>
            <div
                class="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
                <ul class="flex md:flex-row flex-col md:items-center gap-20">
                    <li>
                        <a class="text-[#18181b] hover:text-[#1d4ed8]" href="#">Shop Now</a>
                    </li>
                    <li>
                        <a class="text-[#18181b] hover:text-[#1d4ed8]" href="#">Featured</a>
                    </li>
                    <li>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input radius='full' size='xs' type="search" label="Search" />
                        </div>
                    </li>
                    <li>
                        <a class="text-[#18181b] hover:text-[#1d4ed8]" href="#">Menswear</a>
                    </li>
                    <li>
                        <a class="text-[#18181b] hover:text-[#1d4ed8]" href="#">Womenswear</a>
                    </li>
                </ul>
            </div>
            <div class="relative inline-flex  group gap-7">
            <div class="flex max-w-sm rounded-full bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5">
        <Button radius='full' className="bg-[#e5e7eb] text-[#18181b]" variant="shadow">
        Log In
      </Button>  
      </div>
      <div class="flex max-w-sm rounded-full bg-gradient-to-tr from-[#c026d3] to-[#4338ca] p-0.5">
        <Button radius='full' className="bg-[#18181b] text-white" variant="shadow">
        Sign Up
      </Button>  
      </div>
    </div>
            </nav>
    </header>
    </body>
    </NextUIProvider>




    )
}

export default Navbar