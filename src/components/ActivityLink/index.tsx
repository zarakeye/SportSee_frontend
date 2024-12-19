import { Link } from "react-router-dom";

interface ActivityLinkProps {
  href: string;
  logo: string;
}

/**
 * ActivityLink is a functional component that renders a navigational link
 * with an associated logo. It utilizes the NavLink component from react-router-dom
 * for navigation and is styled with Tailwind CSS classes to display a 
 * square block with centered content.
 *
 * Props:
 * - href: The URL to navigate to when the link is clicked.
 * - logo: The source URL of the image to be displayed as the logo.
 */

const ActivityLink: React.FC<ActivityLinkProps> = ({ href, logo }) => {
  return (
    <Link to={href} className="w-[64px] h-[64px] flex flex-col justify-center items-center bg-quaternary rounded-md">
      <img src={logo} alt="" />
    </Link>
  );
}

export default ActivityLink