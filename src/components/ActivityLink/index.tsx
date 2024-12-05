import { NavLink } from "react-router-dom";

interface ActivityLinkProps {
  href: string;
  logo: string;
}

const ActivityLink: React.FC<ActivityLinkProps> = ({ href, logo }) => {
  return (
    <NavLink to={href} className="w-[64px] h-[64px] flex flex-col justify-center items-center bg-quaternary rounded-md">
      <img src={logo} alt="" />
    </NavLink>
  );
}

export default ActivityLink