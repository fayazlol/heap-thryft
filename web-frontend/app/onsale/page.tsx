import * as React from "react";
import { Card, Image, CardFooter, CardBody } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/system";

const SalesPage: React.FC = () => {
  const imageCount = 10;
  const images = Array.from({ length: imageCount }, (_, i) => `/shirt1.png`);

  return (
    <NextUIProvider>
      <main className="bg-[#fafafa] min-h-screen">
        <div className="flex flex-col w-full h-full items-center p-3">
          <div className="flex flex-col justify-start">
            <b className="text-2xl text-black px-4 py-4">On Sale</b>
          </div>
          <div className="grid md:grid-cols-5 auto-rows-[400px] gap-4 px-4">
            {images.map((src, index) => (
              <Card
                key={index}
                className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
                isHoverable
                isPressable
                isBlurred
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    radius="lg"
                    width="100%"
                    height="100%"
                    alt={`shirt${index + 1}`}
                    className="w-full object-cover h-[300px]"
                    src={src}
                  />
                </CardBody>
                <CardFooter className="text-xl justify-center">
                  <b>{"shirt"}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
};

export default SalesPage;
