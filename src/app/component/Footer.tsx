const Footer = () => {
  return (
    <footer className="w-full border-t mt-5 border-gray-200 bg-[#f8faf9]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-[16px] text-gray-500 sm:flex-row sm:text-left">
        <p>
          বাজার দর — সকল পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সময়ের, বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;