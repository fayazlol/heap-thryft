import React from "react";
import { Link } from "@nextui-org/react";

const Footer: React.FC = () => {
  return (
    <div className="bg-white text-black py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>
              <Link href="https://www.youtube.com/shorts/UuYmH4peHOc" className="text-gray-400 hover:text-[#2563eb]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/shorts/UuYmH4peHOc" className="text-gray-400 hover:text-[#2563eb]">
                Careers
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/shorts/UuYmH4peHOc" className="text-gray-400 hover:text-[#2563eb]">
                Press
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/shorts/UuYmH4peHOc" className="text-gray-400 hover:text-[#2563eb]">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Support</h3>
          <ul className="space-y-1">
            <li>
              <Link href="https://www.youtube.com/watch?v=lVEjTW1l3WY" className="text-gray-400 hover:text-[#2563eb]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=lVEjTW1l3WY" className="text-gray-400 hover:text-[#2563eb]">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=lVEjTW1l3WY" className="text-gray-400 hover:text-[#2563eb]">
                Returns
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=lVEjTW1l3WY" className="text-gray-400 hover:text-[#2563eb]">
                Shipping
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link href="https://www.youtube.com/watch?v=qjZC3g2I0As" className="text-gray-400 hover:text-[#2563eb]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=qjZC3g2I0As" className="text-gray-400 hover:text-[#2563eb]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=qjZC3g2I0As" className="text-gray-400 hover:text-[#2563eb]">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=qjZC3g2I0As" className="text-gray-400 hover:text-[#2563eb]">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 text-center text-gray-500">
        <p>© 2024 thryft. blah blah legal stuff blah blah. </p>
      </div>
    </div>
  );
};

export default Footer;
