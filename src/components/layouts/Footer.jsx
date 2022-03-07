import { primary } from "daisyui/colors/colorNames";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer p-10 bg-gray-700 text-primary-contact footer-center">
      <p>Github finder &copy; {year}</p>
    </div>
  );
};
