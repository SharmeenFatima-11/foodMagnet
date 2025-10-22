import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p className="font-montserrat font-semibold text-[20px] text-red-500 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-normal text-center uppercase mt-6 sm:mt-8 md:mt-10">
        Your Finance Partner is Coming Soon
      </p>
    </div>
  );
}
