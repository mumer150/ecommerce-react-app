const Footer = () => {
  return (
    <footer className="bg-green-50 border-t border-green-200 text-gray-600 py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} E-Mart. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;